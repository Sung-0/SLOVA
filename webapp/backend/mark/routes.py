# from flask import Blueprint, send_file
# import os

# bp = Blueprint('army_mark', __name__, url_prefix='/army')

# DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
# MARKERS_JSON = os.path.join(DATA_DIR, 'markers.json')

# @bp.route('/mark', methods=['GET'])
# def get_marker_json():
#     return send_file(MARKERS_JSON, mimetype='application/json')

import os
from flask import Blueprint, send_file

bp = Blueprint('army_mark', __name__, url_prefix='/army')

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
MARKERS_JSON = os.path.abspath(os.path.join(DATA_DIR, 'markers.json'))

@bp.route('/mark', methods=['GET'])
def get_marker_json():
    print(f"markers.json path: {MARKERS_JSON}")  # 경로 확인용 출력
    return send_file(MARKERS_JSON, mimetype='application/json')
