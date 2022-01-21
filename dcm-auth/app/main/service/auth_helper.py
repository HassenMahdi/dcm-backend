from ..service.blacklist_service import save_token
from ...db.Models.user import User


class Auth:

    @staticmethod
    def login_user(data):
        try:
            # fetch the user data
            user = User().load({'email':data.get('email')})
            if user.id:
            # if user and user.check_password(data.get('password')):
                auth_token = User.encode_auth_token(user.id)
                if auth_token:
                    response_object = {
                        'status': 'success',
                        'message': 'Successfully logged in.',
                        'Authorization': auth_token.decode()
                    }
                    return response_object, 200
            else:
                response_object = {
                    'status': 'fail',
                    'message': 'email or password does not match.'
                }
                return response_object, 401

        except Exception as e:
            print(e)
            response_object = {
                'status': 'fail',
                'message': 'Try again'
            }
            return response_object, 500

    @staticmethod
    def logout_user(data):
        if data:
            auth_token = data
        else:
            auth_token = ''
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                # mark the token as blacklisted
                return save_token(token=resp['token'])
            else:
                response_object = {
                    'status': 'fail',
                    'message': resp
                }
                return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 403

    @staticmethod
    def get_logged_in_user(new_request):
        # get the auth token
        auth_token = new_request.headers.get('Authorization')
        if auth_token:
            resp = User.decode_auth_token(auth_token)
            if not isinstance(resp, str):
                user = User().load({'_id':resp['token']})
                # TODO CHANGE THIS
                response_object = {
                    'status': 'success',
                    'data': {
                        'id': user.id,
                        'email': user.email,
                        'last_name': user.last_name,
                        'first_name': user.first_name,
                        'admin': user.admin,
                        'created_on': str(user.created_on),
                        'roles': user.roles
                    }
                }
                return response_object, 200
            response_object = {
                'status': 'fail',
                'message': resp
            }
            return response_object, 401
        else:
            response_object = {
                'status': 'fail',
                'message': 'Provide a valid auth token.'
            }
            return response_object, 401