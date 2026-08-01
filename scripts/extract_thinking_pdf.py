#!/usr/bin/env python3
"""Extract the Math101 thinking problem bank from a Feishu-exported PDF.

Usage:
    python3 scripts/extract_thinking_pdf.py SOURCE.pdf math-thinking-practice

The PDF is an HTML-style export: headings retain useful font sizes while many
questions depend on diagrams.  This script therefore extracts searchable text
and also renders a faithful source crop for every question entry.
"""

from __future__ import annotations

import argparse
import json
import re
from pathlib import Path

import fitz


CATEGORIES = [
    {
        "id": "classic",
        "name": "经典游戏与知识",
        "short": "经典游戏",
        "icon": "▣",
        "description": "作为背景材料的经典游戏、规则与策略",
    },
    {
        "id": "big",
        "name": "大问题",
        "short": "大问题",
        "icon": "⌛",
        "description": "有难度或扩展性、适合完整探究的问题",
    },
    {
        "id": "small",
        "name": "中小问题",
        "short": "中小问题",
        "icon": "◇",
        "description": "按编码、不变量、递推、几何、算法等方法分类",
    },
    {
        "id": "stem",
        "name": "STEM",
        "short": "STEM",
        "icon": "⚙",
        "description": "联系科学、技术与工程情境的数学探究",
    },
    {
        "id": "modeling",
        "name": "模型与建模",
        "short": "模型建模",
        "icon": "⌁",
        "description": "从真实情境抽象关系、建立与比较模型",
    },
    {
        "id": "extension",
        "name": "课内拓展与新知识",
        "short": "课内拓展",
        "icon": "∞",
        "description": "悖论、概率、密码、数论与课内知识延伸",
    },
]

SECTION_MAP = {
    "一": "classic",
    "二": "big",
    "三": "small",
    "四": "stem",
    "五": "modeling",
    "六": "extension",
}

MANUAL_ANSWERS = {
    "翻转木块": {
        "answer": "这是一道开放策略题。可把每一步记录成“位置＋姿态”：竖立、横躺或竖躺；只保留完全落在地板上的合法状态，并以竖直立在红色方块上为终点。",
        "explanation": "木块每翻一次，姿态会按“竖立 ↔ 横躺/竖躺”变化。若要系统寻找最短路线，可以从起点开始逐层枚举所有合法且未重复的状态；第一次到达红色终点时，得到的就是最少步数路线。",
    },
    "过桥谜题": {
        "answer": "最短时间是 <strong>17 分钟</strong>：爸爸和妈妈过桥（2）→ 爸爸返回（1）→ 儿子和爷爷过桥（10）→ 妈妈返回（2）→ 爸爸和妈妈再次过桥（2）。",
        "explanation": "让最慢的两人一起过桥，避免分别支付 10 分钟和 5 分钟；同时用最快的两人接送手电筒。总时间为 2＋1＋10＋2＋2＝17 分钟。",
    },
    "过桥问题升级": {
        "answer": "最短时间是 <strong>20 分钟</strong>。原策略仍然最优，但不再唯一：既可以让两个最快者协作接送，也可以由最快者分别陪另外三人过桥，两种策略都是 20 分钟。",
        "explanation": "设用时为 a≤b≤c≤d。两种常见方案的代价分别为 a＋3b＋d 与 2a＋b＋c＋d，相差 2b－a－c。本题 a＝1、b＝3、c＝5，差为 0，所以两种方案同样快。",
    },
}


def clean_text(value: str) -> str:
    value = value.replace("\u200b", "").replace("\ufeff", "")
    value = re.sub(r"[ \t]+", " ", value)
    return value.strip()


def join_wrapped(left: str, right: str) -> str:
    if not left:
        return right
    if not right:
        return left
    if re.search(r"[A-Za-z0-9]$", left) and re.match(r"[A-Za-z0-9]", right):
        return f"{left} {right}"
    return left + right


def extract_lines(doc: fitz.Document) -> list[dict]:
    lines: list[dict] = []
    for page_index, page in enumerate(doc):
        data = page.get_text("dict", flags=fitz.TEXTFLAGS_TEXT)
        for block_index, block in enumerate(data.get("blocks", [])):
            for line_index, line in enumerate(block.get("lines", [])):
                spans = line.get("spans", [])
                text = clean_text("".join(span.get("text", "") for span in spans))
                if not text:
                    continue
                lines.append(
                    {
                        "page": page_index,
                        "block": block_index,
                        "line": line_index,
                        "bbox": tuple(line["bbox"]),
                        "size": max((span.get("size", 0) for span in spans), default=0),
                        "text": text,
                    }
                )
    lines.sort(key=lambda item: (item["page"], item["bbox"][1], item["bbox"][0]))
    return lines


def structural_kind(line: dict) -> str | None:
    text = line["text"]
    size = line["size"]
    if size >= 18 and re.match(r"^[一二三四五六]、", text):
        return "section"
    if size >= 16 and text.startswith("子类别"):
        return "subcategory"
    if 14.4 <= size < 16:
        return "topic"
    if 13.0 <= size < 14.4:
        return "subquestion"
    return None


def assemble_body(body_lines: list[dict], excluded_titles: set[str]) -> str:
    paragraphs: list[str] = []
    current = ""
    current_key = None
    for line in body_lines:
        text = clean_text(line["text"])
        if not text or text in excluded_titles:
            continue
        key = (line["page"], line["block"])
        if current_key is None or key == current_key:
            current = join_wrapped(current, text)
        else:
            if current:
                paragraphs.append(current)
            current = text
        current_key = key
    if current:
        paragraphs.append(current)
    deduplicated: list[str] = []
    for paragraph in paragraphs:
        if deduplicated and (paragraph == deduplicated[-1] or deduplicated[-1].endswith(paragraph)):
            continue
        if deduplicated and paragraph.startswith(deduplicated[-1]):
            deduplicated[-1] = paragraph
            continue
        deduplicated.append(paragraph)
    return "\n".join(deduplicated).strip()


def body_asks_question(body: str) -> bool:
    return bool(re.search(r"[？?]|请问|问：|求出?|证明|尝试|如何|为什么|能否|是否|有何|什么条件|多少", body))


def parse_entries(doc: fitz.Document) -> list[dict]:
    lines = extract_lines(doc)
    raw_entries: list[dict] = []
    active = None
    category = "classic"
    subcategory = ""
    topic = None

    def close_active(end_page: int, end_y: float) -> None:
        nonlocal active
        if not active:
            return
        active["end_page"] = end_page
        active["end_y"] = end_y
        active["body"] = assemble_body(active.pop("body_lines"), active.pop("excluded_titles"))
        active = None

    for line in lines:
        kind = structural_kind(line)
        if kind in {"topic", "subquestion"} and active:
            is_page_continuation = (
                line["text"] == active["title"]
                and line["page"] > active["start_page"]
                and line["bbox"][1] < 45
            )
            if is_page_continuation:
                active["excluded_titles"].add(line["text"])
                continue

        if kind:
            close_active(line["page"], line["bbox"][1] - 5)

        if kind == "section":
            match = re.match(r"^([一二三四五六])、", line["text"])
            if match:
                category = SECTION_MAP[match.group(1)]
            subcategory = ""
            topic = None
            continue

        if kind == "subcategory":
            subcategory = re.sub(r"^子类别[：:]?", "", line["text"]).strip("：: ")
            topic = None
            continue

        if kind in {"topic", "subquestion"}:
            parent = topic if kind == "subquestion" else None
            entry = {
                "raw_index": len(raw_entries) + 1,
                "title": line["text"].strip(),
                "level": kind,
                "category": category,
                "subcategory": subcategory,
                "parent": parent,
                "start_page": line["page"],
                "start_y": max(0, line["bbox"][1] - 8),
                "end_page": line["page"],
                "end_y": line["bbox"][3] + 8,
                "body_lines": [],
                "excluded_titles": {line["text"]},
            }
            raw_entries.append(entry)
            active = entry
            if kind == "topic":
                topic = entry
            continue

        if active:
            active["body_lines"].append(line)

    close_active(doc.page_count - 1, doc[-1].rect.height - 20)

    children = {id(entry): [] for entry in raw_entries}
    for entry in raw_entries:
        if entry["parent"]:
            children[id(entry["parent"])].append(entry)

    kept: list[dict] = []
    for entry in raw_entries:
        has_children = bool(children[id(entry)])
        if entry["level"] == "topic" and has_children and not body_asks_question(entry["body"]):
            continue
        kept.append(entry)

    for number, entry in enumerate(kept, start=1):
        parent = entry["parent"]
        context = parent["body"] if parent and parent["body"] else ""
        entry["id"] = f"T{number:03d}"
        entry["context"] = context
        entry["parent_title"] = parent["title"] if parent else ""
        entry["type"] = "主题题" if entry["level"] == "topic" else "变式 / 子题"
        entry["prompt"] = entry["body"] or "PDF 仅列出该题标题，未附可提取的文字题干；请结合原题截图查看。"
        entry.update(MANUAL_ANSWERS.get(entry["title"], {"answer": "", "explanation": ""}))
    return kept


def render_entry_media(doc: fitz.Document, entry: dict, assets_dir: Path) -> list[str]:
    media: list[str] = []
    start_page = entry["start_page"]
    end_page = entry["end_page"]
    for page_index in range(start_page, end_page + 1):
        page = doc[page_index]
        top = entry["start_y"] if page_index == start_page else 18
        bottom = entry["end_y"] if page_index == end_page else page.rect.height - 18
        top = max(0, min(top, page.rect.height - 1))
        bottom = max(top + 1, min(bottom, page.rect.height))
        if bottom - top < 16:
            continue
        clip = fitz.Rect(22, top, page.rect.width - 22, bottom)
        pix = page.get_pixmap(matrix=fitz.Matrix(1.55, 1.55), clip=clip, alpha=False)
        suffix = f"-{len(media) + 1}" if end_page > start_page else ""
        filename = f"source-{entry['id'].lower()}{suffix}.jpg"
        output = assets_dir / filename
        pix.pil_save(output, format="JPEG", quality=84, optimize=True)
        media.append(f"assets/{filename}")
    return media


def export_questions(doc: fitz.Document, entries: list[dict], output_dir: Path) -> None:
    assets_dir = output_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)
    questions = []
    for entry in entries:
        media = render_entry_media(doc, entry, assets_dir)
        page_start = entry["start_page"] + 1
        page_end = entry["end_page"] + 1
        page_label = str(page_start) if page_start == page_end else f"{page_start}–{page_end}"
        questions.append(
            {
                "id": entry["id"],
                "title": entry["title"],
                "category": entry["category"],
                "subcategory": entry["subcategory"],
                "topic": entry["parent_title"],
                "type": entry["type"],
                "sourcePages": page_label,
                "context": entry["context"],
                "prompt": entry["prompt"],
                "answer": entry["answer"],
                "explanation": entry["explanation"],
                "media": media,
            }
        )

    content = (
        "// Generated from the 51-page Feishu PDF export.\n"
        "window.MATH_THINKING_CATEGORIES = "
        + json.dumps(CATEGORIES, ensure_ascii=False, indent=4)
        + ";\n\nwindow.MATH_THINKING_QUESTIONS = "
        + json.dumps(questions, ensure_ascii=False, indent=4)
        + ";\n"
    )
    (output_dir / "questions.js").write_text(content, encoding="utf-8")


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("pdf", type=Path)
    parser.add_argument("output_dir", type=Path, nargs="?")
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()

    doc = fitz.open(args.pdf)
    entries = parse_entries(doc)
    print(f"pages={doc.page_count} entries={len(entries)}")
    for entry in entries:
        sub = f" / {entry['subcategory']}" if entry["subcategory"] else ""
        parent = f" ← {entry['parent_title']}" if entry["parent_title"] else ""
        print(
            f"{entry['id']} P{entry['start_page'] + 1:02d} "
            f"{entry['category']}{sub} {entry['type']} {entry['title']}{parent} "
            f"[{len(entry['prompt'])} chars]"
        )
    if not args.dry_run:
        if not args.output_dir:
            parser.error("output_dir is required unless --dry-run is used")
        export_questions(doc, entries, args.output_dir)


if __name__ == "__main__":
    main()
