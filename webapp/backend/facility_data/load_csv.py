import csv
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_police_fire():
    data = []
    file_path = os.path.join(DATA_DIR, 'police-fire.csv')
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        for row in reader:
            try:
                item = {
                    'sd_cd': int(row.get('sd_cd')),
                    'cd': int(row.get('cd', 0)),
                    'name': row.get('name', ''),
                    'lat': float(row.get('lat', 0)),
                    'lon': float(row.get('lon', 0)),
                    'num': row.get('num', ''),
                    'fire_engine': int(row.get('fire_engine', 0)),
                    'ambulance': int(row.get('ambulance', 0))
                }
                data.append(item)
            except (ValueError, TypeError) as e:
                # 필요하면 로그 추가 가능
                continue
    return data

def load_hospitals():
    data = []
    file_path = os.path.join(DATA_DIR, 'hospital.csv')
    with open(file_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile, delimiter=',')
        for row in reader:
            try:
                item = {
                    'sd_cd': int(row.get('sd_cd')),
                    'cd': int(row.get('cd', 0)),
                    'name': row.get('name', ''),
                    'lat': float(row.get('lat', 0)),
                    'lon': float(row.get('lon', 0)),
                    'hospital_bed': int(row.get('hospital_bed', 0)),
                    'emergency_room': int(row.get('emergency_room', 0)),
                    'doctor': int(row.get('doctor', 0)),
                    'num': row.get('num', ''),
                    'available_beds': row.get('available_beds', 0),
                    'doctor_on_duty': row.get('doctor_on_duty', 0)
                }
                data.append(item)
            except (ValueError, TypeError) as e:
                continue
    return data