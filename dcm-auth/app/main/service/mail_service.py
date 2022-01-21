from datetime import datetime

from flask import current_app
from flask_mail import Message

from app.db.Models.user import User
from app.mail import mail, get_reset_template


def send_reset_password_mail(user_email, request):

    user = User().load({'email': user_email})
    if user.id:
        msg = Message()
        msg.add_recipient(user_email)
        minutes = 30
        token = User.encode_auth_token(user.id, days= 0, seconds=0, minutes= minutes).decode()
        link = f'{request.referrer}/login/reset/{token}'
        msg.html = get_reset_password_html(username=f"{user.first_name} {user.last_name}",link=link, minutes=minutes, token= token)
        msg.subject = 'Reset Password Request ' + str(datetime.now())
        msg.sender = 'adm.dcm@outlook.com'
        mail.send(msg)

        response_object = {
            'status': 'success',
            'message': 'An email with a reset was sent link.',
        }
        return response_object, 200
    else:
        response_object = {
            'status': 'fail',
            'message': 'User provided email does not exist.',
        }
        return response_object, 409


def get_reset_password_html(username,link, minutes, token):
    return get_reset_template().replace('$username', username).replace("$link", link).replace("$minutes", str(minutes))