import pymysql
from dbutils.pooled_db import PooledDB
from .config import DB_HOST, DB_USER, DB_PASSWD, DB_NAME

# Pool for database
def get_db_pool():
    return PooledDB(
        creator=pymysql,
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASSWD,
        database=DB_NAME,
        maxconnections=1,
        blocking=True,
    )

pool = get_db_pool()
