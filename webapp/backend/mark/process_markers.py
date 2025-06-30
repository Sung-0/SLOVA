import pandas as pd
from .load_csv import load_army_csv, load_rank_csv
from scipy.spatial import cKDTree
import json
import os

def prepare_marker_json():
    army_df = load_army_csv()
    rank_df = load_rank_csv()

    # rank_df의 좌표 (lon, lat) -> numpy 배열
    rank_coords = rank_df[['longitude', 'latitude']].to_numpy()
    tree = cKDTree(rank_coords)

    # army_df의 좌표에 대해 가장 가까운 rank 구하기
    army_coords = army_df[['lon', 'lat']].to_numpy()
    dists, idxs = tree.query(army_coords, k=1)

    # 매칭된 rank 가져오기
    matched_ranks = rank_df.iloc[idxs].reset_index(drop=True)
    army_df = army_df.reset_index(drop=True)
    army_df['rank'] = matched_ranks['rank']

    # 필요한 컬럼 정제
    markers = army_df[[ 'sd_cd' ,'name', 'lat', 'lon', 'rank', 'img', 'id', 'personnel', 'features', 'area']].to_dict(orient='records')
    
    # 경로 구분자 호환 처리
    output_path = os.path.join('data', 'markers.json')

    # JSON 파일로 저장 (data 폴더 안에)
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(markers, f, ensure_ascii=False, indent=2)

if __name__ == '__main__':
    prepare_marker_json()