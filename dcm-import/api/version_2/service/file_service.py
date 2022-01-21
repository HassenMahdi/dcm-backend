#!/usr/bin/python
# -- coding: utf-8 --
# from pandas_profiling import ProfileReport
import difflib
import shutil
import traceback

import pandas as pd
from pandas.errors import EmptyDataError

from api.utils.converter import get_work_sheets
from api.utils.utils import generate_id, allowed_file, get_path, get_transformed_df, \
    get_dataframe_page
from api.version_2.service.sheet_generators import generate_sheet_form_csv, generate_sheet_form_excel
from database.data_handler_document import DataHandlerDocument
from flask import current_app as app, copy_current_request_context
from os import listdir
from os.path import isfile, join
from shutil import copyfile

from database.word_document import WordDocument

EXCEL_EXTENSIONS = {"xlsx", "xlx", "xlmx"}


def upload_file(request):
    """Retrieves the file from request.files property and saves it under UPLOAD FOLDER defined in config file"""

    try:
        if 'file' not in request.files:
            return {"uploaded": False, "message": 'No file part'}

        file = request.files['file']
        filename = file.filename
        if filename == '':
            return {"uploaded": False, "message": "Empty Payload"}

        file_extension = allowed_file(filename)
        if file and file_extension:
            file_id = generate_id(filename)
            file_id_path = file_id + "/"
            full_path = get_path(file_id_path, file_id, extension=file_extension, as_folder=False, create=True)
            file.save(full_path)

            if file_extension in EXCEL_EXTENSIONS:
                worksheets = get_work_sheets(full_path)
                if worksheets:
                    return {"uploaded": True, "filename": file.filename, "file_id": file_id,
                            "worksheets": worksheets,
                            "file_type": file_extension, "excel": True, "full_path": full_path}
                else:
                    shutil.rmtree(get_path(file_id_path, file_id, as_folder=True, create=True))
                    return {"uploaded": False, "message": "Can not be converted"}

            return {"uploaded": True, "filename": file.filename, "file_id": file_id,
                    "worksheets": [{"sheetId": file_id, "sheetName": filename}], "file_type": file_extension,
                    "excel": False, "full_path": full_path}

    except Exception:
        traceback.print_exc()
        return {"uploaded": False, "message": "Exception Occured"}


def generate_report(file_id):
    data_document = DataHandlerDocument()
    worksheet_metadata = data_document.get_file_metadata(file_id, fields={"fileId": 1, "totalExposures": 1})

    path = get_path(worksheet_metadata["fileId"], file_id, as_folder=False, create=False)

    try:
        df = pd.read_csv(path, delimiter=";")

    except EmptyDataError as e:
        df = []


    # profile = ProfileReport(df, minimal=True)
    profile = None
    report_content = profile.to_json()
    return report_content



def get_file_metadata(sheet_id):
    """Gets the file metadata"""
    data_document = DataHandlerDocument()
    worksheet_metadata = data_document.get_file_metadata(sheet_id, fields={"fileId": 1, "totalExposures": 1})

    path = get_path(worksheet_metadata["fileId"], sheet_id, as_folder=False, create=False)

    try:
        columns = pd.read_csv(path, engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1, na_filter=False,
                              delimiter=";") \
            .columns.tolist()
    except EmptyDataError as e:
        columns = []

    # worksheet_metadata = False
    if worksheet_metadata:
        total_lines = worksheet_metadata["totalExposures"]
    else:
        total_lines = 0

    return path, columns, total_lines


def check_is_match(columns):
    word_document = WordDocument()
    STRING_SIM_THRESHOLD = 1
    categories = []

    def is_a_match(col, word, threshold=STRING_SIM_THRESHOLD):
        for key in word['keywords']:
            seq = difflib.SequenceMatcher(None, col.upper(), key.upper())
            d = seq.ratio()
            if d == threshold:
                categories.append({
                    "column": col,
                    "category": word['cat']
                })

    for col in columns:
        for word in word_document.get_all_words():
            is_a_match(col, word)
    return categories


def preview_file_data(file_id, params, request, filters):
    """Reads the imported file data using pagination"""
    path, columns, total_lines = get_file_metadata(file_id)
    categories = check_is_match(columns)
    indices = []
    filtred = False
    sort_indices = []
    filter_indices = set()

    if filters:
        indices = apply_filter(path, filters)
        filter_indices.update(indices)
        filtred = True
    indices = indices if indices else sort_indices or list(filter_indices)
    total_lines = len(indices) if indices else total_lines

    preview = get_dataframe_page(path, columns, categories,request.base_url, params, total_lines, filtred, indices, False)
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

    data_document.create_imported_file_metadata(import_status)


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


def generate_sheet(file_id, sheetId, cs, ce, rs, re):
    file_metadata = DataHandlerDocument().get_imported_file_metadata(file_id)

    file_name = file_metadata["filename"]

    if file_metadata.get("excel", False):
        result = generate_sheet_form_excel(file_id, sheetId, file_metadata['file_type'], cs, ce, rs, re)
    else:
        result = generate_sheet_form_csv(file_id, file_name, cs, ce, rs, re)

    sheet_id = result.get('uuid')
    sheetName = result.get('sheetName')
    total = result.get('rowCount')

    return {
        "file_id": file_id,
        "sheet_id": sheet_id,
        "sheetId": sheetId,
        'sheetName': sheetName,
        "total": total,
        "cs": cs, "ce": ce, "rs": rs, "re": re
    }


def create_sheet_metadata(generated_sheet):
    data_document = DataHandlerDocument()
    file_id = generated_sheet["file_id"]
    sheet_id = generated_sheet['sheet_id']
    sheet_name = generated_sheet['sheetName']

    limits = {
        "cs": generated_sheet['cs'],
        "ce": generated_sheet['ce'],
        "rs": generated_sheet['rs'],
        "re": generated_sheet['re'],
        "sheetId": generated_sheet['sheetId']
    }

    total_lines = generated_sheet.get('total', None)
    sheet_path = get_path(file_id, sheet_id)

    # Calculate total Lines if Selected
    if total_lines is None:
        with open(sheet_path, 'r', encoding="utf-8") as csvfile:
            total_lines = sum(1 for _ in csvfile) - 1

    if total_lines > 0:
        columns = pd.read_csv(sheet_path, engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1,
                              na_filter=False, delimiter=";") \
            .columns.tolist()
    else:
        columns = []

    data_document.create_file_metadata_by_domain(file_id, sheet_id, None, sheet_name, None, columns, total_lines,
                                                 **limits)


def list_files_in_user_directory(userid):
    try:
        mypath = app.config['UPLOAD_FOLDER'] + '/result_files/' + userid
        user_files = [f for f in listdir(mypath) if isfile(join(mypath, f))]
        return user_files
    except:
        return []


def select_file(uid, filename):
    """Retrieves the file from request.files property and saves it under UPLOAD FOLDER defined in config file"""

    try:

        file_extension = allowed_file(filename)
        if filename and file_extension:
            file_id = generate_id(filename)
            file_id_path = file_id + "/"
            src = app.config['UPLOAD_FOLDER'] + '/result_files/' + uid + '/' + filename
            full_path = get_path(file_id_path, file_id, extension=file_extension, as_folder=False, create=True)
            copyfile(src, full_path)

            if file_extension in EXCEL_EXTENSIONS:
                worksheets = get_work_sheets(full_path)
                if worksheets:
                    return {"uploaded": True, "filename": filename, "file_id": file_id,
                            "worksheets": worksheets,
                            "file_type": file_extension, "excel": True, "full_path": full_path}
                else:
                    shutil.rmtree(get_path(file_id_path, file_id, as_folder=True, create=True))
                    return {"uploaded": False, "message": "Can not be converted"}

            return {"uploaded": True, "filename": filename, "file_id": file_id,
                    "worksheets": [{"sheetId": file_id, "sheetName": filename}], "file_type": file_extension,
                    "excel": False, "full_path": full_path}

    except Exception:
        traceback.print_exc()
        return {"uploaded": False, "message": "Exception Occured"}


# def get_worksheetmetadata_by_user(uid):
#     data_document = DataHandlerDocument()
#     res = data_document.get_file_metadata_by_user(uid=uid,
#                                                   fields={"_id": 0, "file_id": 1, "filename": 1, "sheetId": 1,
#                                                           "sheetName": 1})
#     return list(res)
