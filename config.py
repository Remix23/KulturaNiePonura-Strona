#! /bin/python3.8

import os
basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    FLASK_DEBUG = True
    FLASK_TESTING = True
    CSRF_ENABLED = True
    SECRET_KEY = os.urandom(16)
    SQLALCHEMY_DATABASE_URI = 'sqlite:///db.main'

    EXCEL_FILES = os.getcwd() + '/projekt/static/excel_files'

    # flask mail config 
    MAIL_SERVER ='smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USERNAME = 'serwis.kulturanieponura@gmail.com'
    MAIL_PASSWORD = 'kurkanaprezydenta2!'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True

class ProductionConfig(Config):
    DEBUG = False
    ENV = "production"

class StagingConfig(Config):
    ENV = "development"
    DEBUG = True 

class DevelopmentConfig(Config):
    ENV = "development"
    DEBUG = True

class TestingConfig(Config):
    TESTING = True
