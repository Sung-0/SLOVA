from .routes import security_bp
from .log_routes import log_bp

def register_security_blueprints(app):
    app.register_blueprint(security_bp)

# 로그 관련
def register_security_log_blueprints(app):
    app.register_blueprint(log_bp)