from __future__ import annotations

import json
import os
import sqlite3
from datetime import datetime, timezone
from pathlib import Path
from urllib import parse, request

from flask import Flask, flash, redirect, render_template_string, request as http_request, url_for

BASE_DIR = Path(__file__).resolve().parent
DB_PATH = BASE_DIR / "social_agent.db"
PAGE_ID = os.getenv("META_PAGE_ID", "61583363625183")
PAGE_TOKEN = os.getenv("META_PAGE_ACCESS_TOKEN", "")
GRAPH_VERSION = os.getenv("META_GRAPH_VERSION", "v23.0")
LANDING_PAGE = "https://komarena.sk/resmart/"

app = Flask(__name__)
app.secret_key = os.getenv("SOCIAL_AGENT_SECRET", "local-only-change-me")

DEFAULT_POST = """Nefunguje vám Aqara zámok, Home Assistant alebo iné zariadenie smart domácnosti?

ReSmart pomáha s diagnostikou, nastavením a servisom zariadení Aqara, Home Assistant a smart zámkov.

Pošlite model zariadenia, stručný popis problému a fotografiu. Najprv navrhneme ďalší postup — bez posielania hesiel alebo prístupových údajov.

Servisný dopyt odošlete tu:"""

PAGE = """
<!doctype html><html lang="sk"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>KomArena Social Agent</title>
<style>body{font-family:Arial,sans-serif;background:#101418;color:#f4f7f8;margin:0}.wrap{max-width:1000px;margin:auto;padding:24px}.card{background:#192126;border:1px solid #2c3b42;border-radius:16px;padding:20px;margin-bottom:18px}.grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}textarea,input{width:100%;box-sizing:border-box;background:#0f1518;color:white;border:1px solid #3b4b52;border-radius:10px;padding:12px}.btn{border:0;border-radius:10px;padding:10px 14px;margin:4px 6px 4px 0;cursor:pointer}.primary{background:#00a7a7;color:white}.secondary{background:#33444b;color:white}.preview{white-space:pre-wrap;background:#0e1417;padding:16px;border-radius:12px}.draft{color:#f6c85f}.approved{color:#59d38c}.published{color:#58a6ff}.small{color:#b7c4c9}@media(max-width:760px){.grid{grid-template-columns:1fr}}</style></head>
<body><div class="wrap"><h1>KomArena Social Agent — ReSmart</h1><p class="small">Approval-first režim. Bez schválenia sa nič nezverejní.</p>
{% with messages=get_flashed_messages() %}{% for m in messages %}<div class="card">{{m}}</div>{% endfor %}{% endwith %}
<div class="grid"><div class="card"><h2>Nový koncept</h2><form method="post" action="{{url_for('create_post')}}"><textarea name="text" rows="12" required>{{default_post}}</textarea><input name="link" value="{{landing_page}}"><button class="btn primary">Uložiť koncept</button></form></div><div class="card"><h2>Náhľad</h2><div class="preview">{{default_post}}\n\n{{landing_page}}</div></div></div>
<div class="card"><h2>Príspevky</h2>{% for p in posts %}<div class="card"><strong class="{{p['status']}}">{{p['status']|upper}}</strong><div class="preview">{{p['text']}}{% if p['link'] %}\n\n{{p['link']}}{% endif %}</div><form method="post" style="display:inline" action="{{url_for('approve_post',post_id=p['id'])}}"><button class="btn secondary">Schváliť</button></form><form method="post" style="display:inline" action="{{url_for('publish_post',post_id=p['id'])}}"><button class="btn primary">Publikovať</button></form></div>{% else %}<p>Zatiaľ bez konceptov.</p>{% endfor %}</div>
<div class="card"><h2>Auditný log</h2>{% for a in audit %}<p><strong>{{a['created_at']}}</strong> — {{a['action']}} — {{a['details']}}</p>{% else %}<p>Prázdny.</p>{% endfor %}</div></div></body></html>
"""


def now() -> str:
    return datetime.now(timezone.utc).isoformat()


def connect() -> sqlite3.Connection:
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def init_db() -> None:
    with connect() as conn:
        conn.executescript("""
        CREATE TABLE IF NOT EXISTS posts(id INTEGER PRIMARY KEY AUTOINCREMENT,text TEXT NOT NULL,link TEXT,status TEXT NOT NULL DEFAULT 'draft',created_at TEXT NOT NULL,approved_at TEXT,published_at TEXT,meta_post_id TEXT);
        CREATE TABLE IF NOT EXISTS audit_log(id INTEGER PRIMARY KEY AUTOINCREMENT,action TEXT NOT NULL,details TEXT NOT NULL,created_at TEXT NOT NULL);
        """)


def audit(action: str, details: dict) -> None:
    with connect() as conn:
        conn.execute("INSERT INTO audit_log(action,details,created_at) VALUES(?,?,?)",(action,json.dumps(details,ensure_ascii=False),now()))


@app.get("/")
def index():
    with connect() as conn:
        posts=conn.execute("SELECT * FROM posts ORDER BY id DESC").fetchall()
        rows=conn.execute("SELECT * FROM audit_log ORDER BY id DESC LIMIT 50").fetchall()
    return render_template_string(PAGE,posts=posts,audit=rows,default_post=DEFAULT_POST,landing_page=LANDING_PAGE)


@app.post("/posts")
def create_post():
    text=http_request.form.get("text","").strip(); link=http_request.form.get("link","").strip()
    if not text:
        flash("Text je povinný."); return redirect(url_for("index"))
    with connect() as conn:
        post_id=conn.execute("INSERT INTO posts(text,link,status,created_at) VALUES(?,?,'draft',?)",(text,link,now())).lastrowid
    audit("draft_created",{"post_id":post_id}); flash("Koncept uložený.")
    return redirect(url_for("index"))


@app.post("/posts/<int:post_id>/approve")
def approve_post(post_id:int):
    with connect() as conn:
        conn.execute("UPDATE posts SET status='approved',approved_at=? WHERE id=? AND status='draft'",(now(),post_id))
    audit("post_approved",{"post_id":post_id}); flash("Príspevok schválený. Ešte nie je zverejnený.")
    return redirect(url_for("index"))


def publish_to_meta(message:str, link:str) -> str:
    if not PAGE_TOKEN:
        raise RuntimeError("Chýba META_PAGE_ACCESS_TOKEN. Publikovanie bolo bezpečne zastavené.")
    endpoint=f"https://graph.facebook.com/{GRAPH_VERSION}/{PAGE_ID}/feed"
    payload={"message":message,"access_token":PAGE_TOKEN}
    if link: payload["link"]=link
    req=request.Request(endpoint,data=parse.urlencode(payload).encode(),method="POST")
    with request.urlopen(req,timeout=30) as resp:
        data=json.loads(resp.read().decode())
    if "id" not in data: raise RuntimeError(f"Meta API nevrátilo ID: {data}")
    return str(data["id"])


@app.post("/posts/<int:post_id>/publish")
def publish_post(post_id:int):
    with connect() as conn:
        post=conn.execute("SELECT * FROM posts WHERE id=?",(post_id,)).fetchone()
    if not post or post["status"]!="approved":
        flash("Publikovať možno iba schválený koncept."); return redirect(url_for("index"))
    try:
        meta_id=publish_to_meta(post["text"],post["link"] or "")
    except Exception as exc:
        audit("publish_blocked",{"post_id":post_id,"error":str(exc)}); flash(str(exc)); return redirect(url_for("index"))
    with connect() as conn:
        conn.execute("UPDATE posts SET status='published',published_at=?,meta_post_id=? WHERE id=?",(now(),meta_id,post_id))
    audit("post_published",{"post_id":post_id,"meta_post_id":meta_id}); flash("Príspevok publikovaný.")
    return redirect(url_for("index"))


if __name__=="__main__":
    init_db(); app.run(host="127.0.0.1",port=8791,debug=False)
