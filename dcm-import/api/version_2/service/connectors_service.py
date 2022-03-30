from connectors.cloud_connectors.azure_connectors.collection_connector import CollectionConnector
from connectors.connector import Connector
from connectors.connector_factory import ConnectorFactory
from flask import current_app

from api.utils.utils import get_path, generate_id
from api.version_2.service.file_service import create_sheet_metadata
import datetime

import pandas as pd

from database.data_handler_document import DataHandlerDocument

from pymongo import MongoClient


def import_df(df):
    file_id = generate_id(str(datetime.datetime.now().date()))
    sheet_id = generate_id(str(datetime.datetime.now().date()))
    sheet_path = get_path(file_id, sheet_id, create=True)

    df.to_csv(sheet_path, sep=";", index=False)

    metadata = {
        "file_id": file_id,
        "sheet_id": sheet_id,
        "sheetName": sheet_id,
        "sheetId": sheet_id,
        "cs": 0,
        "ce": 0,
        "rs": 0,
        "re": 0,
        "total": len(df),
    }

    create_sheet_metadata(metadata)

    return metadata


def real_time_preview():
    pass

def get_connectors(type, connector_id=None, **context) -> Connector:
    connector: Connector = None
    if type == 'COLLECTION_IMPORT':
        conn_string = current_app.conf['ASA_URI']
        connector = CollectionConnector(conn_string)
    else:
        data_document = DataHandlerDocument()
        con_info = data_document.get_connector_by_id(connector_id)
        connector = ConnectorFactory.get_data(con_info)

    return connector