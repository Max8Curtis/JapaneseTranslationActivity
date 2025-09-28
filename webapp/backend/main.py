from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from database import get_connection, release_connection, create_tables
import psycopg2

app = FastAPI()

origins=["http://localhost:3000"]  # React dev server

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

create_tables()

@app.get("/users")
def read_users():
    conn = get_connection()
    curr = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    # curr.execute("SELECT * FROM users;")
    curr.execute("""SELECT id, name FROM users;""")
    users = curr.fetchall()
    curr.close()
    release_connection(conn)
    return users

@app.post("/users")
def create_user(name: str):
    conn = get_connection()
    curr = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)
    curr.execute("INSERT INTO users (name) VALUES (%s) RETURNING *;", (name,))
    new_user = curr.fetchone()
    conn.commit()
    curr.close()
    release_connection(conn)
    return new_user