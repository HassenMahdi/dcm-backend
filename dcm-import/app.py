import os

from flask import Flask
from flask_cors import CORS

from config import config_by_name
from api import import_bp
from database.data_handler_document import mongo


def create_app(config_name):
    """Creates the flask app and initialize its component"""

    app = Flask(__name__)
    app.config.from_object(config_by_name[config_name])
    CORS(app)
    mongo.init_app(app)
    app.register_blueprint(import_bp)

    return app


app = create_app(os.getenv('APP_ENV') or 'dev')

if __name__ == '__main__':
    app.run(port=5001, debug=True)
