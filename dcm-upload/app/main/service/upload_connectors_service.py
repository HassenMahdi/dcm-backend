import os

from connectors.connector import Connector
from connectors.connector_factory import ConnectorFactory
from flask import current_app
import pandas as pd

from app.db.Models.connector import ConnectorSetup

from pymongo import MongoClient

from app.main.util.strings import generate_id


class MongoDBConnector(Connector):

    def __init__(self, **kwargs):
        self.host = "localhost"
        self.port = 27017
        self.db = "dcm"

    def get_client(self):
        return MongoClient(host=self.host, port=self.port)

    def upload_df(self, df, collection=None,insertion_script=None,**kwargs):
        client = self.get_client()
        col = client[self.db][collection]

        if insertion_script:
            exec(insertion_script)
        else:
            for row in df.to_dict(orient='records'):
                _id = row.get("_id", generate_id())
                del row["_id"]
                col.update_one({"_id": _id}, {"$set": row}, upsert=True)

def get_connector(con_info):
    if con_info["type"]=="mongodb":
        return MongoDBConnector(**con_info)

    return ConnectorFactory.get_data(con_info)

def start_upload_from_connector(**args):
    # LOAD DATA
    file_id = args['file_id']
    sheet_id = args['sheet_id']
    file_path = os.path.join(current_app.config["UPLOAD_FOLDER"], 'imports', file_id, f'{sheet_id}.csv')
    df = pd.read_csv(file_path, error_bad_lines=False,engine="c", dtype=str, skipinitialspace=True, na_filter=False,delimiter=";")

    con_info = ConnectorSetup().load(query={"_id": args["connector_id"]}).__dict__

    connector: Connector = get_connector(con_info)

    connector.upload_df(df, **args)

    return {"status": "success", "message": "Data Uploaded"}, 200

