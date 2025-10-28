import psycopg2

def init_db(conn):
    curr = conn.cursor()
    curr.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name TEXT UNIQUE
        );
    """)

    curr.execute("""
        CREATE TABLE IF NOT EXISTS example (
            id SERIAL PRIMARY KEY,
            text_jp TEXT,
            text_en TEXT,
            highlight_indices TEXT,
            grammar INT,
            FOREIGN KEY grammar REFERENCES grammar(id)
        );
                """)

    curr.execute("""
        CREATE TABLE IF NOT EXISTS grammar (
            id SERIAL PRIMARY KEY,
            level NOT NULL,
            description TEXT,
            FOREIGN KEY (level) REFERENCES level(id);
        );
                 """)
    
    curr.execute("""
        CREATE TABLE IF NOT EXISTS level (
            id SERIAL PRIMARY KEY,
            name VARCHAR(2)
        );
                 """)

    conn.commit()
    curr.close()

# init_db()