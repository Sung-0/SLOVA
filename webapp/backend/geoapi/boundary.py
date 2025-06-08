from flask import Blueprint, jsonify
import json
import os

bp = Blueprint('boundary', __name__)

# GeoJSON 파일들이 위치한 폴더 경로 (예: geoapi/data/)
geojson_base_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'data'))


def load_geojson(filename):
    """GeoJSON 파일을 로드하여 Python 객체로 반환"""
    filepath = os.path.join(geojson_base_path, filename)
    with open(filepath, encoding='utf-8') as f:
        return json.load(f)
    
@bp.route('/api/boundary/<code>')
def get_boundary(code):
    code = str(code)
    length = len(code)

    # 코드길이에 따라 파일과 속성명을 선택
    if length == 2:
        data = load_geojson('sido.geojson')
        key = 'CTPRVN_CD'
    elif length == 5:
        data = load_geojson('sig.geojson')
        key = 'SIG_CD'
    elif length == 8:
        data = load_geojson('emd.geojson')
        key = 'EMD_CD'
    elif length == 10:
        data = load_geojson('ri.geojson')
        key = 'LI_CD'
    else:
        return jsonify({'error': '올바르지 않은 코드 길이입니다.'}), 400
    
    # 해당 코드에 일치하는 feature만 필더링
    matched = [
        feature for feature in data['features']
        if str(feature['properties'].get(key)) == code
    ]

    if not matched:
        return jsonify({'error': '해당 코드를 찾을 수 없습니다.'}), 404
    
    return jsonify({
        "type": "FeatureCollection",
        "features": matched
    })

