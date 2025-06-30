import csv
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.abspath(os.path.join(BASE_DIR, '..', 'data'))

#video 파일경로 (static/videos/)
VIDEO_STREAM_PREFIX = "/video/stream/"

def read_csv_by_id(filename, target_id):
    results = []
    filepath = os.path.join(CSV_PATH, filename)

    try:
        with open(filepath, newline='', encoding='utf-8') as csvfile:
            reader = csv.DictReader(csvfile)
            for row in reader:
                if row['id'] == target_id:
                    results.append(row)
    except FileNotFoundError:
        print(f"[ERROR] 파일을 찾을 수 없습니다: {filename}")
    except Exception as e:
        print(f"[ERROR] 파일 읽기 오류 ({filename}): {e}")

    return results

# csv 파일 경로
# 1. risk_point
def get_risk(id):
    return read_csv_by_id('risk_point.csv', id)

# 2. estimated_damage
def get_estimated(id):
    return read_csv_by_id('estimated_damage.csv', id)

# 3. prevention_facilities
def get_prevention(id):
    return read_csv_by_id('prevention_facilities.csv', id)

# 4. landslide_history
def get_landslide(id):
    return read_csv_by_id('landslide_history.csv', id)

# 5. task_assignment
def get_task(id):
    return read_csv_by_id('task_assignment.csv', id)

# 6. assembly_point
def get_assembly(id):
    return read_csv_by_id('assembly_point.csv', id)

# 7. contacts
def get_contacts(id):
    return read_csv_by_id('contacts.csv', id)

# 8. collaboration
def get_collaboration(id):
    return read_csv_by_id('collaboration.csv',id)

# 9. authority
def get_authority(id):
    return read_csv_by_id('authority.csv',id)

# 10. 24hr_contacts
def get_24hr(id):
    return read_csv_by_id('24hr_contacts.csv', id)

# video_url 필드를 추가하는 landslide용 특수 함수
def get_landslide(id):
    results = read_csv_by_id('landslide_history.csv', id)
    for row in results:
        if row.get('video'):
            row['video_url'] = f"/static/videos/{row['video']}.mp4"
        else:
            row['video_url'] = None
    return results