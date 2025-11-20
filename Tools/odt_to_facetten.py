from odf.opendocument import load
from odf.text import P
import os

# === EINSTELLUNGEN ===
ODT_DIR = r"D:\Matize\Matize-Kreation\Matize-Musik\Texte\Facetten"
OUT_TS = r"D:\Matize\Matize-Kreation\Matize-Musik\src\data\facettenLyrics.ts"


def paragraph_to_text(p):
    """
    Holt den kompletten sichtbaren Text eines <text:p>-Elements.
    Manche Absätze haben mehrere Child-Nodes (Spans, Formatierungen usw.),
    darum müssen wir alle zusammenfügen.
    """
    parts = []
    for node in p.childNodes:
        # einfache Textknoten
        if hasattr(node, "data"):
            parts.append(node.data)
        # manche Elemente haben wiederum childNodes
        elif hasattr(node, "childNodes"):
            for inner in node.childNodes:
                if hasattr(inner, "data"):
                    parts.append(inner.data)
    text = "".join(parts).strip()
    return text


def read_odt_text(path):
    """Liest sauberen Text aus einer .odt-Datei (Zeile pro Absatz)"""
    doc = load(path)
    paras = []
    for p in doc.getElementsByType(P):
        text = paragraph_to_text(p)
        if text:
            paras.append(text)
    # echte Zeilenumbrüche behalten
    return "\n".join(paras)


def make_block(id_name, text):
    """
    Baut den TS-Eintrag für einen Track.
    Wir nehmen erstmal einen einzigen Block (id: "full").
    start/end kannst du später per Hand oder Script feiner machen.
    """
    return f"""{id_name}: [
    {{
        id: "full",
        start: 0,
        end: 999,
        text: `{text}`
    }}
],"""


def main():
    entries = []

    if not os.path.isdir(ODT_DIR):
        raise SystemExit(f"❌ Ordner nicht gefunden: {ODT_DIR}")

    for fname in os.listdir(ODT_DIR):
        if not fname.lower().endswith(".odt"):
            continue

        full_path = os.path.join(ODT_DIR, fname)
        base = os.path.splitext(fname)[0].lower()  # z.B. "01-spotlight_an"
        print(f"… lese {fname}")

        text = read_odt_text(full_path)
        # optional: Präfix-Zahlen entfernen, damit der Key genau wie in songs.json ist
        # z.B. "01-spotlight_an" -> "spotlight_an"
        key = base
        if "-" in base:
            # nur das ab dem ersten "-" nehmen
            key = base.split("-", 1)[1]

        entries.append(make_block(key, text))
        print(f"✔ {fname} → key: {key}")

    content = (
        "// automatisch generiert aus .odt-Dateien\n\n"
        "export type FacettenTextBlock = { id: string; start: number; end: number; text: string; };\n"
        "export type FacettenLyricsMap = Record<string, FacettenTextBlock[]>;\n\n"
        "export const FACETTEN_LYRICS: FacettenLyricsMap = {\n"
        + "\n\n".join(entries)
        + "\n};\n"
    )

    os.makedirs(os.path.dirname(OUT_TS), exist_ok=True)
    with open(OUT_TS, "w", encoding="utf-8") as f:
        f.write(content)

    print(f"\n✅ Export abgeschlossen → {OUT_TS}")


if __name__ == "__main__":
    main()
