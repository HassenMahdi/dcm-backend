from flask_restplus import Api
from flask import Blueprint

from .main.controller.user_controller import api as user_ns
from .main.controller.auth_controller import api as auth_ns

blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='DCM User Authentication',
          version='1.0',
          description='User Management and Auth'
          )

api.add_namespace(user_ns, path='/user')
api.add_namespace(auth_ns)