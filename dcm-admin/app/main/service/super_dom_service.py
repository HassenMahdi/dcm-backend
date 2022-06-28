import uuid
import datetime

from app.db.Models.domain import Domain
from app.db.Models.field import TargetField
from app.db.Models.super_domain import SuperDomain
from app.db.Models.user import User
from app.main.util.strings import get_next_iteration, camelCase


def get_super_dom(id):
    return SuperDomain(**dict(id=id)).load()


def save_super_domain(data):
    dom = SuperDomain(**data).load()
    if not dom.id:
        identifier = camelCase(data['name'])
        next_iter = get_next_iteration(
            SuperDomain().db().find({'identifier': {'$regex': f"{identifier}(_[1-9]+)?"}}, {'identifier': 1})
        )
        if next_iter > 0:
            identifier = f"{identifier}_{str(next_iter)}"

        new_dom = SuperDomain(
            **{**data, **{
                'id': identifier,
                'identifier': identifier,
                'created_on': datetime.datetime.utcnow()

            }})

        # super domain hierarchy
        parent_super_domain_id = data.get('parent_super_domain_id', None)
        if parent_super_domain_id:
            new_dom.parent_super_domain_id = parent_super_domain_id

        dom = new_dom

    dom.name = data['name']
    dom.description = data.get('description')
    dom.modified_on = datetime.datetime.utcnow()

    # CHECK IF NAME IS USE
    if SuperDomain().db().find_one({'_id':{'$ne': dom.id}, 'name': dom.name }):
        return {"status":'fail', "message": 'Domain name already used'}, 409

    dom.save()

    return {"status":'success', "message": 'Domain saved'}, 201


def delete_super_domain(data):
    super_dom = SuperDomain(**data).load()
    if super_dom.id:
        dms = Domain.get_all(query={'super_domain_id':super_dom.id})
        dm: Domain
        for dm in dms:
            TargetField.drop(domain_id=dm.id)
            dm.delete()

        User.remove_domain_for_users(super_dom.id)
        super_dom.delete()

    return super_dom

def get_user_query(user_rights):
    query = {}
    if user_rights:
        if not user_rights['admin']:
            query = {'_id': {'$in': user_rights['domain_ids']}}
    return query


def get_all_super_domains(user_rights=None):
    # SuperDomain.get_all(query=get_user_query(user_rights))

    return SuperDomain.get_all(query={**get_user_query(user_rights)})


def get_domains_hierarchy(user_rights={}, parent_super_domain_id=None):
    query_result = SuperDomain().db().aggregate([
        {"$match": {**get_user_query(user_rights), 'parent_super_domain_id': parent_super_domain_id}},
        {
       "$lookup": {
           'from': Domain().db().name,
           'localField': 'identifier',
           'foreignField': 'super_domain_id',
           'as': 'domains'
           }
        }])

    hierarchy = []
    for sd in query_result:
        super_domain = SuperDomain(**{**sd})
        hierarchy.append(
          super_domain.load_hierarchy()
        )

    return hierarchy
