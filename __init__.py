
from genericpath import exists
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_login import LoginManager
from os.path import exists
from os import mkdir

db = SQLAlchemy()
cors = CORS()
login_menager = LoginManager()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.DevelopmentConfig')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)
    cors.init_app(app)
    login_menager.login_view = "auth.login"
    login_menager.init_app(app)

    if not exists(app.config["EXCEL_FILES"]):
        mkdir(app.config["EXCEL_FILES"])
    
    from .models import StaffUser
    @login_menager.user_loader
    def load_user(user_id):
        # since the user_id is just the primary key of our user table, use it in the query for the user
        return StaffUser.query.get(int(user_id))
    with app.app_context():
        from .auth import auth as auth_blueprint
        app.register_blueprint(auth_blueprint)

        from .files import files as files_blueprint
        app.register_blueprint(files_blueprint)

        from .stats import stats as stats_blueprint
        app.register_blueprint(stats_blueprint)

        db.create_all()

    from .main import main as main_blueprint 
    app.register_blueprint(main_blueprint) 

    return app
