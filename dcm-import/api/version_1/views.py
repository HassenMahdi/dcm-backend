#!/usr/bin/python
# -*- coding: utf-8 -*-

import traceback

from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from werkzeug.datastructures import FileStorage

from api.utils import responses as resp
from api.version_1.controllers import upload_file, preview_file_data, create_file_metadata
from database.data_handler_document import DataHandlerDocument

import_namespace = Namespace("importing")


@import_namespace.route('/')
class ImportingData(Resource):
    parser = import_namespace.parser()
    parser.add_argument('filename', type=FileStorage, location='files', required=True)

    @import_namespace.doc("Importing excel file for data capturing")
    @import_namespace.expect(parser)
    def post(self):
        if request.method == 'POST':
            try:
                params = {param: request.args.get(param) for param in ["domainId"]}
                import_status = upload_file(request)
                if import_status["uploaded"]:
                    create_file_metadata(import_status, params["domainId"])
                    return jsonify(import_status)
                else:
                    raise Exception()
            except Exception:
                traceback.print_exc()
                return resp.response_with(resp.SERVER_ERROR_500)


@import_namespace.route('/data/<file>', methods=['GET', 'PUT'])
@import_namespace.route('/data', methods=['POST'])
class PreviewData(Resource):
    get_req_params = {"page": "The page number", "nrows": "Number of rows to preview", "lob": "Lob identifier"}

    post_request_body = import_namespace.model("PreviewData", {
        "file": fields.String(required=True),
        "index": fields.Integer(required=True),
        "content": fields.List(fields.String, required=True)
    })

    # /import/data?filename=1577200541584&filetype=xlsx&page=1&worksheet=0&nrows=None
    @import_namespace.doc("Preview the file's data")
    @import_namespace.doc(params=get_req_params)
    def put(self, file):
        try:
            params = {param: request.args.get(param) for param in ["page", "nrows", "lob"]}
            body = request.get_json()
            filters = body.get('filters', [])
            preview = preview_file_data(file, params, request, filters)
            # modified_preview = apply_modifications(file, preview)
            #modified_preview = preview

            return jsonify(preview)

        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.SERVER_ERROR_500)

    # /import/data
    @import_namespace.doc("Modify the previewed data for next steps")
    @import_namespace.expect(post_request_body)
    def post(self):
        if request.method == 'POST':
            try:
                params = {param: request.get_json().get(param) for param in ["file", "index", "content"]}

                document = DataHandlerDocument()
                document.save_modifications(params)
                return True
            except Exception:
                traceback.print_exc()
                return resp.response_with(resp.BAD_REQUEST_400)


@import_namespace.route('/test', methods=['GET'])
class TestController(Resource):

    @import_namespace.doc("Test Microservice")
    def get(self):
        return 'Works!'
