import requests
from flask import request
from flask_restx import Namespace, Resource

import pandas as pd

from api.version_2.service.connectors_service import import_df

api_import = Namespace("api")


@api_import.route('/')
class ConnectorImport(Resource):
    def post(self):
        node = request.json
        url = node['url']
        method = node['method']

        response = requests.request(method=method, url=url)

        json = response.json()
        df = pd.json_normalize(json)

        return import_df(df)
