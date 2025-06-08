from .rank_api import bp as rank_bp

def register_rank_blueprints(app):
    app.register_blueprint(rank_bp)