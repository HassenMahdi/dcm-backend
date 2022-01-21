import pandas as pd
from pandas.errors import EmptyDataError


def parse_columns(source, skip_rows=None):
    try:
        return pd.read_csv(source, engine="c", dtype=str, skiprows=skip_rows, nrows=1, na_filter=False,
                    delimiter=";").columns.tolist()
    except EmptyDataError as e:
        return []


def read_csv(source, skip_rows=None, columns=None, n_rows=None, skip_blank_lines=False, dtype=str):
    try:
        return pd.read_csv(source, usecols=columns, engine="c", dtype=dtype, skiprows=skip_rows, nrows=n_rows, na_filter=False,
                    delimiter=";", encoding='utf-8',error_bad_lines=False,skip_blank_lines=skip_blank_lines)
    except EmptyDataError as e:
        return pd.DataFrame([])