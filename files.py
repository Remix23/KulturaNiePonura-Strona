from flask import Blueprint, send_from_directory, request, jsonify, current_app
import os
from .python.writing_to_files import calculate_stats, log_all_to_excel, log_single_to_excel, log_selected_to_excel
from .main import get_persons_and_teams, get_specyfic_person, get_specyfic_team

files = Blueprint("files", __name__)

files_path = current_app.config["EXCEL_FILES"]

@files.route('/download/all/<filetype>')
def get_file_all (filetype : str):

    persons, teams = get_persons_and_teams()

    if filetype.lower() == 'excel':
        filename = 'dane.xlsx'

        path_file = files_path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)
        
        log_all_to_excel(persons, teams, path_file)

        return send_from_directory(files_path, path = filename, as_attachment = True)  

    elif filetype == 'html':
        return filetype
    elif filetype == 'json':
        return jsonify({'persons' : persons, 'teams' : teams})

@files.route('/download/selected/<filetype>', methods=['POST'])
def get_selected_file (filetype):

    persons, teams = get_persons_and_teams()

    selected = request.get_json()

    if filetype.lower() == 'excel':
        filename = 'dane_wybrane.xlsx'

        path_file = files_path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)
        
        log_selected_to_excel(persons, teams, path_file, selector = selected)

        return send_from_directory(files_path, path = filename, as_attachment = True)  

@files.route('/download/<table>/<int:id>/<filetype>')
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

        path_file = files_path + '/' + filename

        if os.path.exists(path_file):
            os.remove(path_file)

        log_single_to_excel(data, path_file)

        return send_from_directory(files_path, path = filename, as_attachment = True)  
