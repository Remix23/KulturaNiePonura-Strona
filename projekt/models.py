#! /bin/python3.8
# -*- coding: utf-8 -*-

from . import db
from datetime import datetime
import random, string

class StaffUser (db.Model):

    id = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name = db.Column(db.String(1000))

    def __init__(self, email, password, name) -> None:
        self.email = email
        self.password = password
        self.name = name

    def __repr__(self) -> str:
        return self.name

class Person(db.Model):

    id = db.Column(db.Integer, primary_key=True)
    for_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    nick = db.Column(db.String(50), nullable=True)
    social_channel = db.Column(db.String(50), nullable=True)
    
    living_place = db.Column(db.String(50), nullable=False)
    about = db.Column(db.String(200), nullable=False)
    art_kind_desription = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.String(200), nullable=False)

    phone_number = db.Column(db.Integer, nullable=True)
    link = db.Column(db.String(100), nullable=True)
    mail = db.Column(db.String(50), nullable=True)

    checkbox_super = db.Column(db.Boolean, nullable=False)

    year_born = db.Column(db.Date, nullable=False)
    date_register = db.Column(db.DateTime, default=datetime.now)

    def __init__(self, for_name, last_name, nick, social_channel, living_place, about, art_kind_desription, notes, phone_number, link, mail, checkbox_super, year_born):
        self.for_name = for_name
        self.last_name = last_name
        self.nick = nick
        self.social_channel = social_channel
        self.living_place = living_place
        self.about = about
        self.art_kind_desription = art_kind_desription
        self.notes = notes
        self.phone_number = phone_number
        self.link = link
        self.mail = mail
        self.checkbox_super = checkbox_super
        self.year_born = year_born

class Team (db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    for_name_team_register = db.Column(db.String(50), nullable=False)
    last_name_team_register = db.Column(db.String(50), nullable=False)
    team_name = db.Column(db.String(50), nullable=False)
    social_channel = db.Column(db.String(50), nullable=True)
    team_size = db.Column(db.Integer, nullable=False)
    
    about = db.Column(db.String(200), nullable=False)
    notes = db.Column(db.String(200), nullable=False)

    phone_number = db.Column(db.Integer, nullable=True)
    link = db.Column(db.String(100), nullable=True)

    art_kind_desription = db.Column(db.String(200), nullable=False)

    checkbox_super = db.Column(db.Boolean)
    mail = db.Column(db.String(50), nullable=True)

    date_register = db.Column(db.DateTime, default=datetime.now)
    
    def __init__(self, for_name_team_register, last_name_team_register, team_name, social_channel, team_size, about, notes, phone_number, link, art_kind_desription, checkbox_super, mail):
        self.for_name_team_register = for_name_team_register
        self.last_name_team_register = last_name_team_register
        self.team_name = team_name
        self.social_channel = social_channel
        self.team_name = team_name
        self.team_size = team_size
        self.about = about
        self.notes = notes
        self.phone_number = phone_number
        self.link = link
        self.art_kind_desription = art_kind_desription
        self.checkbox_super = checkbox_super
        self.mail = mail

class ArtKinds (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__(self, type, for_who, for_who_type):
        self.type = type
        self.for_who = for_who
        self.for_who_type = for_who_type

class Instytution (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__(self, name, for_who, for_who_type):
        self.name = name
        self.for_who = for_who
        self.for_who_type = for_who_type

class PromotionTypes (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__(self, name, for_who, for_who_type):
        self.name = name
        self.for_who = for_who
        self.for_who_type = for_who_type

class KnowFromTypes (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__(self, name, for_who, for_who_type):
        self.name = name
        self.for_who = for_who
        self.for_who_type = for_who_type

class LivingPlaces (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__(self, name, for_who, for_who_type):
        self.name = name
        self.for_who = for_who    
        self.for_who_type = for_who_type

class BornDates (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    date_value = db.Column(db.Date, nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)

    def __init__ (self, date_value, for_who, for_who_type):
        self.date_value = date_value
        self.for_who = for_who
        self.for_who_type = for_who_type

class ValidationTokenRecord (db.Model):

    id = db.Column(db.Integer, primary_key=True)
    value = db.Column(db.String(10), nullable=True)
    expiration_date = db.Column(db.Date, nullable=False)
    for_who = db.Column(db.Integer, nullable=False)
    for_who_type = db.Column(db.String(6), nullable=False)
    size = db.Column (db.Integer)
    valid = db.Column(db.Boolean, nullable=False)

    def __init__ (self, value, expiration_date, for_who, for_who_type, size):
        self.size = size
        self.value = value
        self.expiration_date = expiration_date
        self.for_who = for_who
        self.for_who_type = for_who_type
        self.size = size
        self.valid = True


class ValidationToken:

    def __init__ (self, expiration_date, for_who, for_who_type, size):
        self.size = size
        self.value = self.genToken()
        self.expiration_date = expiration_date
        self.for_who = for_who
        self.for_who_type = for_who_type
        self.active = True

    def genToken (self):
        generate_pass = ''.join([random.choice( string.ascii_uppercase + string.ascii_lowercase + string.digits) for n in range(self.size)])  
        return generate_pass

    def veryficate (self, input):
        if input == self.value:
            if datetime.now() > self.expiration_date:
                self.active = False
            else:
                self.active = True
    
    def getState (self):
        return self.active