#!/usr/bin/python
# -- coding: utf-8 --
import json
import traceback

from flask import request, jsonify
from flask_restx import Resource, Namespace, fields
from werkzeug.datastructures import FileStorage

from api.version_1.controllers import describe
from api.utils import responses as resp
from api.version_2.service.file_service import upload_file, preview_file_data, create_file_metadata, \
    generate_sheet, list_files_in_user_directory, select_file, generate_report
from database.data_handler_document import DataHandlerDocument

import_namespace_v2 = Namespace("importing")


@import_namespace_v2.route('/')
class ImportingData(Resource):
    parser = import_namespace_v2.parser()
    parser.add_argument('filename', type=FileStorage, location='files', required=True)

    @import_namespace_v2.doc("Import Data Capture File(XLSX/CSV/TXT)")
    @import_namespace_v2.expect(parser)
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


@import_namespace_v2.route('/sheet')
class GenerateSheetData(Resource):

    @import_namespace_v2.doc("generate Sheet From selected sheet in file")
    def post(self):
        try:
            params = request.json
            generated_sheet = generate_sheet(params['file_id'], params['sheetId'], params["cs"], params["ce"],
                                             params["rs"], params["re"])

            return generated_sheet
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.SERVER_ERROR_500)


@import_namespace_v2.route('/report/<file>')
class DataReport(Resource):
    @import_namespace_v2.doc("Get file metadata report")
    def get(self, file):
        try:
            report_content = generate_report(file)
            json_report_content= json.loads(report_content)
            return json_report_content
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.SERVER_ERROR_500)


@import_namespace_v2.route('/data/<file>', methods=['GET', 'PUT'])
@import_namespace_v2.route('/data', methods=['POST'])
class PreviewData(Resource):
    get_req_params = {"page": "The page number", "nrows": "Number of rows to preview", "lob": "Lob identifier"}

    post_request_body = import_namespace_v2.model("PreviewData", {
        "file": fields.String(required=True),
        "index": fields.Integer(required=True),
        "content": fields.List(fields.String, required=True)
    })

    # /import/data?filename=1577200541584&filetype=xlsx&page=1&worksheet=0&nrows=None
    @import_namespace_v2.doc("Preview the file's data")
    @import_namespace_v2.doc(params=get_req_params)
    def put(self, file):
        try:
            params = {param: request.args.get(param) for param in ["page", "nrows", "lob"]}
            body = request.get_json()
            filters = body.get('filters', [])
            preview = preview_file_data(file, params, request, filters, None)
            # modified_preview = apply_modifications(file, preview)
            # modified_preview = preview

            return jsonify(preview)

        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.SERVER_ERROR_500)

    # # /import/data
    # @import_namespace_v2.doc("Modify the previewed data for next steps")
    # @import_namespace_v2.expect(post_request_body)
    # def post(self):
    #     if request.method == 'POST':
    #         try:
    #             params = {param: request.get_json().get(param) for param in ["file", "index", "content"]}
    #
    #             document = DataHandlerDocument()
    #             document.save_modifications(params)
    #             return True
    #         except Exception:
    #             traceback.print_exc()
    #             return resp.response_with(resp.BAD_REQUEST_400)


@import_namespace_v2.route('/test', methods=['GET'])
class TestController(Resource):

    @import_namespace_v2.doc("Test Microservice")
    def get(self):
        return 'Works!'


@import_namespace_v2.route('/describe', methods=['POST'])
class DescribeController(Resource):
    def post(self):
        payload = request.json

        return jsonify(describe(payload["column"], payload["sheet_id"]))


@import_namespace_v2.route('/files/<uid>', methods=['GET'])
class FilesController(Resource):

    @import_namespace_v2.doc("Files Microservice")
    def get(self, uid):
        return list_files_in_user_directory(uid)


@import_namespace_v2.route('/files/select/<domainid>/<uid>/<filename>', methods=['GET'])
class FilesController(Resource):

    @import_namespace_v2.doc("Files Microservice")
    def get(self, domainid, uid, filename):
        import_status = select_file(uid, filename)
        if import_status["uploaded"]:
            import_status["uid"] = uid
            create_file_metadata(import_status, domainid)
            return jsonify(import_status)
        else:
            raise Exception()