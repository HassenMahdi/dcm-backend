from flask import request
from flask_restplus import Namespace, Resource, fields, marshal_with
from ..service.attrs_mapping import main

api = Namespace("mapping_attrs")

resource_fields = api.model('Resource', {
    'headers': fields.List(fields.String),
    'resource': fields.String
})

@api.route('/map_attrs')
class MappingController(Resource):
    @api.expect(resource_fields)
    def post(self):
        # Get data from request
        post_data = request.json

        headers = post_data['headers']
        resource = post_data['resource']

        return main(headers, resource)
