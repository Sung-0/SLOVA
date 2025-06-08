import pandas as pd
import os

DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')

def load_army_csv():
    return pd.read_csv(os.path.join(DATA_DIR, 'army.csv'), encoding='utf-8')

def load_rank_csv():
    return pd.read_csv(os.path.join(DATA_DIR, 'ml_temp_ls_rank.csv'))