import os, random, string
class Config(object):
    basedir = os.path.abspath(os.path.dirname(__file__))
    ASSETS_ROOT = os.getenv('ASSETS_ROOT', '/static/assets')
    SECRET_KEY = ''.join(random.choice( string.ascii_lowercase  ) for i in range( 32 ))
    SQLALCHEMY_TRACK_MODIFICATIONS = False    
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'db.sqlite3') 
class DebugConfig(Config):
    DEBUG = True
config_dict = {
    'Debug'     : DebugConfig
}
