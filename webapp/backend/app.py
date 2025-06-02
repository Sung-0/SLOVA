<<<<<<< HEAD
#앱 실행 진입점
=======
>>>>>>> sung
from flask import Flask
from flask_cors import CORS


app = Flask(__name__)
CORS(app)  # CORS 허용: React에서 API 요청 가능

# Blueprint 등록
from geoapi.location import bp as location_bp
app.register_blueprint(location_bp)

@app.route('/')
def home():
   return 'This is Home!'

if __name__ == '__main__':  
   app.run('0.0.0.0',port=5000,debug=True)