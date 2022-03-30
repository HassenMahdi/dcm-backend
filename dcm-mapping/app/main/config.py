import os

# uncomment the line below for postgres database url from environment variable
# postgres_local_base = os.environ['DATABASE_URL']

basedir = os.path.abspath(os.path.dirname(__file__))


class Config:
    DEBUG = False
    SECRET_KEY = None
 

class DevelopmentConfig(Config):
    DEBUG = True
    UPLOAD_FOLDER = "/scor-data/"  
    SECRET_KEY = 'my_precious_secret_key'
    MONGO_URI = "mongodb://localhost:27017/dcm?retryWrites=false"

class TestingConfig(Config):
    DEBUG = True
    TESTING = True


class ProductionConfig(Config):
    DEBUG = False
    SECRET_KEY = os.getenv("SECRET_KEY")
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")
    MONGO_URI = os.getenv("MONGO_URI")


config_by_name = dict(
    dev=DevelopmentConfig,
    test=TestingConfig,
    prod=ProductionConfig
)

key = Config.SECRET_KEY
