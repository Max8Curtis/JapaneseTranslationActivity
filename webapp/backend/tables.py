import psycopg2

def init_db(conn):
    curr = conn.cursor()

    # curr.execute("DROP TABLE grammar CASCADE;")
    # curr.execute("DROP TABLE level CASCADE;")
    # curr.execute("DROP TABLE example CASCADE;")

    curr.execute("""
        CREATE TABLE IF NOT EXISTS level (
            id INT PRIMARY KEY,
            name VARCHAR(2)
        );
                 """)

    curr.execute("""
        CREATE TABLE IF NOT EXISTS grammar (
            id SERIAL PRIMARY KEY,
            level INT NOT NULL REFERENCES level(id),
            grammar_jp TEXT NOT NULL,
            grammar_en TEXT NOT NULL,
            description TEXT,
            url TEXT
        );
                 """)

    curr.execute("""
        CREATE TABLE IF NOT EXISTS example (
            id SERIAL PRIMARY KEY,
            grammar INT NOT NULL REFERENCES grammar(id),
            example_jp TEXT,
            example_en TEXT,
            highlight_indices TEXT
        );
                """)

    conn.commit()
    curr.close()

# init_db()