import os
import psycopg2
import psycopg2.extras
from psycopg2 import pool
import tables

DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://myuser:mypassword@localhost:5432/mydb")
connection_pool = pool.SimpleConnectionPool(1, 10, DATABASE_URL)

def create_tables():
    conn = get_connection()
    tables.init_db(conn)
    release_connection(conn)

def get_connection():
    return connection_pool.getconn()

def release_connection(conn):
    connection_pool.putconn(conn)

