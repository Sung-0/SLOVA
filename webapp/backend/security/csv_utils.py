import csv
from datetime import datetime
import os

# CSV 파일 경로 설정
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
USERS_CSV = os.path.join(DATA_DIR, 'user.csv')
LOG_CSV = os.path.join(DATA_DIR, 'login_log.csv')

# 사용자 정보 로딩
def load_users():
    with open(USERS_CSV, newline='', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        return list(reader)
    
# 공통 로그 기록 함수 (성공, 실패, 로그아웃 등)
def log_action(user, status):
    file_exists = os.path.exists(LOG_CSV)
    with open(LOG_CSV, 'a', newline='', encoding='utf-8') as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(['timestamp', 'name', 'rank', 'id_number', 'status'])
        writer.writerow([
            datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            user.get('name', '-'),
            user.get('rank', '-'),
            user.get('id_number', '-'),
            status
        ])