from flask_restplus import Api
from flask import Blueprint

from .main.controller.health_controller import api as health_ns
from .main.controller.mapping_controller import api as map_attrs

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='DCM-MAPPING API',
          version='0.1',
          description='mapping web service'
          )

api.add_namespace(health_ns, path='/mapping')
api.add_namespace(map_attrs, path='/mapping')