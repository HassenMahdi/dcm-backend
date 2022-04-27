from api.utils.converter import excel_sheet_to_csv
from api.utils.dataframe import parse_columns, read_csv
from api.utils.utils import get_path, generate_id
from api.utils.access import access_to_csv

import pandas as pd

import numpy as np

from database.data_handler_document import DataHandlerDocument

sheets = DataHandlerDocument


def generate_ranged_sheet(source, target, cs, ce, rs, re):
    # Calculate Limits
    if rs and re:
        n_rows = re - rs + 1
    elif re:
        n_rows = re
    else:
        n_rows = None

    if rs:
        skip_rows = rs - 1
    else:
        skip_rows = None

    columns = parse_columns(source, skip_rows=skip_rows)

    if ce:
        columns = columns[:ce]
    if cs:
        columns = columns[cs - 1:]

    df = read_csv(source, columns=columns, skip_rows=skip_rows, n_rows=n_rows)

    # GET RID OF EMPTY LINES AND COLUMNS
    # df = df.replace('', np.nan).dropna(axis=0, how='all').dropna(axis=1, how='all')
    # SKIP INITIAL SPACE IF HEADER IS EMPTY

    if len(df.columns) > 0 and len(df.columns)==len([c for c in df.columns if 'Unnamed:' in c]):
        df = df.rename(columns=df.iloc[0]).drop(df.index[0])

    row_count = len(df)
    df.to_csv(target, sep=";", index=False)

    return row_count


def generate_sheet_form_csv(file_id, filename, cs, ce, rs, re):
    sheet_id = generate_id(file_id)
    file_path = get_path(file_id, file_id)
    destination = get_path(file_id, filename=sheet_id)

    row_count = generate_ranged_sheet(file_path, destination, cs, ce, rs, re)

    create_sheet_metadata(file_id, filename, sheet_id, filename, cs, ce, rs, re)

    return {
            "uuid": sheet_id,
            "sheetName": filename,
            "rowCount": row_count
    }


def get_base_excel_sheet(file_id, sheetId, extension):
    base_sheet = sheets.converted_excel_sheet(file_id, sheetId)
    if not base_sheet:
        # Convert base sheet
        excel_file_path = get_path(file_id, filename=file_id, extension=extension, as_folder=False)
        excel_sheet_destination_path = get_path(file_id, as_folder=True) + '/'
        base_sheet = excel_sheet_to_csv(excel_file_path, excel_sheet_destination_path, sheetId, 0, 0, 0, 0)
        create_sheet_metadata(file_id, sheetId, base_sheet["uuid"], base_sheet["sheetName"], 0, 0, 0, 0, base_sheet=True)
        print("Generating Base Sheet :" + base_sheet["uuid"])

    return base_sheet

def generate_sheet_form_excel(file_id, sheetId, extension, cs, ce, rs, re):
    # Check if un-Ranged Converted Sheet exist
    base_sheet = get_base_excel_sheet(file_id, sheetId, extension)

    uuid = generate_id(file_id)
    source_uuid = base_sheet['uuid']
    sheetName = base_sheet['sheetName']

    print("Generating Sheet :" + uuid)

    row_count = generate_ranged_sheet(get_path(file_id, source_uuid), get_path(file_id, uuid), cs, ce, rs, re)

    create_sheet_metadata(file_id, sheetId, uuid, sheetName, cs, ce, rs, re)

    return {
            "uuid": uuid,
            "sheetName": sheetName,
            "rowCount": row_count
    }


def create_sheet_metadata(file_id, sheetId, sheet_id, sheet_name, cs=0, ce=0, rs=0, re=0, base_sheet=False):
    sheet_path = get_path(file_id, sheet_id)
    # Calculate total Lines if Selected
    with open(sheet_path, 'r', encoding="utf-8") as csv_file:
        total_lines = sum(1 for _ in csv_file) - 1
    if total_lines > 0:
        columns = pd.read_csv(sheet_path, engine="c", dtype=str, skipinitialspace=True, skiprows=0, nrows=1, na_filter=False,delimiter=";") \
            .columns.tolist()
    else:
        columns = []

    sheets.create_excel_sheet_metadata(file_id, sheet_id,sheetId, sheet_name, total_lines, columns, cs,ce,rs,re, base_sheet)


def generate_sheet_form_access(file_id, table_name, cs, ce, rs, re):
    source_uuid = file_id
    target_uuid = generate_id(file_id)

    sheetName = table_name

    row_count = access_to_csv(get_path(file_id, source_uuid, extension='mdb'), get_path(file_id, target_uuid), table_name)

    # row_count = generate_ranged_sheet(get_path(file_id, source_uuid), get_path(file_id, uuid), cs, ce, rs, re)

    create_sheet_metadata(file_id, table_name, target_uuid, table_name, cs, ce, rs, re)

    return {
            "uuid": target_uuid,
            "sheetName": sheetName,
            "rowCount": row_count
    }