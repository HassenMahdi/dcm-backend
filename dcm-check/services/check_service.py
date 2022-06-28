import pandas as pd

from api.utils.storage import save_check_results_df, get_imported_data_df, save_import_df
from api.utils.utils import generate_id
from database.data_handler_document import DataHandlerDocument

from database.job_result_document import JobResultDocument


def start_simple_datacheck(file_id, sheet_id, checks, modifications, result_id=None):

    df = get_imported_data_df(file_id, sheet_id)
    modified_df = apply_modifcations(df, modifications)
    result_set = apply_checks(modified_df, checks)

    # ++++ SAVE RESULTSET
    result_id = result_id or generate_id()
    result_meta = create_result_metadata(result_set)
    save_check_results_df(result_set, file_id, result_id)
    JobResultDocument.save_result_metadata(
        file_id, sheet_id, result_id, checks, result_meta[0], result_meta[1])

    # if len(df.index) != len(modified_df.index):
    # update worksheet_meta_data
    save_import_df(modified_df, file_id, sheet_id)
    DataHandlerDocument.update_worksheet_metadata(sheet_id, len(modified_df.index))

    return {
        "file_id": file_id,
        "sheet_id" : sheet_id,
        "result_id": result_id,
    }


def create_result_metadata(result_set):
    levels = ["ERROR", "WARNING"]

    totals = {l: 0 for l in levels}
    totals_per_line = {l: 0 for l in levels}

    for level in levels:
        level_checks = [c for c in result_set.columns if eval(c)[2] == level]
        for check_column in level_checks:
            check_results = result_set[check_column]
            totals[level] += int(check_results[check_results != 0].count())

    return totals, totals_per_line


def extend_result_df(df, check_result, check_type, field_name, check_level):
    """Append a column to result dataframe"""

    column_name = (check_type, field_name, check_level)
    result_df = pd.concat([df, check_result.rename(str(column_name))], axis=1, sort=False)

    return result_df


def reindex_result_df(df):
    counters = {}
    new_columns = []
    for column in df.columns:
        current_column_count = counters.get(column, 0)
        counters[column] = current_column_count + 1
        column = str(eval(column) + (current_column_count,))
        new_columns.append(column)

    df.columns = new_columns
    return df


def apply_modifcations(df, modifications):
    for mod in modifications:
        mod_type = mod["type"]

        if mod_type == "delete_rows":
            rows = mod["rows"]
            df = df.drop(rows)
        elif mod_type == "select_rows":
            rows = mod["rows"]
            df = df.iloc[rows]
        elif mod_type == "edit_cell":
            row, column, value = mod["row"], mod["column"], mod["value"]
            df[column].iloc[row] = value

    return df


def apply_checks(df, checks_list):
    result_set = pd.DataFrame(index=df.index)

    for check in checks_list:
        check_type = check["type"]
        check_level = check.get("level", "ERROR")
        check_column = check.get("column", None)

        if check_type == "duplicate_check":
            check_result = duplicate_ckeck(df, check)
        elif check_type == "string_comparison":
            check_result = string_comparison(df, check)
        elif check_type == "column_comparison":
            check_result = column_comparison(df, check)
        elif check_type == "pycode_check":
            check_result = pycode_check(df, check)
        elif check_type == "type_check":
            check_result = type_check(df, check)
        elif check_type == "format_check":
            check_result = format_check(df, check)
        elif check_type == "empty_check":
            check_result = empty_check(df, check)
        else:
            raise Exception("INVALID_CHECK_TYPE")

        if check_result is not None:
            result_set = extend_result_df(result_set, check_result, check_type, check_column, check_level)

    result_set = reindex_result_df(result_set)

    return result_set


def duplicate_ckeck(df, params):
    column_name = params["column"]
    column = df[column_name]

    return column.duplicated(keep=False)[column.index].astype(int)


def string_comparison(df, params):
    c1 = df[params["column"]]
    value = params["value"]
    return (c1 == value).astype(int)


def column_comparison(df, params):
    c1 = df[params["column"]]
    c2 = df[params["second_column"]]
    return (c1 == c2).astype(int)


def pycode_check(df, params):
    locals = {"df":df}
    globals = {}
    code = params["code"]
    exec(code, globals, locals)
    return locals["result_df"]


def type_check(df, params):
    c1 = df[params["column"]]

    dict_format = {
        "double": "-?\d*(.?,?\d*)?(E[-]{0,1}[\d]+)?",
        "int": "[-+]?[0-9]\d*",
        "boolean": "(yes)|(no)|(False)|(True)",
        "date": "\d{4})-(\d{2})-(\d{2}",
        "datetime": "\d{4}-\d?\d-\d?\d (?:2[0-3]|[01]?[0-9]):[0-5]?[0-9]:[0-5]?[0-9]",
    }

    field_type = params.get("field_type", None)

    rgx = dict_format[field_type]

    match = c1.astype(str).str.match("^" + rgx + "$", case=False)

    return match.astype(int)


def format_check(df, params):
    s = df[params["column"]]
    regex_format = params["format"]
    return ~(s.astype(str).str.match(regex_format))


def empty_check(df, params):
    s = df[params["column"]]
    return s.fillna("") == ""
