from flask import Flask
from flask_cors import CORS
from geoapi import register_geo_blueprints
from sidebarapi import register_sidebar_blueprints
from landslide import register_rank_blueprints
from mark import register_mark_blueprints#, init_mark_module
from security import register_security_blueprints, register_security_log_blueprints
from facility_data import reguster_facility_blueprints

app = Flask(__name__)
CORS(app)  # CORS 허용: React에서 API 요청 가능

#init_mark_module()

# Blueprint 등록
register_geo_blueprints(app) # geo 관련 코드
register_sidebar_blueprints(app) # sidebar 관련 코드
register_rank_blueprints(app)
register_mark_blueprints(app)
register_security_blueprints(app)
reguster_facility_blueprints(app)
register_security_log_blueprints(app)


@app.route('/')
def home():
   return 'This is Home!'

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)