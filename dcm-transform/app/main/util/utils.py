import pandas as pd
from pathlib import Path
from datetime import datetime

from flask import current_app as app

from app.main.util.paginator import Paginator
from app.main.util.strings import generate_id

IMPORT_FOLDER = "imports/"


def get_upload_file_path(sheet_id, file_id):
    """constructs the full path for a file under UPLOAD FOLDER """
    upload_path = Path(app.config['UPLOAD_FOLDER'] + "/" + IMPORT_FOLDER)
    return upload_path.joinpath(file_id + "/" + sheet_id + ".csv")


def save_transformed_dataframe(df, path):
    df.to_csv(path, index=False, sep=";")
    return '.'.join(str(path).split('.')[:-1])


def get_transformed_df(path, nrows=None, skiprows=None, usecols=None):
    """Gets the transformed dataframe"""
    return pd.read_csv(path, sep=';',na_filter=False, dtype=str, nrows=nrows, skiprows=skiprows, usecols=usecols)


def getTransformedFilePath(file_id, sheet_id):
    workdir = Path(app.config['UPLOAD_FOLDER'] + "/" + IMPORT_FOLDER + "/" + file_id)
    path = workdir.joinpath(sheet_id + ".csv")
    return path


def get_dataframe_page(path, columns, base_url, params, total_exposures, filtred, indices=None, sort=None):
    """Gets the dataframe page using Paginator class"""

    paginator = Paginator(base_url=base_url, query_dict=params, page=int(params["page"]), limit=int(params["nrows"]))
    data = paginator.load_paginated_dataframe(path, total_exposures, filtred, filter_indices=indices)
    if sort:
        data.index.name = "index"
        data = data.sort_values(by=[sort["column"], "index"], ascending=sort["order"])

    return paginator.get_paginated_response(data, columns)
