from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends
from database import get_connection, release_connection, create_tables
from tools import stringToList, cleanStrings, formatStringsHtml
import psycopg2
import psycopg2.extras
from pydantic import BaseModel
import numpy as np

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

class Grammar(BaseModel):
    level: str


@app.post('/grammar')
async def grammar_info(grammar: Grammar):
    # Returns a single grammar point for level given in the Grammar object request body
    conn = get_connection()
    curr = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    level = grammar.level

    curr.execute("""SELECT grammar.id FROM grammar JOIN level ON grammar.level = level.id WHERE level.name = %s;""", (level,))
    results = curr.fetchall()
    random_id = round(np.random.random()*len(results))
    print(f"Random id: {random_id}")
    curr.execute("""SELECT id, level, grammar_jp, grammar_en, description, url FROM grammar WHERE id = %s;""", (random_id,))
    results = curr.fetchone()
    print(f"Results: {results['id']}")
    (id, level, grammar_jp, grammar_en, description, url) = results['id'], results['level'], results['grammar_jp'], results['grammar_en'], results['description'], results['url']
    print(description)
    curr.close()
    release_connection(conn)
    description = stringToList(description)
    # print(description)
    description = cleanStrings(description)
    # print(description)
    description = formatStringsHtml(description)
    # print(description)

    grammar_jp = stringToList(grammar_jp)
    # print(grammar_jp)
    grammar_jp = cleanStrings(grammar_jp)
    # print(grammar_jp)
    grammar_jp = formatStringsHtml(grammar_jp)
    # print(grammar_jp)

    return {'id': id, 'level': level, 'grammar_jp': grammar_jp, 'grammar_en': grammar_en, 'description': description, 'url': url}

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