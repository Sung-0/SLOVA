import os
from dotenv import load_dotenv
import oracledb

# .env 파일 로드
load_dotenv()

dsn = oracledb.makedsn(
    os.getenv('ORACLE_HOST'),
    int(os.getenv("ORACLE_PORT")),
    service_name=os.getenv("ORACLE_SERVICE_NAME")
)

conn = oracledb.connect(
    user=os.getenv("ORACLE_USER"),
    password=os.getenv("ORACLE_PASSWORD"),
    dsn=dsn
)
