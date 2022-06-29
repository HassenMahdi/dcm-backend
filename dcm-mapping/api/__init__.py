from flask_restx import Api
from flask import Blueprint

from api.views import mapping_namespace


mapping_bp = Blueprint('mapping_api', __name__)

mapping_api = Api(mapping_bp,
                  title='Mapping Files Columns',
                  version='1.0',
                  description='API mapping DCM imported files columns'
                  )

mapping_api.add_namespace(mapping_namespace, path='/mapping')
