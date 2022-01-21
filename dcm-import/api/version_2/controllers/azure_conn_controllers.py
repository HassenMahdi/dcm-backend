from flask import request
from flask_restx import Namespace, Resource

from api.utils.utils import get_path, generate_id
from api.version_2.service.file_service import create_sheet_metadata
from connectors.azure_blob_connector import AzureStorageAccountService

azure_connectors_namespace = Namespace("connectors/azure")


@azure_connectors_namespace.route('/containers')
class AzureConnectorList(Resource):
    def post(self):
        payload = request.json
        connection_string = payload["conn_string"]

        service = AzureStorageAccountService(connection_string)

        return [c['name'] for c in service.list_containers()]


@azure_connectors_namespace.route('/blobs')
class AzureConnectorList(Resource):
    def post(self):
        payload = request.json
        connection_string = payload["conn_string"]
        container_name = payload["container"]
        service = AzureStorageAccountService(connection_string)
        return [b['name'] for b in service.list_blobs_in_container(container_name)]