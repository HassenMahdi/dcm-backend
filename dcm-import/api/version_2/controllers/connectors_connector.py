from flask import request
from flask_restx import Namespace, Resource

from api.version_2.service.connectors_service import import_df, get_connectors
connectors = Namespace("connectors")


@connectors.route('/')
class ConnectorImport(Resource):
    def post(self):
        payload = request.json
        connector = get_connectors(**payload)
        df = connector.get_df(**payload)

        return import_df(df)


@connectors.route('/preview')
class ConnectorPreviewImport(Resource):
    def post(self):
        payload = request.json
        # FORCE PREVIEW
        payload['preview'] = True

        connector = get_connectors(**payload)
        df = connector.get_df(**payload)

        return {
            "headers": [c for c in df.columns],
            "data": df.astype(str).to_dict(orient='records'),
            "total": len(df),
        }