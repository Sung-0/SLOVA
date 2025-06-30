from .routes import bp

def reguster_facility_blueprints(app):
    app.register_blueprint(bp)