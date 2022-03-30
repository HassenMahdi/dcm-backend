from flask_restplus import Namespace, fields


class NullableString(fields.String):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable string'


class NullableRaw(fields.Raw):
    __schema_type__ = ['object', 'null']
    __schema_example__ = 'nullable object'


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'email': fields.String(required=True, description='user email address'),
        'username': fields.String(required=True, description='user username'),
        'password': fields.String(required=True, description='user password'),
        'public_id': fields.String(description='user Identifier')
    })


class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })


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
        'classification': fields.String(required=True, description='collection classification'),
        'enableDF': fields.Boolean(description='Enable Data Factory')
    })


class SuperDomainDto:
    api = Namespace('super-domain', description='super domain related operations')
    super_domain = api.model('super-domain', {
        'name': fields.String(required=True, description='user email address'),
        'identifier': NullableString(description='user username'),
        'description': NullableString(description='user username'),
        'id': NullableString(description='user password'),
        'created_on': fields.DateTime(description='user Identifier'),
        'modified_on': fields.DateTime(description='user Identifier'),
        'domains': fields.List(fields.Nested(DomainDto.domain)),
    })


class FieldsDto:
    api = Namespace('domain', description='domain specific fields')
    field = api.model('field', {
        'id': NullableString(description='user password'),
        'name': fields.String(description='user email address'),
        'label': fields.String(description='user username'),
        'description': NullableString(description='user username'),
        # 'category': fields.String(description='user username'),
        'type': fields.String(description='user username'),
        'mandatory': fields.Boolean(description='user username'),
        'editable': fields.Boolean(description='user username'),
        'rules': fields.List(fields.Raw, description='list of rules'),
        'created_on': fields.DateTime(description='user Identifier'),
        'modified_on': fields.DateTime(description='user Identifier'),
        'ref_type': NullableRaw,
        'primary': fields.Boolean,
    })



class ChecksDto:
    api = Namespace('domain', description='domain specific checks')

    check_param = api.model('check param', {
        'name': fields.String,
        'type': fields.String,
        'options': fields.List(fields.Raw),
        'property_types': fields.List(fields.String),
        'label': fields.String,
    })

    check = api.model('check', {
        'id': NullableString(description='user password'),
        'name': fields.String(description='user email address'),
        'description': NullableString(description='user username'),
        'category': fields.String(description='user username'),
        'parameters': fields.List(fields.Nested(check_param)),
        'property_types': fields.List(fields.String)
    })


class ReferenceTypeDto:
    api = Namespace('ref_type', description='ref_type')
    base_ref_type = api.model('Base Reference Type', {
        'id': NullableString,
        'label': fields.String,
        'description': NullableString,
        'properties': fields.List(fields.Raw),
        'domain_ids': fields.List(fields.String),
        'created_on': fields.DateTime,
        'modified_on': fields.DateTime,
        'shared': fields.Boolean,
        'parent_id': NullableString,
        'version_label': NullableString,
    })

    ref_type_version = api.model('Reference Type Version', {
        'id': NullableString,
        'description': NullableString,
        'created_on': fields.DateTime,
        'modified_on': fields.DateTime,
        'version_label': NullableString,
        'parent_id': NullableString,
    })

    ref_type = api.inherit('Reference Type', base_ref_type, {
        'versions': fields.List(fields.Nested(ref_type_version))
    })

    ref_data = api.model('Reference Data', {
        'id': NullableString,
        'code': fields.String,
        'ref_type_id':fields.String,
        'alias': fields.List(fields.String),
        'created_on': fields.DateTime,
        'modified_on': fields.DateTime,
        'properties':fields.Raw
    })


class ConnectorsDto:
    api = Namespace('connectors')
    simple = api.model("simple_connector", {
        'id': NullableString,
        "type": fields.String,
        "name": fields.String,
        "created_on": fields.DateTime,
        "modified_on": fields.DateTime,
        "description": NullableString
    })
    dto = api.inherit('connector',simple, {
        "password": NullableString,
        "host": NullableString,
        "user": NullableString,
        "url": NullableString,
        "port": fields.Integer,
        "conn_string": NullableString,
        "secret": NullableString,
        'description': NullableString,
        'database': NullableString,
        'auth_with': NullableString,
        'sas_token': NullableString,
        'shared_access_key': NullableString,
        'mode': NullableString,
        'database_type': NullableString,
    })

