import csv
from collections import defaultdict

def summarize_landslide_by_sido(csv_path: str):
    summary = defaultdict(int)

    with open(csv_path, newline='', encoding='utf-8') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            sido = row['sido'].strip() 
            summary[sido] += 1

    return dict(summary)