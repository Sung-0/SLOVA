import csv
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_csv(filename):
    path = os.path.join(DATA_DIR, filename)
    with open(path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        return list(reader)
    
# 시도코드와 파일명을 매핑
SIDO_FILE_MAP = {
    '11': 'seoul.csv', '26': 'busan.csv',
    '27': 'daegu.csv', '28': 'incheon.csv',
    '29': 'gwangju.csv', '30': 'daejeon.csv',
    '31': 'ulsan.csv', '36': 'sejong.csv',
    '41': 'gyeonggi.csv', '51': 'gangwon.csv',
    '43': 'chungbuk.csv', '44': 'chungnam.csv',
    '45': 'jeonbuk.csv', '46': 'jeonnam.csv',
    '47': 'gyeongbuk.csv', '48': 'gyeongnam.csv',
    '50': 'jeju.csv',
}


# 특정 bjd_code의 중심 좌표를 반환하는 함수 추가
def load_location_center(bjd_code):
    sido_code = bjd_code[:2]
    filename = SIDO_FILE_MAP.get(sido_code)

    if not filename:
        return None # 파일명을 못 찾은 경우
    
    path = os.path.join(DATA_DIR, filename)

    try:
        with open(path, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['bjd_cd'] == bjd_code:
                    return {
                        'lat': float(row['center_lati']),
                        'lon': float(row['center_long'])
                    }
    except Exception as e:
        print(f"[ERROR] Failed to read {filename}: {e}")

    return None