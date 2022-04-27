from flask_restx import Api
from flask import Blueprint

from api.version_2.controllers.connectors_connector import connectors
from api.version_1.views import import_namespace
from api.version_2.controllers.manual_import_controller import import_namespace_v2
from api.version_2.controllers.results_controller import result_namespace_v2
from api.version_2.controllers.data_controller import api as data_namespace_v2

import_bp = Blueprint('import_api', __name__)

import_api = Api(import_bp,
                 title='Importing files',
                 version='1.0',
                 description='API for importing data to DCM'
                 )

import_api.add_namespace(import_namespace, path='/import')
import_api.add_namespace(import_namespace_v2, path='/import/v2')

import_api.add_namespace(connectors, path='/import/v2/connectors')
import_api.add_namespace(result_namespace_v2, path='/import/v2/results')
import_api.add_namespace(data_namespace_v2, path='/data')
