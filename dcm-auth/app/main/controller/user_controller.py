from flask import request
from flask_restplus import Resource

from app.main.util.decorator import admin_token_required
from ..service.mail_service import send_reset_password_mail
from ..util.dto import UserDto
from ..service.user_service import save_new_user, get_all_users, get_a_user, delete_user, update_user, update_password

api = UserDto.api
_user = UserDto.user


@api.route('/')
class UserList(Resource):
    @api.doc('list_of_registered_users')
    # @admin_token_required
    @api.marshal_list_with(_user, envelope='data')
    def get(self):
        """List all registered users"""
        return get_all_users()

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully created.')
    # @admin_token_required
    @api.doc('create a new user')
    def post(self):
        """Creates a new User """
        data = request.json
        return save_new_user(data=data)

    @api.expect(_user, validate=True)
    @api.response(201, 'User successfully updated.')
    # @admin_token_required
    @api.doc('update user')
    @api.marshal_with(_user)
    def put(self):
        """Creates a new User """
        data = request.json
        return update_user(data=data)


@api.route('/<public_id>')
@api.param('public_id', 'The User identifier')
@api.response(404, 'User not found.')
class User(Resource):
    @api.doc('get a user')
    @api.marshal_with(_user)
    # @admin_token_required
    def get(self, public_id):
        """get a user given its identifier"""
        user = get_a_user(public_id)
        if not user:
            api.abort(404)
        else:
            return user

    @api.doc('Delete User')
    @api.marshal_with(_user)
    # @admin_token_required
    def delete(self, public_id):
        """get a user given its identifier"""
        return delete_user(public_id)


@api.route('/password')
class UserPassword(Resource):
    @api.doc('Reset password request')
    def post(self):
        email = request.json['email']
        return send_reset_password_mail(email, request)\

    @api.doc('Reset password')
    def put(self):
        data = request.json
        return update_password(data=data)


