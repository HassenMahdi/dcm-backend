#!/usr/bin/python
# -*- coding: utf-8 -*-
from flask import request
from flask_restx import Resource, Namespace, fields

from api.version_2.service.results_service import get_result_data

result_namespace_v2 = Namespace("results")


@result_namespace_v2.route('/')
class ResultData(Resource):


    @result_namespace_v2.expect(result_namespace_v2.model('Result Paylod',{
        'result_id': fields.String(required=True, ),
        'indices': fields.List(fields.Integer, required=True, ),
    }))
    @result_namespace_v2.doc("Get Check Results")
    def post(self):
        payload = request.json
        indices = payload.get("indices")
        result_id = payload.get("result_id")
        return get_result_data(result_id, indices)

