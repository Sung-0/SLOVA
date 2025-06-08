from flask import Blueprint, jsonify
import os
from .csv_utils import summarize_landslide_by_sido

bp = Blueprint('landslide_history', __name__, url_prefix='/sidebar')

@bp.route('/landslide-summary', methods=['GET'])
def get_landslide_summary():
    csv_path = os.path.join('data', 'landslide_history.csv')
    summary = summarize_landslide_by_sido(csv_path)
    return jsonify({'data': summary})