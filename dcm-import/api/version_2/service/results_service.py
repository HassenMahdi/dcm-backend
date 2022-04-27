from pathlib import Path

from api.utils.dataframe import read_csv
from flask import current_app as app

from database.connection import mongo

RESULT_FOLDER = "results/"


def get_result_df(file_id, result_id, indices):
    file_path = Path(app.config['UPLOAD_FOLDER'] + "/" + RESULT_FOLDER+ "/" + file_id + "/" + result_id + ".csv")
    nrows=None
    skiprows=None
    if indices:
        nrows = len(indices)
        skiprows = set(range(0, max(indices) + 1)) - set(indices)
    return read_csv(file_path, skip_rows=skiprows, n_rows=nrows, dtype=None)

def get_result_metadata(result_id):
    return mongo.db.check_results.find_one({"result_id":result_id})


def get_result_data(result_id, indices):
    headers = []
    data = [[] for i in range(len(indices))]
    checks = []
    result_metadata = get_result_metadata(result_id)

    if result_metadata:
        checks = result_metadata.get("checks", [])
        file_id = result_metadata.get("file_id", [])

        result = get_result_df(file_id, result_id, indices)
        headers = [eval(c) for c in result.columns.tolist()]
        data = result.values.tolist()

    return {
        "check_metadata": headers,
        "check_results": data,
        "checks": checks
    }