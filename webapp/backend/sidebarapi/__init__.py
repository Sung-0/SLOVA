from .routes import bp as side_bp

def register_sidebar_blueprints(app):
    app.register_blueprint(side_bp)
