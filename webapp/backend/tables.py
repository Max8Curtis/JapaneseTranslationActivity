import psycopg2

def init_db(conn):
    curr = conn.cursor()
    curr.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE
        );
    """)
    conn.commit()
    curr.close()

# init_db()