from .routes import bp as mark_bp
from .process_markers import prepare_marker_json

def register_mark_blueprints(app):
    app.register_blueprint(mark_bp)

def init_mark_module():
    #앱 시작 시 JSON 파일 한번만 실행
    prepare_marker_json()