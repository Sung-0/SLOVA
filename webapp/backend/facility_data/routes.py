from flask import Blueprint, jsonify, request
from .load_csv import load_hospitals, load_police_fire

bp = Blueprint('facilityapi', __name__, url_prefix='/facility')

@bp.route('/data', methods=['GET'])
def get_facility_data():
    type_filter = request.args.get('type', 'all')
    sd_cd_filter = request.args.get('sd_cd')

    result = {}

    if type_filter in ['fire', 'police', 'all']:
        fire_police_data = load_police_fire()
        if sd_cd_filter:
            fire_police_data = [
                d for d in fire_police_data if str(d['sd_cd']) == sd_cd_filter
            ]
        result['fire_police'] = fire_police_data

    if type_filter in ['hospital', 'all']:
        hospital_data = load_hospitals()
        if sd_cd_filter:
            hospital_data = [
                d for d in hospital_data if str(d['sd_cd']) == sd_cd_filter
            ]
        result['hospitals'] = hospital_data

    return jsonify(result)
