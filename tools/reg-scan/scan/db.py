"""SQLite state management for reg-scan.

Tables:
  items   - canonical de-dup store, keyed by url_hash
  runs    - audit log of when each scan ran and its counts
"""
import hashlib
import json
import sqlite3
from datetime import datetime, timezone
from pathlib import Path

_DEFAULT_DB = Path(__file__).parent.parent / "state" / "scan.db"


def url_hash(url: str) -> str:
    """Return a stable hex SHA-256 of a URL (used as primary key and ICS UID)."""
    return hashlib.sha256(url.encode()).hexdigest()


def connect(path: Path = _DEFAULT_DB) -> sqlite3.Connection:
    """Open (and if necessary initialise) the SQLite database."""
    path.parent.mkdir(parents=True, exist_ok=True)
    conn = sqlite3.connect(path)
    conn.row_factory = sqlite3.Row
    _init(conn)
    return conn


def _init(conn: sqlite3.Connection) -> None:
    conn.executescript("""
        CREATE TABLE IF NOT EXISTS items (
            url_hash     TEXT PRIMARY KEY,
            url          TEXT NOT NULL UNIQUE,
            source_id    TEXT NOT NULL,
            title        TEXT,
            summary      TEXT,
            published_at TEXT,
            fetched_at   TEXT NOT NULL,
            signal_type  TEXT,
            risk_areas   TEXT,
            score        REAL,
            deadline     TEXT
        );
        CREATE TABLE IF NOT EXISTS runs (
            id           INTEGER PRIMARY KEY AUTOINCREMENT,
            ran_at       TEXT NOT NULL,
            edition      TEXT,
            item_count   INTEGER,
            source_count INTEGER,
            notes        TEXT
        );
    """)
    conn.commit()


def seen_urls(conn: sqlite3.Connection, source_id: str) -> set:
    """Return URLs already recorded for a source."""
    rows = conn.execute(
        "SELECT url FROM items WHERE source_id = ?", (source_id,)
    ).fetchall()
    return {r["url"] for r in rows}


def previous_items(conn: sqlite3.Connection, urls) -> dict:
    """Return prior stored records keyed by URL for edition change tracking."""
    urls = list(urls)
    if not urls:
        return {}
    marks = ",".join("?" for _ in urls)
    rows = conn.execute(f"SELECT url, title, deadline FROM items WHERE url IN ({marks})", urls).fetchall()
    return {row["url"]: dict(row) for row in rows}


def open_deadlines(conn: sqlite3.Connection, today: str) -> list:
    """Return previously seen future-deadline items for carry-forward."""
    rows = conn.execute(
        "SELECT url, source_id, title, summary, published_at, signal_type, risk_areas, score, deadline "
        "FROM items WHERE deadline IS NOT NULL AND deadline >= ?", (today,)
    ).fetchall()
    return [dict(row) for row in rows]


def upsert_items(conn: sqlite3.Connection, items: list) -> None:
    """Insert-or-update a list of item dicts."""
    now = datetime.now(timezone.utc).isoformat()
    for item in items:
        uh = url_hash(item["url"])
        conn.execute(
            """
            INSERT INTO items
                (url_hash, url, source_id, title, summary, published_at,
                 fetched_at, signal_type, risk_areas, score, deadline)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON CONFLICT(url_hash) DO UPDATE SET
                title        = excluded.title,
                summary      = excluded.summary,
                signal_type  = excluded.signal_type,
                risk_areas   = excluded.risk_areas,
                score        = excluded.score,
                deadline     = excluded.deadline
            """,
            (
                uh,
                item["url"],
                item["source_id"],
                item.get("title"),
                item.get("summary"),
                item.get("published_at"),
                now,
                item.get("signal_type"),
                json.dumps(item.get("risk_areas", [])),
                item.get("score"),
                item.get("deadline"),
            ),
        )
    conn.commit()


def log_run(
    conn: sqlite3.Connection,
    edition: str,
    item_count: int,
    source_count: int,
    notes: str = "",
) -> None:
    conn.execute(
        "INSERT INTO runs (ran_at, edition, item_count, source_count, notes) VALUES (?, ?, ?, ?, ?)",
        (datetime.now(timezone.utc).isoformat(), edition, item_count, source_count, notes),
    )
    conn.commit()
