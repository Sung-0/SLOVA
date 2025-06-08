from .landslideHistory import bp as landslide_bp

def register_sidebar_blueprints(app):
    app.register_blueprint(landslide_bp)