from flask import request
from flask_restplus import Namespace, Resource

api = Namespace("health")

@api.route('/connector')
class HealthController(Resource):
    def get(self):

        return {"status":"running"}