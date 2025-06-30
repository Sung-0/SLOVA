from flask import Blueprint, jsonify
import csv
import os

LOG_CSV = os.path.join(os.path.dirname(__file__), '..', 'data', 'login_log.csv')

log_bp = Blueprint('log', __name__, url_prefix="/log")

@log_bp.route('/login', methods=['GET'])
def get_login_log():
    logs = []
    try:
        with open(LOG_CSV, newline='', encoding='utf-8') as f:
            reader = csv.DictReader(f)
            logs = list(reader)
    except FileNotFoundError:
        # 파일 없으면 빈 리스트 반환 - 문제 없음
        return jsonify(logs=[]), 200
    except Exception as e:
        # 기타 예외는 서버 로그에 출력 후 에러 응답
        print("로그 파일 읽기 중 에러:", e)
        return jsonify(error=str(e)), 500

    return jsonify(logs=logs)