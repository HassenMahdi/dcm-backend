import pandas as pd

from app.main.util.utils import  get_transformed_df, get_dataframe_page
from app.db.worksheet_document import WorksheetDocument


def preview_file_data(file_name, url_params, filters, sort, request):
    """Reads the imported file data using pagination"""

    path, columns, total_lines = get_file_metadata(file_name)
    indices = []
    filtred = False
    sort_indices = []
    filter_indices = set()

    if filters:
        indices = apply_filter(path, filters)
        filter_indices.update(indices)
        filtred = True
    if sort:
        sort_indices = apply_sort(path, sort)
        if filter_indices:
            indices = [elem for elem in sort_indices if elem in filter_indices]
        filtred = True
    indices = indices if indices else sort_indices or list(filter_indices)
    total_lines = len(indices) if indices else total_lines
    preview = get_dataframe_page(path, columns, request.base_url, url_params, total_lines, filtred, indices, sort)

    return preview


def get_file_metadata(filename):

    path = filename + ".csv"
    columns = pd.read_csv(path, sep=";", engine="c", error_bad_lines=False,dtype=str, skipinitialspace=True, skiprows=0, nrows=1,
                          na_filter=False) \
        .columns.tolist()

    filename = filename.replace("\\", "/")
    filename = filename.split('/')[-1]
    worksheet_document = WorksheetDocument()
    worksheet_metadata = worksheet_document.get_file_metadata(filename, fields=["totalExposures"])

    total_lines = worksheet_metadata["totalExposures"]
    
    return path, columns, total_lines


def apply_filter(path, filters):
    """Applies the filters on mapped_df for data preview"""

    df = get_transformed_df(path, usecols=[col_filter["column"] for col_filter in filters])
    date_operators = {"Before": "lt", "After": "gt"}
    numeric_operators = {
        'lessThan': '<',
        'lessThanOrEqual': '<=',
        'greaterThanOrEqual': '>=',
        'greaterThan': '>'
    }

    for column_filter in filters:
        column = column_filter["column"]
        operator = column_filter["operator"]
        value = column_filter.get("value")
        if operator in numeric_operators.keys():
            lg = numeric_operators.get(operator)
            numeric_values = pd.to_numeric(df[column], errors='coerce')
            limit = float(value)
            mask = pd.eval(f'numeric_values {lg} {limit}')
            df = df[mask]
            # df = df.loc[getattr(pd.to_numeric(df[column], errors='coerce'), lg)(float(value))]
        elif operator == 'equals':
            df = df.loc[df[column] == value]
        elif operator == 'notEquals':
            df = df.loc[df[column] != value]
        elif operator == 'contains':
            df = df.loc[df[column].str.contains(value)]
        elif operator == 'notContains':
            df = df.loc[~df[column].str.contains(value)]
        elif operator == 'startsWith':
            df = df.loc[df[column].str.startswith(value)]
        elif operator == 'endsWith':
            df = df.loc[df[column].str.endswith(value)]
        elif operator == date_operators:
            df = df.loc[getattr(pd.to_datetime(df[column], errors='coerce'), date_operators[operator])
                        (pd.to_datetime(value))]

    filter_indices = df.index.tolist()

    return filter_indices


def apply_sort(path, sort):
    """Applies sorting on mapped_df for data preview"""

    df = get_transformed_df(path, usecols=[sort["column"]])
    df.index.name = "index"
    sort_indices = df.sort_values(by=[sort["column"], "index"], ascending=sort["order"]).index.tolist()

    return sort_indices