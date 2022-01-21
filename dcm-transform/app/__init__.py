from flask_restplus import Api
from flask import Blueprint

from .main.controller.dom_controller  import api as doms_ns
from .main.controller.transfo_controller  import api as tranfo_ns


blueprint = Blueprint('api', __name__)

api = Api(blueprint,
          title='FLASK RESTPLUS API BOILER-PLATE WITH JWT',
          version='1.0',
          description='a boilerplate for flask restplus web service'
          )

api.add_namespace(doms_ns, path='/domain')
api.add_namespace(tranfo_ns, path='/transfo')