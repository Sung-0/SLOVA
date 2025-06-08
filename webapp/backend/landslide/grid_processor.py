import geopandas as gpd
import os

def export_geojson():
    # 파일 경로 설정
    base_dir = os.path.dirname(__file__)
    geojson_path = os.path.abspath(os.path.join(base_dir, '..', 'data', 'test.geojson'))

    # GeoJSON 파일 로드
    gdf = gpd.read_file(geojson_path)

    # 컬럼명 '등급'을 'rank'로 통일 (혹은 그대로 써도 됨)
    gdf = gdf.rename(columns={"등급": "rank"})

    # 필요한 컬럼만 남기기: geometry, rank
    gdf = gdf[["geometry", "rank"]]

    # GeoJSON 문자열로 반환
    return gdf.to_json()
