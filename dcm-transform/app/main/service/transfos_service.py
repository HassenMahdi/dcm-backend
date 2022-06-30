import traceback
import pandas as pd
import re
import requests
import difflib

from idna import unicode
from concurrent.futures.thread import ThreadPoolExecutor

from app.db.worksheet_document import WorksheetDocument
from app.main.service.transformation_pipe_service import get_pipe_by_id
from app.main.util.strings import generate_id
from app.main.util.utils import get_upload_file_path, save_transformed_dataframe, getTransformedFilePath

from inforcehub import Anonymize


def execute_node(df, node):
    if node["type"] == "delete-rows":
        return delete_rows_by_index(df, node["from"], node["to"])
    elif node["type"] == "delete-column":
        return delete_columns(df, node["columns"])
    elif node["type"] == "merge":
        return concatenate_columns_string(df, node["destination"], node.get("columns", []), node.get("separator", ""))
    elif node["type"] == "replace":
        return replace(df, node["column"], node.get("from", None), node.get("to", None))
    elif node["type"] == "calculator":
        return calculator_columns(df, node)
    elif node["type"] == "filter":
        return filtering(df, node)
    elif node["type"] == "find-replace":
        return find_replace(df, node)
    elif node["type"] == "default-value":
        return default_value(df, node)
    elif node["type"] == "split":
        return split_column(df, node)
    elif node["type"] == "substring":
        return substring(df, node)
    elif node["type"] == "format-date":
        return reformat_date(df, node)
    elif node["type"] == "groupby":
        return groupby(df, node)
    elif node["type"] == "concat":
        return concat_tables(df, node)
    elif node["type"] == "join":
        return join_tables(df, node)
    elif node["type"] == "pycode":
        return eval_python(df, node)
    elif node["type"] == "hash":
        return hash_columns(df, node["columns"])
    elif node["type"] == "map":
        return map_columns(df, eval(node.get("code", "")))
    elif node["type"] == "map_standard":
        return map_columns(df, node)
    elif node["type"] == "select":
        return select_columns(df, node)
    elif node["type"] == "key_select":
        return key_select(df, node)
    elif node["type"] == "request":
        return request_api(df, node)
    elif node["type"] == "matching_score":
        return matching_score(df, node)
    else:
        return df


def eval_python(df, options):
    global_env = {**globals()}
    local_env = {**locals()}
    exec(options.get('code', ''), global_env, local_env)

    return local_env["df"]


def join_tables(df, options):
    file_id = options['join_file_id']
    sheet_id = options['join_sheet_id']
    join_on = options['join_on']
    join_how = options.get("join_how", 'left')
    path = get_upload_file_path(sheet_id, file_id)
    join_table = load_dataframe(path)

    df = df.join(other=join_table.set_index(join_on), on=join_on, how=join_how, lsuffix="_l").reset_index()

    return df


def concat_tables(df, options):
    file_id = options['concat_file_id']
    sheet_id = options['concat_sheet_id']
    path = get_upload_file_path(sheet_id, file_id)
    c_table = load_dataframe(path)
    df = pd.concat([df, c_table], axis=0, ignore_index=True).reset_index()
    return df


def split_column(df, node):
    try:
        pat = node.get('separator', None)
        column = node.get('column')
        # df['debug'] = f'{column}_{pat}'
        parts = df[column].str.split(pat=pat, expand=True, n=1)

        for p in [0, 1]:
            df[f'{column}_part_{p}'] = parts[p] if (p in parts.columns.tolist()) else None

        return df

    except:
        print("Exception occurred on Split column!")
        return df


def select_columns(df, node):
    try:
        columns = node.get('columns')
        df = df[column]

        return df

    except:
        print("Exception occurred on Split column!")
        return df


def default_value(df, node):
    try:
        col = node.get('destination')
        val = node.get('value', None)
        df[col] = val
        return df
    except:
        print("Exception occurred on defaulting column!")
        return df


def main(file_id, sheet_id, pipe_id):
    path = get_upload_file_path(sheet_id, file_id)
    pipe = get_pipe_by_id(pipe_id)
    df = load_dataframe(path)
    for node in pipe[0].nodes:
        df = execute_node(df, node)
    output_sheet_id = generate_id()
    output_path = getTransformedFilePath(file_id, output_sheet_id)
    file_path = save_transformed_dataframe(df, output_path)
    WorksheetDocument().create_file_metadata(file_id, output_sheet_id, df.columns, len(df))

    return file_path


def load_dataframe(path):
    df = pd.read_csv(path, engine="c", error_bad_lines=False, dtype=str, skipinitialspace=True, na_filter=False,
                     delimiter=";")
    return df


def delete_columns(df, columns):
    try:
        for col in columns:
            del df[col]
        return df
    except:
        print("Exception occurred on deletion column!")
        return df


def concatenate_columns_string(df, target, columns, sep):
    try:
        if len(columns):
            df[target] = df[columns].agg(sep.join, axis=1)
        else:
            df[target] = ''
        # return delete_columns(df, columns)
        return df
    except Exception as e:
        print(e)
        print("Exception occurred on merging column!")
        return df


def calculator_columns(df, node):
    try:
        formula = node.get("formula", [])
        tokens = []
        numeric_srs = []
        for token in formula:
            token_type = token.get('type')
            token_value = token.get('value')
            if token_type == 'column':
                tokens.append(f"`{token_value}`")
                numeric_srs.append(pd.to_numeric(df[token_value], errors='coerce'))
            else:
                tokens.append(f"{token_value}")

        string_formula = " ".join(tokens)
        destination = node.get("destination")

        print(string_formula)
        df[destination] = pd.concat(numeric_srs, axis=1).eval(string_formula)

        return df
    except Exception as e:
        print(e)
        print("Exception occurred on summing column!")
        return df


def filtering(og_df, options):
    df = og_df.copy()
    try:
        for condition in options.get('conditions', []):
            op = condition["op"]
            value = condition["condition"]
            column = condition["column"]
            if op == 'fullmatch':
                df = df[df[column] == value]
            elif op in ['contains', 'startswith', 'endswith', 'match']:
                query = f'`{column}`.str.{op}({repr(value)})'
                df = df.query(query)
            else:
                df = eval(f"df[pd.to_numeric(df['{column}'], errors='coerce') {op} {value}]")

        reverse = options.get('reverse', False)
        if not reverse:
            df = og_df[~og_df.index.isin(df.index)]

        return df

    except Exception as e:
        print('ERROR FILTERING')
        print(e)
        traceback.print_exc()
        return og_df


def filtering_depricated(df, options):
    original_cols = df.columns
    try:
        def get_predicate(column, op, condition):
            if op in ['contains', 'startswith', 'endswith', 'match']:
                return f'{column}.str.{op}({condition})'
            else:
                return f'{column} {op} {condition}'

        temp_cols = original_cols.map(lambda x: x.replace(' ', '_') if isinstance(x, (str, unicode)) else x)
        df.columns = temp_cols
        query = ' & '.join([
            get_predicate(condition["column"].replace(" ", "_"), condition["op"], repr(condition["condition"]))
            for condition in options.get('conditions', [])
        ])

        reverse = options.get('reverse', False)
        if not reverse:
            query = f"not ({query})"

        df = df.query(query)
    except:
        traceback.print_exc()

    df.columns = original_cols
    return df


def replace(df, column, old_value, new_value):
    try:
        df[column].replace(old_value or "", new_value or "", inplace=True, regex=True)
        return df
    except:
        print("Exception occurred on replace transformation!")
        return df


def delete_rows_by_index(df, f, t):
    try:
        df = df.drop(df.index[list(range(f - 1, df.index.max() + 1 if t > df.index.max() else t))])
        return df
    except Exception as e:
        print(e)
        print("Exception occurred on deletion rows!")
        return df


def find_replace(df, node):
    try:
        node['reverse'] = True
        node['from'] = '.+'
        filtered = filtering(df, node)
        df[node["column"]].loc[filtered.index] = node.get("to", None)
        return df
    except:
        print("Exception occurred on find replace transformation!")
        return df


def reformat_date(df, options):
    try:
        column = options.get('column')
        format = options.get('format')
        ignore_errors = options.get('ignore', False)

        date_column = pd.to_datetime(df[column], format=format, errors='coerce')
        standardized_column = date_column.dt.strftime('%Y-%m-%d')

        if ignore_errors:
            indexes = standardized_column.index[~standardized_column.isna()]
        else:
            indexes = standardized_column.index

        df[column].iloc[indexes] = standardized_column.iloc[indexes]

    except Exception as e:
        print('ERROR REFORMATION DATE')
        print(e)
        traceback.print_exc()

    return df


def check_pipe_syntax(pipe_id):
    pipe = get_pipe_by_id(pipe_id)
    check_result = list()
    check_result.append(column_delete_check(pipe))
    return check_result


def column_delete_check(pipe):
    deleted_columns = []
    columns_to_check = []
    for node in pipe[0].nodes:
        if node["type"] == "delete-column":
            deleted_columns = node["columns"]
        elif node["type"] == "merge":
            columns_to_check = columns_to_check + node["columns"]
        elif node["type"] == "replace":
            columns_to_check = columns_to_check + node["column"]
        elif node["type"] == "calculator":
            columns_to_check = columns_to_check + node["columns"]
        else:
            pass
    intersection = list(set(deleted_columns) & set(columns_to_check))
    if not intersection:
        return {"column_delete_check": False, "columns": []}
    else:
        return {"column_delete_check": True, "columns": list(intersection)}


def groupby(df, node):
    try:
        group_keys = node.get('groupKeys')
        columns = node.get('columns')
        agg = node.get('agg')

        # Convert Aggregated Columns
        for column in columns:
            df[column] = pd.to_numeric(df[column], errors='coerce')

        group = df.groupby(by=group_keys, as_index=True, sort=False, axis=0)

        agg = group.agg({c: agg for c in columns}).reset_index(drop=True).astype(str)

        first = group.first().drop(columns=columns).reset_index(drop=False)

        return pd.concat([first, agg], axis=1)
    except:
        print("Exception occurred on Group By!")
        return df


def map_columns(df, node):
    mappings = node.get("mapping", [])
    mapped_df = pd.DataFrame(index=df.index, columns=[])
    for mapping in mappings:
        source = mapping.get("source", None)
        value = mapping.get("value", None)
        target = mapping["target"]

        if value is not None:
            mapped_df[target] = value
        elif source in df.columns:
            mapped_df[target] = df[source]

    df = mapped_df

    return df


def hash_columns(df, columns):
    try:
        anon = Anonymize()
        anon.transform(df, columns)
        return df
    except:
        print("Exception occurred on hashing column!")
        return df


def key_select(df, node):
    destination = node['destination']
    df[destination] = node['url']

    keys = re.findall('{(.+?)}', node['url'])

    for key in keys:
        df[key + "_encoded"] = df[key].replace(" ", "%20", regex=True)
        df[destination] = df[destination].replace("{" + key + "}", df[key + "_encoded"], regex=True)
        del df[key + "_encoded"]

    return df


def request_api(df, node):
    key_url = node['url']
    result = []

    def construct_results(row, key_url, method, datapath):
        url = row[key_url]
        response = requests.request(url=url, method=method)
        json = response.json()
        df_chunk = pd.json_normalize(json)
        return df_chunk

    # WORK IN PARALLEL - SEND ALL REQUEST IN PARALLEL
    with ThreadPoolExecutor() as executor:
        args = ((row, key_url, node['method'], node['datapath']) for index, row in df.iterrows())
        executor.map(
          lambda p: result.append(construct_results(*p)), args)

    new_df = pd.concat(result, axis=0, ignore_index=True).fillna("")
    return new_df


def matching_score(df, node):
    column_a = node["column_a"]
    column_b = node["column_b"]
    df["score"] = pd.Series([is_match(row[column_a], row[column_b]) for index, row in df.iterrows()], index=df.index)
    return df


def is_match(word, match_with):
    seq = difflib.SequenceMatcher(None, word.upper(), match_with.upper())
    score = seq.ratio()
    return score


def substring(df, options):
    substrings = options["substrings"]
    original_column = options["original_column"]
    for sub in substrings:
        column = sub["column"]
        start = sub.get("start", 0) - 1
        end = sub.get("end", 0)
        df[column] = df[original_column].str[start:end]

    # df.drop(columns=[original_column], inplace=True)
    return df



