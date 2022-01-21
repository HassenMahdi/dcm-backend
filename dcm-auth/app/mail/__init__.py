import codecs

from flask_mail import Mail

mail = Mail()


def get_reset_template():
    return codecs.open("app/mail/reset.html", 'r', 'utf-8').read()