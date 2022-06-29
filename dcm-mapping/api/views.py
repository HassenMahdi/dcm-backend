#!/usr/bin/python
# -*- coding: utf-8 -*-

import traceback

from flask import request, jsonify, current_app
from flask_restx import Resource, Namespace, fields

from api.controllers import start_new_mapping, read_column_head, get_top_panel_values, get_template, save_top_panel, \
    save_template, find_templates_ids, apply_modifications, get_mappings, get_mapping, check_names, \
    load_automatic_mapping, delete_mapping, get_archived_mappings, check_mapping_usability
from api.utils import responses as resp
from database.mapper_document import MapperDocument

mapping_namespace = Namespace("mapping")


@mapping_namespace.route('/')
class Mapper2(Resource):
    mapping = mapping_namespace.model("Mapping", {
        "source": fields.List(fields.String(required=True), required=True),
        "target": fields.String(required=True),
    })

    post_request_body = mapping_namespace.model("Mapper", {
        "mapping_id": fields.String(required=True),
        "file": fields.String(required=True),
        "lob": fields.Integer(required=True),
        "mapping": fields.List(fields.Nested(mapping, required=True), required=True)
    })


    # /mapping?file=1577200541584&lob=1
    @mapping_namespace.doc("Get the auto generated mappings")
    def get(self):
        params = {param: request.args.get(param) for param in ["file", "domainId", "name", "transformed"]}

        try:
            mapping_id, mapping, version ,target_fields, columns_details = start_new_mapping(params)
            return jsonify(
                {"mapping_id": mapping_id, "columns_details": columns_details, "target_fields": target_fields,
                 "mappings": mapping})
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)

    # /mapping
    @mapping_namespace.doc("Starts the manual mapping job to identify the file's headers")
    @mapping_namespace.expect(post_request_body)
    def post(self):

        if request.method == 'POST':
            try:
                params = {param: request.get_json().get(param) for param in
                          ["mapping_id", "file", "domainId", "mapping", "name"]}
                mapper = MapperDocument()
                mapper.update_mappings(params)

                return True
            except Exception:
                traceback.print_exc()
                return resp.response_with(resp.BAD_REQUEST_400)


@mapping_namespace.route('/save')
class Mapper2(Resource):
    mapping = mapping_namespace.model("Mapping", {
        "source": fields.List(fields.String(required=True), required=True),
        "target": fields.String(required=True),
    })

    post_request_body = mapping_namespace.model("Mapper", {
        "name": fields.String(required=True),
        "parentMappingId": fields.String(required=True),
        "file": fields.String(required=True),
        "domainId": fields.String(required=True),
        "transformed": fields.String(required=True),
        "mapping": fields.List(fields.Nested(mapping, required=True), required=True)
    })

    # /mapping/save
    @mapping_namespace.doc("Get the auto generated mappings")
    @mapping_namespace.expect(post_request_body)
    def post(self):
        params = {param: request.get_json().get(param) for param in
                  ["name", "file", "domainId", "mapping", "transformed", "parentMappingId", "description"]}
        mapping_id, mapping, version, target_fields, columns_details = start_new_mapping(params)
        return jsonify(
            {"mapping_id": mapping_id, "columns_details": columns_details, "target_fields": target_fields,
             "mappings": mapping, "version": version})
        # try:
        #     mapping_id, mapping, version, target_fields, columns_details = start_new_mapping(params)
        #     return jsonify(
        #         {"mapping_id": mapping_id, "columns_details": columns_details, "target_fields": target_fields,
        #          "mappings": mapping, "version": version})
        # except Exception as e:
        #     print(e)
        #     current_app
        #     return {
        #         "message": str(e),
        #         "status": "fail"
        #     }, 500


@mapping_namespace.route('/previous-mappings/<domain_id>', methods=['GET'])
class PreviousMappings(Resource):

    @mapping_namespace.doc("Get list of previously saved mappings")
    def get(self, domain_id):
        try:
            saved_mappings = get_mappings(domain_id)
            return saved_mappings
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)


@mapping_namespace.route('/check-usability/<mapping_id>', methods=['GET'])
class CheckUsability(Resource):
    @mapping_namespace.doc("Check the usability of a mapping")
    def get(self, mapping_id):
        try:
            return {"check": check_mapping_usability(mapping_id)}
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)


@mapping_namespace.route('/archived_mappings/<domain_id>', methods=['GET'])
class PreviousMappings(Resource):

    @mapping_namespace.doc("Get list of previously deleted mappings")
    def get(self, domain_id):
        try:
            saved_mappings = get_archived_mappings(domain_id)
            return saved_mappings
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)


@mapping_namespace.route('/load_auto', methods=['GET'])
class ApplyMapping(Resource):

    @mapping_namespace.doc("Get mapping by id")
    def get(self):
        params = {param: request.args.get(param) for param in ["file", "domainId", "mappingId"]}

        try:
            mapping, target_fields, columns_details = load_automatic_mapping(params)
            return jsonify(
                {"columns_details": columns_details, "target_fields": target_fields,
                 "mappings": mapping})
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)


@mapping_namespace.route('/apply', methods=['GET', 'DELETE'])
class LoadAutomaticMapping(Resource):

    @mapping_namespace.doc("Apply mapping")
    def get(self):
        params = {param: request.args.get(param) for param in ["file", "domainId", "mappingId"]}

        try:
            mapping_id, mapping, target_fields, columns_details = get_mapping(params)
            return jsonify(
                {"mapping_id": mapping_id, "columns_details": columns_details, "target_fields": target_fields,
                 "mappings": mapping})
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)

    @mapping_namespace.doc("Delete mapping")
    def delete(self):
        params = {param: request.args.get(param) for param in ["mapping_id"]}
        try:
            deleted = delete_mapping(params)
            if not deleted:
                raise Exception("Mapping not found")
            else:
                return True
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)

@mapping_namespace.route('/check', methods=['GET'])
class CheckName(Resource):

    @mapping_namespace.doc("check if the name exists")
    def get(self):
        params = {param: request.args.get(param) for param in ["domainId", "name"]}

        try:
            check = check_names(params)
            return check
        except Exception:
            traceback.print_exc()
            return resp.response_with(resp.BAD_REQUEST_400)

