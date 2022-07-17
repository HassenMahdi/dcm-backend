from flask import request, jsonify
from flask_restplus import Resource, fields

from app.main.service.preview_service import preview_file_data
from ..util.dto import PipeDto
from ..service.transfos_service import *
from ..service.transformation_pipe_service import *


api = PipeDto.api
pipe = PipeDto.pipe


@api.route('/')
class Transfos(Resource):
    """
        Transfo Resource
    """

    @api.doc('Get All Domains')
    @api.marshal_list_with(pipe)
    def get(self):
        return get_all_pipes()

    @api.doc('Create/Update Pipe')
    @api.response(201, 'User successfully created/updated.')
    @api.expect(pipe, validate=True)
    @api.marshal_with(pipe)
    def post(self):
        # get the post data
        post_data = request.json
        return save_pipe(data=post_data)

    @api.doc('delete Domains')
    @api.response(201, 'User successfully deleted.')
    @api.expect(pipe, validate=True)
    @api.marshal_with(pipe)
    def delete(self):
        # get the post data
        post_data = request.json
        return delete_pipe(data=post_data)


@api.route('/<domain_id>')
class Pipes(Resource):
    """
        Pipe Resource
    """

    @api.doc('Get Pipes By Domain Id')
    @api.marshal_list_with(pipe)
    def get(self, domain_id):
        return get_domains_by_domain_id(domain_id)


@api.route('/<file_id>/<sheet_id>/<pipe_id>')
class Execution(Resource):
    """
        Pipe Resource
    """

    @api.doc('Execute Pipe')
    def get(self, file_id, sheet_id, pipe_id):
        return {"transformed_file_id": main(file_id, sheet_id, pipe_id)}


@api.route('/preview')
class PreviewTransformation(Resource):
    """
        Pipe Resource
    """
    url_request_params = {"page": "The page number", "nrows": "Number of rows to preview"}
    sort = api.model('Sort', {
        "column": fields.String(required=True),
        "order": fields.String(required=True)
    })
    column_filter = api.model('ColumnFilter', {
        "column": fields.String(required=True),
        "operator": fields.String(required=True),
        "value": fields.String(required=True)
    })
    body_request = api.model('Preview', {
        "filename": fields.String(required=True),
        "filter": fields.List(fields.Nested(column_filter, required=True), required=False),
        "sort": fields.Nested(sort, required=False)
    })

    @api.doc('Preview Transfo')
    @api.doc(params=url_request_params)
    @api.expect(body_request)
    def post(self):
        try:
            url_params = {param: request.args.get(param) for param in ["page", "nrows"]}
            params = {param: request.get_json().get(param) for param in ["filename", "filter", "sort"]}
            preview = preview_file_data(params["filename"], url_params, params["filter"], params["sort"], request)
            return jsonify(preview)
        except Exception as exp:
            print(exp)
            traceback.print_exc()


@api.route('/check/<pipe_id>')
class CheckPipe(Resource):
    """
        Pipe Resource
    """

    @api.doc('Check Pipe')
    def get(self, pipe_id):
        return jsonify(check_pipe_syntax(pipe_id))


@api.route('/plugins/<plugin_id>')
class PluginExecution(Resource):
    """
        Pipe Resource
    """
    @api.doc('Execute plugin')
    def get(self, plugin_id):
        return {"transformed_file_id": execute_plugin(plugin_id)}
