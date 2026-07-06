#!/usr/bin/env python3
"""Flush queued Codex automation messages to Telegram.

Scheduled Codex automations can generate content but may not have outbound
network access. Automation senders write failed sends into OUTBOX_DIR; this
relay runs from launchd with normal local network access and delivers them.
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


TELEGRAM_ENV_PATH = "/Users/benstgai/Library/Application Support/project-virtual-officer/.env"
OUTBOX_DIR = Path("/private/tmp/codex-telegram-outbox")
SENT_DIR = OUTBOX_DIR / "sent"
FAILED_DIR = OUTBOX_DIR / "failed"
LOG_PATH = Path("/Users/benstgai/Library/Application Support/codex-telegram-relay/relay.log")
MAX_CHARS = 3500


def utc_now() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds").replace("+00:00", "Z")


def log(message: str) -> None:
    LOG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with LOG_PATH.open("a", encoding="utf-8") as handle:
        handle.write(f"{utc_now()} {message}\n")


def load_env(path: str) -> None:
    if not os.path.exists(path):
        return
    with open(path, "r", encoding="utf-8") as handle:
        for raw_line in handle:
            line = raw_line.strip()
            if not line or line.startswith("#") or "=" not in line:
                continue
            key, value = line.split("=", 1)
            key = key.strip()
            value = value.strip().strip('"').strip("'")
            if key and key not in os.environ:
                os.environ[key] = value


def chunk_text(text: str, max_chars: int = MAX_CHARS) -> list:
    text = (text or "").strip()
    if len(text) <= max_chars:
        return [text]

    chunks = []
    current = []
    current_len = 0
    for paragraph in text.split("\n\n"):
        paragraph = paragraph.strip()
        if not paragraph:
            continue
        addition = paragraph if not current else "\n\n" + paragraph
        if current_len + len(addition) <= max_chars:
            current.append(paragraph)
            current_len += len(addition)
            continue
        if current:
            chunks.append("\n\n".join(current))
            current = []
            current_len = 0
        while len(paragraph) > max_chars:
            chunks.append(paragraph[:max_chars])
            paragraph = paragraph[max_chars:]
        if paragraph:
            current.append(paragraph)
            current_len = len(paragraph)
    if current:
        chunks.append("\n\n".join(current))
    return [chunk for chunk in chunks if chunk.strip()]


def send_chunk(token: str, chat_id: str, text: str) -> None:
    api_url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": text,
        "disable_web_page_preview": True,
    }
    data = urllib.parse.urlencode(payload).encode("utf-8")
    request = urllib.request.Request(api_url, data=data, method="POST")
    try:
        with urllib.request.urlopen(request, timeout=20) as response:
            body = response.read().decode("utf-8", errors="replace")
            if response.status < 200 or response.status >= 300:
                raise RuntimeError(f"Telegram API error: HTTP {response.status}: {body}")
    except urllib.error.URLError:
        curl = shutil.which("curl")
        if not curl:
            raise
        completed = subprocess.run(
            [
                curl,
                "--fail",
                "--silent",
                "--show-error",
                "--location",
                "--max-time",
                "20",
                "--data",
                data.decode("utf-8"),
                api_url,
            ],
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
        )
        if completed.returncode != 0:
            raise RuntimeError(completed.stderr.decode("utf-8", errors="replace").strip())


def send_message(token: str, chat_id: str, text: str) -> int:
    chunks = chunk_text(text)
    for index, chunk in enumerate(chunks, start=1):
        if len(chunks) > 1:
            chunk = f"Part {index}/{len(chunks)}\n\n{chunk}"
        send_chunk(token, chat_id, chunk)
        time.sleep(0.25)
    return len(chunks)


def claim(path: Path) -> Path:
    claimed = path.with_suffix(path.suffix + ".sending")
    path.rename(claimed)
    return claimed


def move_to(path: Path, destination_dir: Path) -> Path:
    destination_dir.mkdir(parents=True, exist_ok=True)
    destination = destination_dir / path.name.replace(".sending", "")
    if destination.exists():
        destination = destination_dir / f"{int(time.time())}-{destination.name}"
    path.rename(destination)
    return destination


def flush_once() -> int:
    load_env(TELEGRAM_ENV_PATH)
    token = os.environ.get("TELEGRAM_BOT_TOKEN", "").strip()
    chat_id = os.environ.get("TELEGRAM_CHAT_ID", "").strip()
    if not token or not chat_id:
        log("missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID")
        return 2

    OUTBOX_DIR.mkdir(parents=True, exist_ok=True)
    delivered = 0
    for path in sorted(OUTBOX_DIR.glob("*.json")):
        try:
            claimed = claim(path)
        except FileNotFoundError:
            continue
        try:
            payload = json.loads(claimed.read_text(encoding="utf-8"))
            text = str(payload.get("text", "")).strip()
            source = str(payload.get("source", claimed.name))
            if not text:
                raise RuntimeError("empty queued Telegram message")
            count = send_message(token, chat_id, text)
            moved = move_to(claimed, SENT_DIR)
            log(f"sent {source} as {count} Telegram message(s); archived={moved}")
            delivered += 1
        except Exception as error:
            log(f"failed {claimed.name}: {error}")
            try:
                move_to(claimed, FAILED_DIR)
            except Exception as move_error:
                log(f"failed to move {claimed.name} to failed dir: {move_error}")
    return 0 if delivered >= 0 else 1


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--once", action="store_true", help="Flush queued messages once and exit.")
    args = parser.parse_args()
    if args.once:
        return flush_once()
    while True:
        flush_once()
        time.sleep(60)


if __name__ == "__main__":
    raise SystemExit(main())
