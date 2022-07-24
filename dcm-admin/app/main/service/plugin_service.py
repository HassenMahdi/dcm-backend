import uuid
import datetime

from app.db.Models.plugin import Plugin
from app.db.Models.domain import Domain

from app.main.util.strings import camelCase


def save_plugin(data):
  domain_id = data['domain_id']
  domain = Domain(**{'identifier': domain_id}).load()

  if domain.identifier:
    plugin = Plugin(**data).load()
    if not plugin.id:

      new_plugin = Plugin(
        **{**data, **{
          'created_on': datetime.datetime.utcnow(),
          'super_domain_id': domain_id
        }})

      plugin = new_plugin

    plugin.name = data.get('name', None)
    plugin.type = data.get('type', None)
    plugin.domain_id = data.get('domain_id', None)
    plugin.mapping_id = data.get('mapping_id', False)
    plugin.pipe_id = data.get('pipe_id', False)
    plugin.file_id = data.get('file_id', False)
    plugin.sheet_id = data.get('sheet_id', False)
    plugin.modified_on = datetime.datetime.utcnow()

    if Plugin().db().find_one({'_id': {'$ne': plugin.id}, 'name': plugin.name, 'domain_id': domain.id}):
      return {"status": 'fail', "message": 'Plugin name already used in this Domain'}, 409

    plugin.save()
  else:
    return {"status": "fail", "message": "No domain with provided ID found"}, 409

  return {"status": "success", "message": "Plugin saved", "id": plugin.id}, 201


def get_plugins_by_sup_dom_id(sup_dom_id):
  plugins = Plugin.get_all(query={'super_domain_id': sup_dom_id})
  return plugins

# def delete_super_domain(data):
#     super_dom = SuperDomain(**data).load()
#     if super_dom.id:
#         dms = Domain.get_all(query={'super_domain_id':super_dom.id})
#         dm: Domain
#         for dm in dms:
#             TargetField.drop(domain_id=dm.id)
#             dm.delete()
#
#         User.remove_domain_for_users(super_dom.id)
#         super_dom.delete()
#
#     return super_dom
#
# def get_user_query(user_rights):
#     query = {}
#     if user_rights:
#         if not user_rights['admin']:
#             query = {'_id': {'$in': user_rights['domain_ids']}}
#     return query
#
#
# def get_all_super_domains(user_rights=None):
#     # SuperDomain.get_all(query=get_user_query(user_rights))
#
#     return SuperDomain.get_all(query={**get_user_query(user_rights)})
#
#
# def get_domains_hierarchy(user_rights={}, parent_super_domain_id=None):
#     query_result = SuperDomain().db().aggregate([
#         {"$match": {**get_user_query(user_rights), 'parent_super_domain_id': parent_super_domain_id}},
#         {
#        "$lookup": {
#            'from': Domain().db().name,
#            'localField': 'identifier',
#            'foreignField': 'super_domain_id',
#            'as': 'domains'
#            }
#         }])
#
#     hierarchy = []
#     for sd in query_result:
#         super_domain = SuperDomain(**{**sd})
#         hierarchy.append(
#           super_domain.load_hierarchy()
#         )
#
#     return hierarchy
