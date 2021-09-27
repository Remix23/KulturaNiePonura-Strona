#! /bin/python3.8
# -*- coding: utf-8 -*-

import re
import os

from flask import json, redirect, request, render_template, url_for, jsonify, send_from_directory, abort, Blueprint
from sqlalchemy import and_
from .python.date_functions import convert_to_date, convert_to_str 
from .python.writing_to_files import calculate_stats, log_all_to_excel, log_single_to_excel, log_selected_to_excel
from .Settings import Settings


settings = Settings()
main = Blueprint("main", __name__)

from . import db
from . import app
from .models import *

def get_persons_and_teams ():

    all_registered_persons = Person.query.order_by(Person.date_register).all()
    all_registered_teams = Team.query.order_by(Team.date_register).all()
    persons_data = []
    teams_data = []

    # persons data 
    for person in all_registered_persons[::-1]:
        looking_for_id = person.id - 1
        temp = {
            
            'id': person.id,
            'for_name': person.for_name,
            'last_name': person.last_name,
            'nick': person.nick,
            'mail': person.mail,
            'living_place': person.living_place,
            'social_channel': person.social_channel,
            'about': person.about,
            'art_kind_description': person.art_kind_desription,
            'notes': person.notes,
            'link': person.link,
            'phone_number': person.phone_number,
            'about': person.about,
            'year_born': person.year_born,
            'date_register': convert_to_str(person.date_register),
            'instytutions' : [x.name for x in Instytution.query.filter(and_(Instytution.for_who == looking_for_id, Instytution.for_who_type == 'person')).all()],
            'art_kinds' : [x.type for x in ArtKinds.query.filter(and_(ArtKinds.for_who == looking_for_id, ArtKinds.for_who_type == 'person')).all()],
            'promotion_types' : [x.name for x in PromotionTypes.query.filter(and_(PromotionTypes.for_who == looking_for_id, PromotionTypes.for_who_type == 'person')).all()],
            'know_from_types' : [x.name for x in KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == looking_for_id, KnowFromTypes.for_who_type == 'person')).all()]
        }

        persons_data.append(temp)

    
    for team in all_registered_teams[::-1]:
        temp = {
            'id': team.id,
            'for_name_team_register': team.for_name_team_register,
            'last_name_team_register': team.last_name_team_register,
            'team_name': team.team_name,
            'team_size': team.team_size,
            'mail': team.mail,
            'social_channel': team.social_channel,
            'about': team.about,
            'art_kind_description': team.art_kind_desription,
            'notes': team.notes,
            'link': team.link,
            'phone_number': person.phone_number,
            'about': team.about,
            'date_register': convert_to_str(team.date_register),
            'instytutions' : [x.name for x in Instytution.query.filter(and_(Instytution.for_who == team.id, Instytution.for_who_type == 'team')).all()],
            'art_kinds' : [x.type for x in ArtKinds.query.filter(and_(ArtKinds.for_who == team.id, ArtKinds.for_who_type == 'team')).all()],
            'promotion_types' : [x.name for x in PromotionTypes.query.filter(and_(PromotionTypes.for_who == team.id, PromotionTypes.for_who_type == 'team')).all()],
            'know_from_types' : [x.name for x in KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == team.id, KnowFromTypes.for_who_type == 'team')).all()],
            'living_places' : [x.name for x in LivingPlaces.query.filter(and_(LivingPlaces.for_who == team.id, LivingPlaces.for_who_type == 'team')).all()],
            'born_dates' : [convert_to_str(x.date_value) for x in BornDates.query.filter(and_(BornDates.for_who == team.id, BornDates.for_who_type == 'team')).all()]
        }

        teams_data.append(temp)

    return persons_data, teams_data

def get_specyfic_person(id):
    looking_for_id  = id - 1
    person_obj = Person.query.get_or_404(id)
    person_data = {
        'id': person_obj.id,
        'for_name': person_obj.for_name,
        'last_name': person_obj.last_name,
        'nick': person_obj.nick,
        'mail': person_obj.mail,
        'living_place': person_obj.living_place,
        'social_channel': person_obj.social_channel,
        'about': person_obj.about,
        'art_kind_description': person_obj.art_kind_desription,
        'notes': person_obj.notes,
        'link': person_obj.link,
        'phone_number': person_obj.phone_number,
        'about': person_obj.about,
        'year_born': person_obj.year_born,
        'date_register': convert_to_str(person_obj.date_register),
        'instytutions' : [x.name for x in Instytution.query.filter(and_(Instytution.for_who == looking_for_id, Instytution.for_who_type == 'person')).all()],
        'art_kinds' : [x.type for x in ArtKinds.query.filter(and_(ArtKinds.for_who == looking_for_id, ArtKinds.for_who_type == 'person')).all()],
        'promotion_types' : [x.name for x in PromotionTypes.query.filter(and_(PromotionTypes.for_who == looking_for_id, PromotionTypes.for_who_type == 'person')).all()],
        'know_from_types' : [x.name for x in KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == looking_for_id, KnowFromTypes.for_who_type == 'person')).all()]
    }

    return person_data

def get_specyfic_team(id):
    team_obj = Team.query.get_or_404(id)
    team_data = {
        'id': team_obj.id,
        'for_name_team_register': team_obj.for_name_team_register,
        'last_name_team_register': team_obj.last_name_team_register,
        'team_name': team_obj.team_name,
        'team_size': team_obj.team_size,
        'mail': team_obj.mail,
        'social_channel': team_obj.social_channel,
        'about': team_obj.about,
        'art_kind_description': team_obj.art_kind_desription,
        'notes': team_obj.notes,
        'link': team_obj.link,
        'phone_number': team_obj.phone_number,
        'about': team_obj.about,
        'date_register': convert_to_str(team_obj.date_register),
        'instytutions' : [x.name for x in Instytution.query.filter(and_(Instytution.for_who == team_obj.id, Instytution.for_who_type == 'team')).all()],
        'art_kinds' : [x.type for x in ArtKinds.query.filter(and_(ArtKinds.for_who == team_obj.id, ArtKinds.for_who_type == 'team')).all()],
        'promotion_types' : [x.name for x in PromotionTypes.query.filter(and_(PromotionTypes.for_who == team_obj.id, PromotionTypes.for_who_type == 'team')).all()],
        'know_from_types' : [x.name for x in KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == team_obj.id, KnowFromTypes.for_who_type == 'team')).all()],
        'living_places' : [x.name for x in LivingPlaces.query.filter(and_(LivingPlaces.for_who == team_obj.id, LivingPlaces.for_who_type == 'team')).all()],
        'born_dates' : [convert_to_str(x.date_value) for x in BornDates.query.filter(and_(BornDates.for_who == team_obj.id, BornDates.for_who_type == 'team')).all()]
    }

    return team_data

@main.route('/')
def home_page ():
    path = os.path.join(os.getcwd(), "projekt", "static", "cafes_events.json")
    with open(path) as f:
        data = json.load(f) # events and cafes 

    return render_template('index.html', data = data)

@main.route('/', methods=['POST'])
def accept_form_post ():

    TEAM_COUNTER = Team.query.order_by(Team.id.desc()).first().id
    PERSON_COUNTER = Person.query.order_by(Person.id.desc()).first().id

    messages = []

    incoming_json = request.get_json()
    name = incoming_json['name'].rstrip()
    name = name.rstrip().split(' ')
    if len(name) > 1:
        for_name, last_name = name
    else :
        for_name = name[0]
        last_name = "-"
    if not re.search('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]', for_name):
        messages.append('Nie poprawne imię!')
    if not re.search('[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]', last_name):
        messages.append('Nie poprawne nazwisko!')
    with_who = incoming_json['withWho']
    artkinds = incoming_json['artkinds']
    promotiontypes = incoming_json['promotiontypes']
    knowfrom = incoming_json['knowform']
    temp_link = incoming_json['komunikacja'].rstrip().replace(" ", "")
    try:
        number = int(temp_link)
        link = '-'
    except ValueError:
        link = incoming_json['komunikacja'].rstrip()
        number = -1
    checkbox_checked = incoming_json['writeCheckBox']
    notes = incoming_json['notes'].rstrip()
    mail = incoming_json['mail'].rstrip()
    if not re.search('[^@]+@[^@]+\.[^@]+', mail) and not (incoming_json['mailRepeat'] == mail):
        messages.append('Niepoprawny adres e-mail!')   
    social_channel = incoming_json['socialChannel']

    if incoming_json['mode'] == 'osoba':
        nick = incoming_json['nick'].rstrip()
        date_born = incoming_json['dateBorn']
        living_place = incoming_json['livingPlace'].rstrip()

        about = incoming_json['about'].rstrip()
        art_kind_more = incoming_json['artKindMore'].rstrip()

        temp = Person(for_name=for_name, last_name=last_name, nick=nick, social_channel=social_channel, living_place=living_place, about=about, notes=notes, phone_number=number, link=link, checkbox_super=checkbox_checked, year_born=convert_to_date(date_born), art_kind_desription=art_kind_more, mail=mail)
        db.session.add(temp)
        for i in with_who:
            if with_who == "artystka / artysta niezrzeszona / niezrzeszony":
                temp = Instytution(name="artystka / artysta niezrzeszona / niezrzeszony", for_who=PERSON_COUNTER, for_who_type='person')
                db.session.add(temp)
                break
            
            temp = Instytution(name=i, for_who=PERSON_COUNTER, for_who_type='person')
            db.session.add(temp)
        for i in promotiontypes:
            temp = PromotionTypes(name=i, for_who=PERSON_COUNTER, for_who_type='person')
            db.session.add(temp)
        for i in knowfrom:
            temp = KnowFromTypes(name=i, for_who=PERSON_COUNTER, for_who_type='person')
            db.session.add(temp)
        for i in artkinds:
            temp = ArtKinds(type=i, for_who=PERSON_COUNTER, for_who_type='person')
            db.session.add(temp)

    else:
        team_name = incoming_json['teamName'].rstrip()
        dates_born = incoming_json['dateBorn']
        living_places = incoming_json['livingPlace']
        team_size = incoming_json['teamSize']
        if not re.search('[0-9]', team_name):
            messages.append('Niepoprawna ilość osób w zespole!')
        
        about = incoming_json['teamAbout'].rstrip()
        art_kind_more = incoming_json['artKindMore'].rstrip()

        temp = Team(for_name_team_register=for_name, last_name_team_register=last_name, team_size=team_size, team_name=team_name, social_channel=social_channel, about=about, notes=notes, phone_number=number, link=link, checkbox_super=checkbox_checked, art_kind_desription=art_kind_more, mail=mail)
        db.session.add(temp)
        TEAM_COUNTER += 1
        for i in living_places:
            temp = LivingPlaces(name=i, for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
        for i in dates_born:
            temp = BornDates(date_value=convert_to_date(i), for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
        for i in with_who:
            if with_who == "artystka / artysta niezrzeszona / niezrzeszony":
                temp = Instytution(name="artystka / artysta niezrzeszona / niezrzeszony", for_who=TEAM_COUNTER, for_who_type='team')
                db.session.add(temp)
                break

            temp = Instytution(name=i, for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
        for i in promotiontypes:
            temp = PromotionTypes(name=i, for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
        for i in knowfrom:
            temp = KnowFromTypes(name=i, for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
        for i in artkinds:
            temp = ArtKinds(type=i, for_who=TEAM_COUNTER, for_who_type='team')
            db.session.add(temp)
    try:
        db.session.commit()
    except Exception as e:
        messages.append(type(e))
    
    if len(messages) > 0:
        return jsonify({'succes' : False, 'messages' : messages, 'status code': 400})

    return jsonify({'succes' : True, 'messages' : messages, 'status code': 200})

@main.route('/delete/<table>/<int:id>')
def remove_records (table, id):

    try:
        if table == 'person':
            looking_for_id  = id - 1
            person = Person.query.get_or_404(id)
            art_kinds = ArtKinds.query.filter(and_(ArtKinds.for_who == looking_for_id, ArtKinds.for_who_type == 'person')).all()
            instytutions = Instytution.query.filter(and_(Instytution.for_who == looking_for_id, Instytution.for_who_type == 'person')).all()
            promotion_types = PromotionTypes.query.filter(and_(PromotionTypes.for_who == looking_for_id, PromotionTypes.for_who_type == 'person')).all()
            know_from_types = KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == looking_for_id, KnowFromTypes.for_who_type)).all()
            db.session.delete(person)
        else:
            team = Team.query.get_or_404(id)
            db.session.delete(team)
            art_kinds = ArtKinds.query.filter(and_(ArtKinds.for_who == id, ArtKinds.for_who_type == 'team')).all()
            instytutions = Instytution.query.filter(and_(Instytution.for_who == id, Instytution.for_who_type == 'team')).all()
            promotion_types = PromotionTypes.query.filter(and_(PromotionTypes.for_who == id, PromotionTypes.for_who_type == 'team')).all()
            know_from_types = KnowFromTypes.query.filter(and_(KnowFromTypes.for_who == id, KnowFromTypes.for_who_type)).all()
            living_places = LivingPlaces.query.filter(LivingPlaces.for_who == id).all()
            born_dates = BornDates.query.filter(BornDates.for_who == id).all()
            for i in living_places:
                db.session.delete (i)
            for i in born_dates:
                db.session.delete(i)

        for i in art_kinds:
            db.session.delete (i)
        for i in instytutions:
            db.session.delete(i)
        for i in promotion_types:
            db.session.delete (i)
        for i in know_from_types:
            db.session.delete(i)
        
        db.session.commit()
        return jsonify({'succes' : True, 'message' : '', 'status_ code' : 0 })
    
    except Exception as e:
        print(e)
        return jsonify({'succes' : False, 'message' : 'There was an issue while removing record form the database', 'error' : e, 'status code' : 1 }) 

@main.route('/registration')
def sign_up ():
    return abort(404)
    return ('formularz2.html')

@main.route('/statistics/')
def get_all_data():

    persons_data, teams_data = get_persons_and_teams()

    instytutions, art_kinds, promotion_types, know_from_types, born_dates, living_places = calculate_stats(persons_data, teams_data)

    return render_template('statystyki.html', data={'persons' : persons_data, 'teams' : teams_data, 'instytutions' : instytutions, 'art_kinds' : art_kinds, 'promotion_types' : promotion_types, 'know_from_types' : know_from_types, 'living_places' : living_places, 'born_dates' : born_dates})

@main.route('/statistics/<table>/<int:id>')
def get_detail_info(table, id):

    try:
        if table == 'persons':
            person = get_specyfic_person(id)
            return render_template("show_person.html", data=person)
        else:
            team = get_specyfic_team(id)
            return render_template("show_team.html", data=team)
    
    except Exception as e:
        print(e)
        return jsonify({'succes' : False, 'message' : 'There was an issue while selecting record fromm the database', 'error' : e, 'status code' : 1 }) 

# pliki 
@main.route('/download/all/<filetype>')
def get_file_all (filetype : str):

    persons, teams = get_persons_and_teams()

    if filetype.lower() == 'excel':
        path = app.config['EXCEL_FILES'] 
        filename = 'dane.xlsx'

        path_file = path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)
        
        log_all_to_excel(persons, teams, path_file)

        return send_from_directory(path, filename = filename, as_attachment = True)  

    elif filetype == 'html':
        return filetype
    elif filetype == 'json':
        return jsonify({'persons' : persons, 'teams' : teams})

@main.route('/download/selected/<filetype>', methods=['POST'])
def get_selected_file (filetype):

    persons, teams = get_persons_and_teams()

    selected = request.get_json()

    if filetype.lower() == 'excel':
        path = app.config['EXCEL_FILES'] 
        filename = 'dane_selected.xlsx'

        path_file = path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)
        
        log_selected_to_excel(persons, teams, path_file, selector = selected)

        return send_from_directory(path, filename = filename, as_attachment = True)  

@main.route('/download/<table>/<int:id>/<filetype>')
def get_file_single (table, id, filetype):

    if table == 'person':
        data = get_specyfic_person(id)
        filename = f"person_id_{data['id']}.xlsx"
    else:
        data = get_specyfic_team(id)
        filename = f"team_id_{data['id']}.xlsx"

    if filetype == 'html':
        return filetype
    elif filetype == 'json':
        return jsonify(data)
    elif filetype == 'excel':
        path = app.config['EXCEL_FILES'] 

        path_file = path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)

        log_single_to_excel(data, path_file)

        return send_from_directory(path, filename = filename, as_attachment = True)  

# kasowanie bugów 

@app.teardown_appcontext
def shutdown_session(exception=None):
    db.session.remove()