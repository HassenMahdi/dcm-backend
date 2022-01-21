#!/usr/bin/python
# -*- coding: utf-8 -*-

import os
import hashlib
import datetime
import traceback
from pathlib import Path

from werkzeug.utils import secure_filename
from flask import current_app as app
import pandas as pd

from api.utils.converter import excel_to_csv
from api.utils.paginator import Paginator


EXCEL_EXTENSIONS = {"xlsx", "xlx", "xlmx"}
ZIP_EXTENTIONS = {"zip", "7z"}
CSV_EXTENSIONS = {"csv"}

ALLOWED_EXTENSIONS = {*EXCEL_EXTENSIONS, *ZIP_EXTENTIONS, *CSV_EXTENSIONS}

IMPORT_FOLDER = "imports/"


def get_upload_file_path(folder=""):
    """constructs the full path for a file under UPLOAD FOLDER """

    upload_path = Path(app.config['UPLOAD_FOLDER'] + "/" + IMPORT_FOLDER)
    return upload_path.joinpath(folder)


def get_path(folder, filename="", as_folder=False, create=False, extension="csv"):
    """Creates the full path for a file under UPLOAD FOLDER"""

    folder_path = Path(get_upload_file_path(folder=folder))
    if create:
        folder_path.mkdir(parents=True, exist_ok=True)
    if as_folder:
        return str(folder_path)
    else:
        return str(folder_path.joinpath(f"{filename}.{extension}"))


def allowed_file(filename):
    """Checks if the imported file format is allowed"""

    file_extension = filename.rsplit('.', 1)[-1].lower()

    if '.' in filename and file_extension in ALLOWED_EXTENSIONS:
        return file_extension


def generate_id(token):
    """Generates a unique hashed id for token based on timestamp"""

    timestamp = f"{str(datetime.datetime.now().date())}_{str(datetime.datetime.now().time()).replace(':', '.')}"
    token = f"{secure_filename(token)}_{timestamp}"

    return f"{hashlib.sha256(token.encode('utf-8')).hexdigest()}"


def convert_excel(filepath, filename, extension):
    """Converts imported file's worksheet in IMPORT_FOLDER"""

    try:
        excel_file_path = get_path(filepath, filename, extension=extension, as_folder=False, create=True)
        csv_destination_path = get_path(filepath, filename="", as_folder=True, create=True) + '/'
        return excel_to_csv(excel_file_path, csv_destination_path)
    except Exception:
        traceback.print_exc()
        return False


def get_transformed_df(path, nrows=None, skiprows=None, usecols=None):
    """Gets the transformed dataframe"""
    return pd.read_csv(path, sep=';',na_filter=False, dtype=str, nrows=nrows, skiprows=skiprows, usecols=usecols)


def get_dataframe_page(path, columns, categories, base_url, params, total_exposures, filtred, indices=None, sort=None):
    """Gets the dataframe page using Paginator class"""

    paginator = Paginator(base_url=base_url, query_dict=params, page=int(params["page"]), limit=int(params["nrows"]))
    data = paginator.load_paginated_dataframe(path, total_exposures, filtred, filter_indices=indices)
    if sort:
        data.index.name = "index"
        data = data.sort_values(by=[sort["column"], "index"], ascending=sort["order"])

    return paginator.get_paginated_response(data, columns, categories)
