#!/usr/bin/python
# -*- coding: utf-8 -*-

import shutil
import traceback
from time import time

import pandas as pd

from api.utils.utils import generate_id, convert_excel, allowed_file, get_path, IMPORT_FOLDER, get_transformed_df, \
    get_dataframe_page
from api.utils.paginator import Paginator
from database.data_handler_document import DataHandlerDocument

EXCEL_EXTENSIONS = {"xlsx", "xlx", "xlmx"}
LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'


def upload_file(request):
    """Retrieves the file from request.files property and saves it under UPLOAD FOLDER defined in config file"""

    try:
        if 'file' not in request.files:
            return {"uploaded": False, "message": 'No file part'}

        file = request.files['file']
        filename = file.filename
        if filename == '':
            return {"uploaded": False, "message": "No selected file"}

        file_extension = allowed_file(filename)
        if file and file_extension:
            file_id = generate_id(filename)
            file_id_path = file_id + "/"
            file.save(get_path(file_id_path, file_id, extension=file_extension, as_folder=False, create=True))

            if file_extension in EXCEL_EXTENSIONS:
                worksheets_map = convert_excel(file_id_path,file_id, file_extension)
                if worksheets_map:
                    return {"uploaded": True, "filename": file.filename, "file_id": file_id,
                            "worksheets_map": worksheets_map,
                            "filetype": file_extension, "excel": True}
                else:
                    shutil.rmtree(get_path(file_id_path, file_id, as_folder=True, create=True))
                    return {"uploaded": False, "message": "Can not be converted"}

            return {"uploaded": True, "filename": file.filename, "file_id": file_id,
                    "worksheets_map": {filename.rsplit('.')[-1]: \
                                           file_id}, "filetype": file_extension, "excel": False}

    except Exception:
        traceback.print_exc()
        return {"uploaded": False, "message": "Exception Occured"}


def get_file_metadata(file_id, lob_id):
    """Gets the file metadata"""

    data_document = DataHandlerDocument()
    worksheet_metadata = data_document.get_file_metadata(file_id, fields={"fileId":1,"totalExposures":1})

    path = get_path(worksheet_metadata["fileId"], file_id, as_folder=False, create=False)

    columns = pd.read_csv(path, engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1, na_filter=False,delimiter=";") \
        .columns.tolist()

    # worksheet_metadata = False
    if worksheet_metadata:
        total_lines = worksheet_metadata["totalExposures"]
    else:
        total_lines = 0

    return path, columns, total_lines


def preview_file_data(file_id, params, request, filters):
    """Reads the imported file data using pagination"""
    path, columns, total_lines = get_file_metadata(file_id, int(params["lob"]))
    indices = []
    filtred = False
    sort_indices = []
    filter_indices = set()

    if filters:
        indices = apply_filter(path, filters)
        filter_indices.update(indices)
        filtred = True
    # if sort:
    #     sort_indices = apply_sort(path, sort)
    #     if filter_indices:
    #         indices = [elem for elem in sort_indices if elem in filter_indices]
    #     filtred = True
    indices = indices if indices else sort_indices or list(filter_indices)
    total_lines = len(indices) if indices else total_lines


    preview = get_dataframe_page(path, columns, request.base_url, params, total_lines, filtred, indices, False)
    #
    # base_url = request.base_url
    # paginator = Paginator(base_url=base_url, query_dict=params, page=int(params["page"]), limit=int(params["nrows"]))
    #
    #
    # data = paginator.load_paginated_dataframe(path, total_lines)
    # exposures = paginator.get_paginated_response(data, columns)
    return preview


def apply_modifications(file_id, preview):
    """Apply the modifications for a preview"""

    data_document = DataHandlerDocument()

    for index in preview["index"]:
        modification = data_document.get_modification(file_id, index)
        if modification:
            preview["data"][index] = modification["content"]

    return preview


def create_file_metadata(import_status, domain_id):
    data_document = DataHandlerDocument()
    for key, value in import_status["worksheets_map"].items():
        path = get_path(import_status["file_id"], value, as_folder=False, create=False)
        columns = pd.read_csv(path, engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1, na_filter=False,delimiter=";") \
            .columns.tolist()
        with open(path, 'r', encoding="utf-8") as csvfile:
            total_lines = sum(1 for _ in csvfile) - 1
        data_document.create_file_metadata_by_domain(import_status["file_id"], value, import_status["filename"], key,
                                                     domain_id, columns, total_lines)


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


def describe(column, sheet_id):
    metadata = DataHandlerDocument().get_worksheet_metadata_by_id(sheet_id)

    df = pd.read_csv(get_path(metadata['fileId'], metadata['worksheetId']), usecols=[column], sep=';',na_filter=False)
    s = df[column]
    description=dict()
    description.update(eval(s.describe().to_json()))

    description.update({"nan": int(s[(s == '') | (s.isna())].count())})

    return description

