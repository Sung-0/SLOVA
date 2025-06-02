from flask import Blueprint, jsonify
from .csv_utils import load_csv, load_location_center

bp = Blueprint('location', __name__)

#시도 코드 -> 영어 파일명 매핑
sido_map = {
    '11': 'seoul', '26': 'busan', '27': 'daegu', '28': 'incheon',
    '29': 'gwangju', '30': 'daejeon', '31': 'ulsan', '36': 'sejong',
    '41': 'gyeonggi', '51': 'gangwon', '43': 'chungbuk', '44': 'chungnam',
    '45': 'jeonbuk', '46': 'jeonnam', '47': 'gyeongbuk', '48': 'gyeongnam', '50': 'jeju'
}

# 행정구역 중심 좌표 반환 API
@bp.route('/api/location-center/<bjd_code>')
def location_center(bjd_code):
    data = load_location_center(bjd_code)
    if data:
        return jsonify(data)
    return jsonify({'error': 'Not found'}), 404


@bp.route('/api/sigungu/<sido_code>')
def get_sigungu(sido_code):
    sido_eng = sido_map.get(sido_code)
    if not sido_eng:
        return jsonify({'error': 'Invalid sido code'}), 400
    
    rows = load_csv(f'{sido_eng}.csv')
    sigungu_set = set()
    result = []

    for row in rows:
        if row['level'] == '1' and row['sd_cd'] == sido_code:
            sgg_cd = row['sgg_cd']
            sgg_nm = row['sgg_nm']
            if sgg_cd not in sigungu_set:
                sigungu_set.add(sgg_cd)
                result.append({'code': sgg_cd, 'name': sgg_nm})

    return jsonify(result)

@bp.route('/api/emd/<sgg_code>')
def get_emd(sgg_code):
    sido_code = sgg_code[:2]
    sido_eng = sido_map.get(sido_code)
    if not sido_eng:
        return jsonify({'error': 'Invalid code'}), 400

    rows = load_csv(f'{sido_eng}.csv')
    emd_set = set()
    result = []

    for row in rows:
        if row['level'] == '2' and row['sgg_cd'] == sgg_code:
            emd_cd = row['emd_cd']
            emd_nm = row['emd_nm']
            if emd_cd and emd_cd not in emd_set:
                emd_set.add(emd_cd)
                result.append({'code': emd_cd, 'name': emd_nm})

    return jsonify(result)

@bp.route('/api/ri/<emd_code>')
def get_ri(emd_code):
    sido_code = emd_code[:2]
    sido_eng = sido_map.get(sido_code)
    if not sido_eng:
        return jsonify({'error': 'Invalid code'}), 400

    rows = load_csv(f'{sido_eng}.csv')
    result = []

    for row in rows:
        if row['level'] == '3' and row['emd_cd'] == emd_code:
            li_nm = row['li_nm']
            bjd_cd = row['bjd_cd']
            lat = row['center_lati']
            lon = row['center_long']
            result.append({
                'code': bjd_cd,
                'name': li_nm,
                'lat': lat,
                'lon': lon
            })

    return jsonify(result)