import os
import urllib

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    """Base class for config"""

    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious_secret_key')
    DEBUG = True
    MONGO_DBNAME = 'dcm_db'
    CORS_HEADERS = 'Content-Type'
    PORT = os.getenv("PORT", 5001)
    UPLOAD_FOLDER = "/Users/karim/Documents/docker-data/"
    # MONGO_URI = "mongodb://root:Bxia2020DaaTa1920CAvlmd@20.74.14.235:27017/dcm?authSource=admin&readPreference=primary&ssl=false"
    MONGO_URI = "mongodb://localhost:27017/dcm"

    ASA_URI = "BlobEndpoint=https://devdcmstorage.blob.core.windows.net/;" \
                  "QueueEndpoint=https://devdcmstorage.queue.core.windows.net/;" \
                  "FileEndpoint=https://devdcmstorage.file.core.windows.net/;" \
                  "TableEndpoint=https://devdcmstorage.table.core.windows.net/;" \
                  "SharedAccessSignature=sv=2019-10-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2022-07-16T07:57:54Z&st=2020-07-15T2" \
                  "3:57:54Z&spr=https&sig=4cDoQPv%2Ba%2FQyBEFcr2pVojyMj4vgsm%2Fld6l9TPveQH0%3D"


class DevelopmentConfig(Config):
    """Dev config settings"""
    DEBUG = False

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
    MONGO_URI = os.getenv("MONGO_URI")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")

config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
