from flask import Blueprint, Response
from .grid_processor import export_geojson

bp = Blueprint("landslide_rank", __name__, url_prefix="/landslide-rank")

@bp.route("/geojson", methods=["GET"])
def get_ranked_landslide_geojson():
    geojson_str = export_geojson()
    return Response(geojson_str, mimetype="application/json")