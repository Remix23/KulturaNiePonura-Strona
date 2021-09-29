from flask import Blueprint, render_template, jsonify
from flask_login import login_required
from .main import get_persons_and_teams, get_specyfic_person, get_specyfic_team
from .python.writing_to_files import calculate_stats

stats = Blueprint("stats", __name__)

@stats.route('/statistics/')
@login_required
def get_all_data():

    persons_data, teams_data = get_persons_and_teams()

    instytutions, art_kinds, promotion_types, know_from_types, born_dates, living_places = calculate_stats(persons_data, teams_data)

    return render_template('statystyki.html', data={'persons' : persons_data, 'teams' : teams_data, 'instytutions' : instytutions, 'art_kinds' : art_kinds, 'promotion_types' : promotion_types, 'know_from_types' : know_from_types, 'living_places' : living_places, 'born_dates' : born_dates})

@stats.route('/statistics/<table>/<int:id>')
@login_required
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
