from flask import Blueprint, request, jsonify
from .csv_utils import load_users, log_action

security_bp = Blueprint('security', __name__, url_prefix='/security')

# 로그인 처리
@security_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    code = data.get('code')

    if not code:
        return jsonify(success=False, error="No code provided"), 400

    users = load_users()
    user = next((u for u in users if u['code'] == code), None)

    if user:
        log_action(user, 'login-success')  # 성공 시 기록
        return jsonify(success=True, user={
            'name': user['name'],
            'rank': user['rank'],
            'id_number': user['id_number'],
            'rank_icon': user['img'],
            'authority': user.get('authority', '0')
        })
    else:
        # 실패도 로그 기록 (빈 유저로 기록)
        fake_user = {'name': '-', 'rank': '-', 'id_number': '-'}
        log_action(fake_user, 'login-fail')
        return jsonify(success=False, error="Invalid code"), 401

# 로그아웃 처리
@security_bp.route('/logout', methods=['POST'])
def logout():
    data = request.get_json()
    user = data.get('user')

    if user:
        log_action(user, 'logout')  # 로그아웃 시 기록
        return jsonify(success=True)
    return jsonify(success=False, error="No user info"), 400