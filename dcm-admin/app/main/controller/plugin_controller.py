from flask import request, jsonify
from flask_restplus import Resource

# from ..service.auth_helper import Auth
from ..service.plugin_service import save_plugin, get_plugins_by_sup_dom_id
from ..util.decorator import token_required
from ..util.dto import DomainDto, PluginDto

api = PluginDto.api
dto = PluginDto.plugin


@api.route('/')
class PluginController(Resource):

    @token_required
    @api.doc('Create/Update plugins')
    @api.response(201, 'Plugin Domain successfully created/updated.')
    # @api.marshal_with(dto, code=201)
    def post(self):
        # get the post data
        post_data = request.json
        return save_plugin(data=post_data)

@api.route('/<sup_dom_id>')
class PluginController(Resource):
    @api.doc('Get Plugins by super domain id')
    @api.marshal_list_with(dto)
    @token_required
    def get(self, sup_dom_id):
        return get_plugins_by_sup_dom_id(sup_dom_id)

#     @token_required
#     @api.doc('delete super Domains')
#     @api.response(201, 'Super Domain successfully deleted.')
#     @api.marshal_with(dto)
#     def delete(self):
#         # get the post data
#         post_data = request.json
#         return delete_super_domain(data=post_data)
#
#
# @api.route('/hierarchy')
# class DomainsHierarchy(Resource):
#     """
#         Domain Resource
#     """
#     @token_required
#     @api.doc('Get Domains Hierarchy')
#     # @api.marshal_list_with(dto)
#     def get(self):
#         user_rights, status = Auth.get_logged_in_user_rights(request)
#         return jsonify(get_domains_hierarchy(user_rights))

