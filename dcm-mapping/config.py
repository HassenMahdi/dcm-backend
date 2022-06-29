import os
import urllib

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Base class for config"""

    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = False


class DevelopmentConfig(Config):
    """Dev config settings"""
    DEBUG = True
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    UPLOAD_FOLDER = "/scor-data"
    MONGO_DBNAME = 'dcm_db'
    MONGO_URI = "mongodb://localhost:27017/dcm?retryWrites=false"
    CORS_HEADERS = 'Content-Type'


class TestingConfig(Config):
    """Test config settings"""

    DEBUG = True
    TESTING = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'flask_boilerplate_test.db')
    PRESERVE_CONTEXT_ON_EXCEPTION = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class ProductionConfig(Config):
    """Prod config settings"""

    DEBUG = False


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY