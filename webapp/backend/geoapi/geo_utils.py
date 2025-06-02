import os
import json
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_geojson(filename):
    with open(os.path.join(DATA_DIR, filename), 'r', encoding='utf-8') as f:
        return json.load(f)
    
def filter_features(data, key, prefix):
    return [f for f in data['features'] if f['properties'][key].startswith(prefix)]

def get_feature_by_code(data, key, code):
    for f in data['features']:
        if f['properties'][key] == code:
            return f
        
    return None