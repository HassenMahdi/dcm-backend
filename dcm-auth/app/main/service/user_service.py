import uuid
import datetime

from app.db.Models.user import User
from app.main.service.blacklist_service import save_token


def save_new_user(data):
    user = User().load({'email': data['email']})
    if not user.id:
        new_user = User(**dict(
            id=str(uuid.uuid4()),
            email=data['email'],
            last_name=data['last_name'],
            first_name=data['first_name'],
            password=data['password'],
            admin=data.get('admin', False),
            roles=data.get('roles', []),
            created_on=datetime.datetime.utcnow(),
            modified_on=datetime.datetime.utcnow()
        ))
        save_changes(new_user)
        return generate_token(new_user)
    else:
        response_object = {
            'status': 'fail',
            'message': 'User already exists. Please Log in.',
        }
        return response_object, 409


def update_user(data):
    user = get_a_user(data['id'])
    if user:
        user.email = data['email']
        user.last_name = data['last_name']
        user.first_name = data['first_name']
        user.admin = data.get('admin', False)
        user.roles = data.get('roles', [])
        user.modified_on = datetime.datetime.utcnow()
        save_changes(user)
        return user
    else:
        response_object = {
            'status': 'fail',
            'message': 'No user with provided id found.',
        }
        return response_object, 409


def get_all_users():
    return User.get_all()


def get_a_user(public_id):
    user = User().load({'_id': public_id})
    return user if user.id else None


def generate_token(user):
    try:
        # generate the auth token
        auth_token = User.encode_auth_token(user.id)
        response_object = {
            'status': 'success',
            'message': 'Successfully registered.',
            'Authorization': auth_token.decode()
        }
        return response_object, 201
    except Exception as e:
        response_object = {
            'status': 'fail',
            'message': 'Some error occurred. Please try again.'
        }
        return response_object, 401


def save_changes(data):
    data.save()


def delete_user(public_id):
    user = get_a_user(public_id)
    if user:
        user.delete()
        return True
    else:
        return False


def update_password(data):
    token = data['token']
    resp = User.decode_auth_token(token)
    if not isinstance(resp, str):
        user = User().load({'_id': resp['token']})
        user.password = data['password']
        user.modified_on = datetime.datetime.utcnow()
        save_changes(user)
        save_token(token)
        return {
            'status': 'success',
            'message': 'Password Changed.',
        }, 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'No user with provided id found.',
        }
        return response_object, 409
