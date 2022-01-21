from pathlib import Path

from api.utils.dataframe import read_csv
from flask import current_app as app

RESULT_FOLDER = "results/"


def get_result_df(result_id, indices):
    file_path = Path(app.config['UPLOAD_FOLDER'] + "/" + RESULT_FOLDER + "/" + result_id + ".csv")
    nrows=None
    skiprows=None
    if indices:
        nrows = len(indices)
        skiprows = set(range(0, max(indices) + 1)) - set(indices)
    return read_csv(file_path, skip_rows=skiprows, n_rows=nrows, dtype=None)

def get_result_metadata(result_id):
    pass


def get_result_data(result_id, indices):

    if result_id:
        result = get_result_df(result_id, indices)
        headers = [eval(c) for c in result.columns.tolist()]
        data = result.values.tolist()
    else:
        headers = []
        data = [[] for i in range(len(indices))]
    return {
        "headers": headers,
        "data": data
    }