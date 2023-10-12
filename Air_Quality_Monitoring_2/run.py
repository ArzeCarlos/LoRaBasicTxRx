import os
from   flask_migrate import Migrate
from   sys import exit
from apps.config import config_dict
from apps import create_app, db
DEBUG = (os.getenv('DEBUG', 'False') == 'True')
get_config_mode = 'Debug'
try:
    app_config = config_dict[get_config_mode.capitalize()]
except KeyError:
    exit('Error: Invalid <config_mode>. Expected values [Debug] ')
app = create_app(app_config)
Migrate(app, db)    
if DEBUG:
    app.logger.info('DEBUG            = ' + str(DEBUG))
    app.logger.info('Page Compression = ' + 'FALSE' if DEBUG else 'TRUE' )
    app.logger.info('DBMS             = ' + app_config.SQLALCHEMY_DATABASE_URI)
    app.logger.info('ASSETS_ROOT      = ' + app_config.ASSETS_ROOT )
if __name__ == "__main__":
    app.run()
