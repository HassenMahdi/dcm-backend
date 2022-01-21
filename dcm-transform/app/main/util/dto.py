from flask_restplus import Namespace, fields


class NullableString(fields.String):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable string'


class DomainDto:
    api = Namespace('domain', description='us-er related operations')
    domain = api.model('domain', {
        'name': fields.String(required=True, description='user email address'),
        'identifier': NullableString(description='user username'),
        'description': NullableString(description='user username'),
        'id': NullableString(description='user password'),
        'created_on': fields.DateTime(description='user Identifier'),
        'super_domain_id': fields.String(required=True, description='Super Domain Id'),
        'modified_on': fields.DateTime(description='user Identifier'),
    })


class PipeDto:
    api = Namespace('transfo', description='us-er related operations')
    #
    # transformation = api.model('node', {
    #     'type': fields.String,
    #     'name': fields.String,
    # })

    pipe = api.model('pipe', {
        'name': fields.String(required=True, description='user email address'),
        'description': NullableString(description='user username'),
        'id': NullableString(description='user password'),
        'nodes': fields.List(fields.Raw),
        'domain_id': NullableString(),
        'created_on': fields.DateTime(description='user Identifier'),
        'modified_on': fields.DateTime(description='user Identifier'),
    })
