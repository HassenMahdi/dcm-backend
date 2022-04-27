#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import request
from flask_restx import Resource, Namespace, fields, reqparse

from api.version_2.service.file_service import preview_file_data, preview_file_data_with_result

api = Namespace("data")

@api.route('/<sheet_id>')
class DataController(Resource):

    parser = reqparse.RequestParser()
    parser.add_argument("page", type=int, required=True)
    parser.add_argument("nrows", type=int, required=True)
    parser.add_argument("result_id", type=str)
    parser.add_argument("groupby", type=str)

    @api.expect(parser)
    @api.doc("Get Data")
    def post(self, sheet_id):
        params = self.parser.parse_args()
        body = request.get_json()
        filters = body.get('filters', [])

        result_id = params.get("result_id",None)
        groupby = params.get("groupby",None)
        page = params["page"]
        nrows = params["nrows"]

        if result_id:
            return preview_file_data_with_result(sheet_id, result_id, filters, groupby, page, nrows)
        else:
            return preview_file_data(sheet_id, params, request, filters, groupby)


