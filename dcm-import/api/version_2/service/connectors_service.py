from connectors.cloud_connectors.azure_connectors.collection_connector import CollectionConnector
from connectors.connector import Connector
from connectors.connector_factory import ConnectorFactory
from flask import current_app

from api.utils.utils import get_path, generate_id
from api.version_2.service.file_service import create_sheet_metadata
import datetime

import collections

import pandas as pd

from database.data_handler_document import DataHandlerDocument

from pymongo import MongoClient


def flatten(d, parent_key='', sep='_'):
    items = []
    for k, v in d.items():
        new_key = parent_key + sep + k if parent_key else k
        if isinstance(v, collections.MutableMapping):
            items.extend(flatten(v, new_key, sep=sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

class MongoDBConnector(Connector):

    def __init__(self, **kwargs):
        self.host = "localhost"
        self.port = 27017
        self.db = "dcm"

    def get_client(self):
        return MongoClient(host=self.host, port=self.port)

    def get_df(self, collection=None, query=None ,**kwargs):
        db = self.get_client()[self.db]
        col = db[collection]

        evaled_query = []
        if query:
            evaled_query = eval(query)

        result = col.aggregate(evaled_query)

        df = pd.DataFrame([flatten(d) for d in result])
        return df

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
    elif type == "MONGODB_IMPORT_CONNECTOR":
        data_document = DataHandlerDocument()
        con_info = data_document.get_connector_by_id(connector_id)
        connector = MongoDBConnector(**con_info)
    else:
        data_document = DataHandlerDocument()
        con_info = data_document.get_connector_by_id(connector_id)
        connector = ConnectorFactory.get_data(con_info)

    return connector