from .location import bp as location_bp
from .boundary import bp as boundary_bp

def register_geo_blueprints(app):
    app.register_blueprint(location_bp)
    app.register_blueprint(boundary_bp)