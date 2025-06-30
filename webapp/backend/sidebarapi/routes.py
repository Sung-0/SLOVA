from flask import Blueprint, request, jsonify
from .csv_utils import (
    get_risk,
    get_estimated,
    get_prevention,
    get_landslide,
    get_task,
    get_assembly,
    get_contacts,
    get_collaboration,
    get_authority,
    get_24hr,
)

bp = Blueprint('sidebarapi', __name__, url_prefix='/sidebar')

@bp.route('/data', methods=['GET'])
def sidebar_data():
    mark_id = request.args.get('id')
    print(f"[백엔드] 요청받은 id: {mark_id}")

    if not mark_id:
        return jsonify({'error': 'No ID provided'}), 400

    data = {
        "risk": get_risk(mark_id),
        "estimated": get_estimated(mark_id),
        "prevention": get_prevention(mark_id),
        "landslide": get_landslide(mark_id),
        "task": get_task(mark_id),
        "assembly": get_assembly(mark_id), 
        'contacts': get_contacts(mark_id),
        'collaboration':get_collaboration(mark_id),
        'authority': get_authority(mark_id),
        'emergencyContacts': get_24hr(mark_id),
    }

    return jsonify(data)
