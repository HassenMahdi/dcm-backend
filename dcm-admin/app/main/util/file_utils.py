import datetime
import numpy as np

import pandas as pd

EXCEL_EXTENSIONS = {"xlsx", "xlx"}
CSV_EXTENSIONS = {"csv"}
ALLOWED_EXTENSIONS = {"xlsx", "xlx", "csv"}


def allowed_file(file_name):
  file_extension = file_name.rsplit('.', 1)[-1].lower()

  if '.' in file_name and file_extension in ALLOWED_EXTENSIONS:
    return file_extension


def upload_file_as_df(file, file_name):
  file_extension = allowed_file(file_name)
  df = []
  if file and file_extension:

    if file_extension in EXCEL_EXTENSIONS:
      df = pd.read_excel(file)

    elif file_extension in CSV_EXTENSIONS:
      df = pd.read_csv(file, delimiter=";")

    return df


def mapping_columns(df):
  columns = df.columns
  types = []
  for tp in df.dtypes:
    if tp == object:
      types.append("string")
    elif tp == np.dtype(int):
      types.append("int")
    elif tp == np.dtype(float):
      types.append("double")
    elif tp == np.dtype(datetime):
      types.append("date")
  return [{"name": columns[i], "type": types[i]} for i in range(len(types))]
