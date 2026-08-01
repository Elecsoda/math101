#!/usr/bin/env python3
"""Extract question/answer records and media references from the supplied DOCX files."""

from __future__ import annotations

import argparse
import html
import json
import re
import struct
import zipfile
from dataclasses import dataclass, field
from pathlib import Path, PurePosixPath
from xml.etree import ElementTree as ET


W = "http://schemas.openxmlformats.org/wordprocessingml/2006/main"
R = "http://schemas.openxmlformats.org/officeDocument/2006/relationships"
PKG_REL = "http://schemas.openxmlformats.org/package/2006/relationships"
IMAGE_REL_SUFFIX = "/image"

QUESTION_RE = re.compile(r"^(\d+)[．.]\s*(.*)$", re.S)
SECTION_RE = re.compile(r"^[一二三四五六七八九十]+、\s*(选择题|填空题|判断题|解答题)")
ANSWER_MARKERS = ("【答案】", "【分析】", "【详解】", "【点睛】", "【点评】")

CATEGORIES = [
    {"id": "concept", "name": "图形认识与面积单位", "short": "认识与单位", "icon": "◇", "description": "图形特征、面积意义、单位与基础判断"},
    {"id": "perimeter", "name": "长方形与正方形周长", "short": "基本周长", "icon": "□", "description": "周长公式、边长关系与基本计算"},
    {"id": "area", "name": "长方形与正方形面积", "short": "基本面积", "icon": "▦", "description": "面积公式、边长关系与基本计算"},
    {"id": "composite-perimeter", "name": "组合与不规则图形周长", "short": "组合周长", "icon": "⌁", "description": "平移转化、方格计数与周长比较"},
    {"id": "composite-area", "name": "组合图形与阴影面积", "short": "组合面积", "icon": "◩", "description": "割补、分割、方格估算与阴影面积"},
    {"id": "transform", "name": "拼组·剪裁·图形变化", "short": "拼剪与变化", "icon": "⇄", "description": "拼组、剪裁、拉伸与周长面积变化"},
    {"id": "application", "name": "周长与面积实际应用", "short": "实际应用", "icon": "⌂", "description": "场地、铺设、篱笆、道路等实际问题"},
    {"id": "circle", "name": "圆专题", "short": "圆专题", "icon": "○", "description": "圆、半圆、圆环及与其他图形的综合问题"},
]

CIRCLE_IDS = {
    "A005", "A017", "A022", "A027", "A028", "A082",
    "B005", "B015", "B017", "B039", "B081",
}

CONCEPT_IDS = {
    "B006", "B008", "B011", "B029", "B034", "B036", "B055", "B056",
    "B061", "B063", "B076", "B085", "B086", "B090", "B096", "B100",
}

PROMPT_OVERRIDES = {
    "A027": "如图，一个长100米、宽60米的长方形广场，在一侧有一条半圆形的小路。绕绿色箭头方向走一圈，是（　　）米。\nA．160\tB．320\tC．260＋30π\tD．320＋30π",
    "A028": "如图，一个长100米、宽60米的长方形广场，在一侧有一条半圆形的小路。包括半圆形小路在内的整个广场的面积是（　　）平方米。\nA．6000＋30π\tB．6000＋900π\tC．6000＋450π\tD．1600＋450π",
    "A022": "一块菜地呈半圆形，它的半径是r，周长是（　　）。\nA．2πr×1/2\tB．πr＋r\tC．2πr\tD．πr＋2r",
    "A032": "两张长方形纸放在桌面上，盖住桌子的面积是45平方厘米，重叠部分的面积相当于大长方形面积的1/6，相当于小长方形面积的25%。重叠部分的面积是（　　）平方厘米。\nA．5\tB．20\tC．9",
    "A035": "笑笑在计算少先队中队旗的面积时，列出了算式“80×60－60×20÷2”，请你判断图（　　）可以表示笑笑的思路。\nA．见配图\tB．见配图\tC．见配图\tD．见配图",
    "A057": "先观察图1中的阴影部分占长方形面积的3/8。再仿照图1的思考方法，分一分：在图2的七巧板图形中，阴影部分的面积占整个图形面积的几分之几？",
    "A067": "图①中的涂色部分占整个图形的几分之几？图②中涂色部分的面积是（　　）平方厘米。",
    "A081": "下面这个图形是由面积为1平方厘米的小正方形拼成的，它的面积是（　　）平方厘米。",
    "B070": "正方形的边长是a厘米，它的周长是（　　）厘米，面积是（　　）平方厘米。",
    "B074": "比较下面每组图形的周长。（在括号里填“＞”“＜”或“＝”）\n（1）甲的周长（　　）乙的周长。\n（2）甲的周长（　　）乙的周长。",
}

ANSWER_OVERRIDES = {
    "A027": "C",
    "A028": "C",
    "A057": "3/8；1/16",
    "A067": "1/6；15",
    "A080": "41/20",
    "A086": "1/4",
    "B070": "4a；a²",
}

MEDIA_TARGET_SKIPS = {
    ("A022", "word/media/image50.png"),
    ("A057", "word/media/image126.png"),
    ("A081", "word/media/image179.png"),
}

SHARED_MEDIA_FROM = {
    "A028": "A027",
}


@dataclass
class Paragraph:
    text: str
    images: list[str] = field(default_factory=list)


def paragraph_text(node: ET.Element) -> str:
    parts: list[str] = []
    for element in node.iter():
        if element.tag == f"{{{W}}}t" and element.text:
            parts.append(element.text)
        elif element.tag == f"{{{W}}}tab":
            parts.append("\t")
        elif element.tag in (f"{{{W}}}br", f"{{{W}}}cr"):
            parts.append("\n")
    return "".join(parts).strip()


def read_docx(path: Path) -> tuple[list[Paragraph], dict[str, bytes]]:
    with zipfile.ZipFile(path) as archive:
        document = ET.fromstring(archive.read("word/document.xml"))
        relationships = ET.fromstring(archive.read("word/_rels/document.xml.rels"))
        rels: dict[str, str] = {}
        for rel in relationships.findall(f"{{{PKG_REL}}}Relationship"):
            if rel.attrib.get("Type", "").endswith(IMAGE_REL_SUFFIX):
                rels[rel.attrib["Id"]] = rel.attrib["Target"]

        paragraphs: list[Paragraph] = []
        body = document.find(f"{{{W}}}body")
        if body is None:
            raise ValueError(f"No document body in {path}")
        for node in body.iter(f"{{{W}}}p"):
            images: list[str] = []
            for element in node.iter():
                for attr_name, attr_value in element.attrib.items():
                    if attr_name in (f"{{{R}}}embed", f"{{{R}}}id") and attr_value in rels:
                        target = str(PurePosixPath("word") / rels[attr_value])
                        if target not in images:
                            images.append(target)
            text = paragraph_text(node)
            if text or images:
                paragraphs.append(Paragraph(text=text, images=images))

        media = {
            name: archive.read(name)
            for name in archive.namelist()
            if name.startswith("word/media/")
        }
    return paragraphs, media


def extract_records(path: Path, source_key: str) -> list[dict]:
    paragraphs, _ = read_docx(path)
    records: list[dict] = []
    current: dict | None = None
    question_type = "其他题"
    stage = "prompt"

    def finish() -> None:
        nonlocal current
        if current is None:
            return
        current["prompt"] = "\n".join(current.pop("promptParts")).strip()
        current["answer"] = "\n".join(current.pop("answerParts")).strip()
        current["questionMedia"] = list(dict.fromkeys(current["questionMedia"]))
        current["answerMedia"] = list(dict.fromkeys(current["answerMedia"]))
        records.append(current)
        current = None

    for paragraph in paragraphs:
        text = paragraph.text.strip()
        section = SECTION_RE.match(text)
        if section:
            question_type = section.group(1)
            continue

        match = QUESTION_RE.match(text)
        if match:
            number = int(match.group(1))
            expected = 1 if current is None and not records else (current["sourceNo"] + 1 if current else records[-1]["sourceNo"] + 1)
            if number == expected:
                finish()
                current = {
                    "id": f"{source_key}{number:03d}",
                    "source": source_key,
                    "sourceNo": number,
                    "type": question_type,
                    "promptParts": [match.group(2).strip()] if match.group(2).strip() else [],
                    "answerParts": [],
                    "questionMedia": list(paragraph.images),
                    "answerMedia": [],
                }
                stage = "prompt"
                continue

        if current is None:
            continue

        if text.startswith("【答案】"):
            stage = "answer"
            answer = text.removeprefix("【答案】").strip()
            if answer:
                current["answerParts"].append(answer)
            current["answerMedia"].extend(paragraph.images)
            continue
        if any(text.startswith(marker) for marker in ANSWER_MARKERS[1:]):
            stage = "explanation"
            continue

        if stage == "prompt":
            if text:
                current["promptParts"].append(text)
            current["questionMedia"].extend(paragraph.images)
        elif stage == "answer":
            if text:
                current["answerParts"].append(text)
            current["answerMedia"].extend(paragraph.images)

    finish()
    return records


def classify(record: dict) -> str:
    record_id = record["id"]
    text = record["prompt"]
    if record_id in CIRCLE_IDS:
        return "circle"
    if record_id in CONCEPT_IDS:
        return "concept"

    application_words = (
        "操场", "菜地", "草地", "草坪", "花坛", "花圃", "场地", "厨房", "房间", "新房",
        "地毯", "宾馆", "篱笆", "森林", "种黄瓜", "栽", "学校花园", "装修", "跑了", "跑两圈",
    )
    if any(word in text for word in application_words):
        return "application"

    transform_words = ("拼成", "拼组", "摆成", "剪成", "剪去", "剪下", "拉成", "框架", "铁丝", "撕", "重叠", "对折")
    if any(word in text for word in transform_words):
        return "transform"

    area_words = ("面积", "公顷", "平方米", "平方厘米", "平方分米")
    perimeter_words = ("周长", "走一圈", "沿着这个图形走一圈")
    composite_words = ("组合图形", "阴影", "涂色", "不规则", "方格", "小方格", "阶梯", "甲、乙", "甲乙", "比较", "最大", "最长")
    has_area = any(word in text for word in area_words)
    has_perimeter = any(word in text for word in perimeter_words)
    is_composite = any(word in text for word in composite_words)

    if has_area and is_composite:
        return "composite-area"
    if has_perimeter and is_composite:
        return "composite-perimeter"
    if has_area and has_perimeter:
        return "area"
    if has_area:
        return "area"
    if has_perimeter:
        return "perimeter"
    return "concept"


def split_prompt_and_choices(text: str, question_type: str) -> tuple[str, list[str]]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    if question_type != "选择题" or len(lines) < 2:
        return "<br>".join(html.escape(line) for line in lines), []

    choice_source = "\n".join(lines[1:]).replace("\t", "\n")
    matches = list(re.finditer(r"(?m)^\s*([A-D])[．.]\s*", choice_source))
    if not matches:
        return "<br>".join(html.escape(line) for line in lines), []

    prefix = choice_source[:matches[0].start()].strip()
    stem_lines = [lines[0]]
    if prefix:
        stem_lines.append(prefix)
    choices: list[str] = []
    for index, match in enumerate(matches):
        end = matches[index + 1].start() if index + 1 < len(matches) else len(choice_source)
        content = re.sub(r"\s+", " ", choice_source[match.end():end]).strip()
        if not content:
            content = "见配图"
        choices.append(f"{match.group(1)}．{content}")
    return "<br>".join(html.escape(line) for line in stem_lines), choices


def is_useful_browser_image(target: str, data: bytes) -> bool:
    if target.lower().endswith(".png") and data.startswith(b"\x89PNG\r\n\x1a\n") and len(data) >= 24:
        width, height = struct.unpack(">II", data[16:24])
        return width > 8 or height > 8
    return True


def build_bank(doc_a: Path, doc_b: Path, output_dir: Path) -> list[dict]:
    output_dir.mkdir(parents=True, exist_ok=True)
    assets_dir = output_dir / "assets"
    assets_dir.mkdir(parents=True, exist_ok=True)

    specs = [
        (doc_a, "A", "《2026年7月30日小学数学作业》"),
        (doc_b, "B", "《2026年7月30日小学数学作业-2》"),
    ]
    questions: list[dict] = []
    browser_formats = {".png", ".jpg", ".jpeg", ".gif", ".webp", ".svg"}

    for path, source_key, source_label in specs:
        records = extract_records(path, source_key)
        record_map = {record["id"]: record for record in records}
        _, media_data = read_docx(path)
        for record in records:
            if record["id"] in SHARED_MEDIA_FROM:
                record["questionMedia"] = list(record_map[SHARED_MEDIA_FROM[record["id"]]]["questionMedia"])
            record["prompt"] = PROMPT_OVERRIDES.get(record["id"], record["prompt"])
            record["answer"] = ANSWER_OVERRIDES.get(record["id"], record["answer"])
            prompt, choices = split_prompt_and_choices(record["prompt"], record["type"])
            question = {
                "id": record["id"],
                "source": source_key,
                "sourceLabel": source_label,
                "sourceNo": record["sourceNo"],
                "category": classify(record),
                "type": record["type"],
                "prompt": prompt,
                "answer": html.escape(record["answer"]).replace("\n", "<br>"),
            }
            if choices:
                question["choices"] = choices

            media_paths: list[str] = []
            for media_index, target in enumerate(record["questionMedia"], start=1):
                suffix = PurePosixPath(target).suffix.lower()
                if suffix not in browser_formats or target not in media_data or (record["id"], target) in MEDIA_TARGET_SKIPS:
                    continue
                if not is_useful_browser_image(target, media_data[target]):
                    continue
                name = f"{record['id'].lower()}-{media_index:02d}{suffix}"
                (assets_dir / name).write_bytes(media_data[target])
                media_paths.append(f"assets/{name}")
            if media_paths:
                question["media"] = media_paths
            questions.append(question)

    js = (
        "window.PERIMETER_AREA_CATEGORIES = "
        + json.dumps(CATEGORIES, ensure_ascii=False, indent=4)
        + ";\n\nwindow.PERIMETER_AREA_QUESTIONS = "
        + json.dumps(questions, ensure_ascii=False, indent=4)
        + ";\n"
    )
    (output_dir / "questions.js").write_text(js, encoding="utf-8")
    return questions


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("docx", type=Path, nargs="?")
    parser.add_argument("--source", default="A")
    parser.add_argument("--json", action="store_true")
    parser.add_argument("--build", type=Path, metavar="OUTPUT_DIR")
    parser.add_argument("--second-docx", type=Path)
    args = parser.parse_args()

    if args.build:
        if args.docx is None or args.second_docx is None:
            parser.error("--build requires docx and --second-docx")
        questions = build_bank(args.docx, args.second_docx, args.build)
        counts = {category["id"]: sum(q["category"] == category["id"] for q in questions) for category in CATEGORIES}
        print(f"built={len(questions)} counts={json.dumps(counts, ensure_ascii=False)}")
        return
    if args.docx is None:
        parser.error("docx is required")

    records = extract_records(args.docx, args.source)
    if args.json:
        print(json.dumps(records, ensure_ascii=False, indent=2))
        return

    print(f"records={len(records)} first={records[0]['id']} last={records[-1]['id']}")
    print(f"types={json.dumps({kind: sum(q['type'] == kind for q in records) for kind in sorted({q['type'] for q in records})}, ensure_ascii=False)}")
    print(f"blank_answers={[q['id'] for q in records if not q['answer']]}")
    print("questions_with_media:")
    for record in records:
        media = record["questionMedia"] + record["answerMedia"]
        if media:
            suffixes = [PurePosixPath(item).suffix.lower() for item in media]
            print(f"  {record['id']} {suffixes} {record['prompt'][:52]!r}")


if __name__ == "__main__":
    main()
