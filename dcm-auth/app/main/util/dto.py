from flask_restplus import Namespace, fields


class NullableString(fields.String):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable string'


class NullableDatetime(fields.DateTime):
    __schema_type__ = ['string', 'null']
    __schema_example__ = 'nullable Datetime'


class UserDto:
    api = Namespace('user', description='user related operations')
    user = api.model('user', {
        'first_name': fields.String(required=True, description='user email address'),
        'last_name': fields.String(required=True, description='user email address'),
        'email': fields.String(required=True, description='user email address'),
        'password': NullableString(required=True, description='user password'),
        'created_on': NullableDatetime(description='Created on'),
        'modified_on': NullableDatetime(description='Modified on'),
        'admin': fields.Boolean(description='Is User Admin'),
        'roles': fields.List(fields.Raw, description='List of domain based access'),
        'id': NullableString(description='user Identifier')
    })


class AuthDto:
    api = Namespace('auth', description='authentication related operations')
    user_auth = api.model('auth_details', {
        'email': fields.String(required=True, description='The email address'),
        'password': fields.String(required=True, description='The user password '),
    })