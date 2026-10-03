"""
Génère le CV de Samir Moghrabi en deux versions à partir du même contenu :

  - public/CV_Samir_Moghrabi.pdf   version web (publiée sur moghrabi.fr) : sans téléphone ni adresse
  - cv/CV_Samir_Moghrabi.pdf        version complète pour les candidatures (dossier ignoré par Git)

La version complète lit le téléphone et l'adresse dans scripts/cv/prive.json (ignoré par Git) :
    { "location": "Ville (code postal)", "phone": "06 00 00 00 00" }

Usage :  python scripts/cv/build_cv.py
Dépendances : pip install reportlab   (polices Calibri de Windows)
"""

import json
import re
from pathlib import Path

from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_RIGHT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (
    HRFlowable, KeepTogether, ListFlowable, ListItem, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle,
)

ROOT = Path(__file__).resolve().parents[2]
FONTS = Path("C:/Windows/Fonts")

# ─────────────────────────────── Contenu ───────────────────────────────

EMAIL = "samir@moghrabi.fr"
LINKS = [
    ("moghrabi.fr", "https://moghrabi.fr/"),
    ("linkedin.com/in/moghrabisamir", "https://www.linkedin.com/in/moghrabisamir/"),
    ("github.com/sasou-web", "https://github.com/sasou-web"),
]

PROFILE = (
    "Étudiant en Mastère Management et Conseil en SI à l’ESGI, je fais le lien entre la technique "
    "et le métier. Deux ans d’infogérance chez <b>Capgemini</b> (coordination de déploiements, reporting automatisé, "
    "support utilisateurs) et <b>quatre applications open source</b> conçues et publiées en autonomie. "
    "Je recherche une <b>alternance en gestion de projet SI</b>."
)

EXPERIENCES = [
    {
        "title": "Assistant chef de projet infogérance",
        "org": "Capgemini · Issy-les-Moulineaux",
        "dates": "2023 – 2025",
        "bullets": [
            "<b>Coordonner les déploiements</b> et assurer le support technique des utilisateurs finaux.",
            "<b>Automatiser les rapports de performance</b> en Excel VBA : génération et consolidation des données.",
            "Développer des macros (formules avancées, tableaux croisés dynamiques) pour le traitement des données.",
            "Participer à l’intégration des scripts VBA aux processus de livraison et de versionnement.",
        ],
    },
    {
        "title": "Développeur maintenance et automatisation",
        "org": "Mehad · Paris",
        "dates": "2022",
        "bullets": [
            "<b>Automatiser la maintenance</b> des serveurs et postes de travail en Python et Bash ; planifier les mises à jour et correctifs avec cron.",
            "Rédiger et versionner les procédures dans Git pour faciliter les restaurations et les retours arrière.",
            "Contribuer à l’intégration des outils de supervision Nagios et Zabbix avec les équipes support.",
        ],
    },
]

PROJECTS_INTRO = "Conçus, développés et publiés seul : cadrage, versions, intégration continue et documentation."
PROJECTS = [
    ("Mira", "C# / .NET 8, WPF, libmpv",
     "client Jellyfin natif pour Windows : lecteur intégré, synchronisation fiable, mises à jour signées ; 5 versions livrées en 3 jours."),
    ("Kyro", "Rust, Tauri 2, SvelteKit, SQLite",
     "médiathèque 100 % locale : version 1.0 publiée, 568 tests automatisés."),
    ("Qobee", "Rust, Tauri 2, Svelte 5",
     "lecteur audio haute fidélité : sortie bit-perfect WASAPI, égaliseur, ReplayGain."),
    ("XK Bot", "Node.js, discord.js",
     "bot Discord du serveur Xray Kaya : rangs via API, tournois, tickets, dashboard web."),
]

EDUCATION = [
    ("Mastère Management et Conseil en SI", "ESGI · Paris · entrée en Bac+4 en septembre 2026", "2026 – 2028"),
    ("Bachelor Management et Conseil en SI", "ESGI · Paris", "2024 – 2026"),
    ("DEUST Informatique (Bac+2)", "CNAM · Paris", "2021 – 2023"),
]

SKILLS = [
    ("Gestion de projet", "Coordination de déploiements, support utilisateurs, documentation, Jira, Trello"),
    ("Reporting & données", "Excel avancé (TCD, formules), VBA, consolidation de données"),
    ("Automatisation & systèmes", "Python, Bash, cron, Git, Linux ; supervision Nagios et Zabbix"),
    ("Développement", "C# / .NET, Rust, TypeScript, Svelte, Node.js"),
    ("IA appliquée", "Développement assisté par IA (Kiro), LLM en local (Qwen)"),
]

LANGUAGES = "Anglais B2 · Arabe littéraire B2"

# ─────────────────────────────── Mise en page ───────────────────────────────

INK = HexColor("#19252c")
TEAL = HexColor("#18576a")
GREY = HexColor("#52616b")
RULE = HexColor("#cfdde2")

pdfmetrics.registerFont(TTFont("Calibri", str(FONTS / "calibri.ttf")))
pdfmetrics.registerFont(TTFont("Calibri-Bold", str(FONTS / "calibrib.ttf")))
pdfmetrics.registerFont(TTFont("Calibri-Italic", str(FONTS / "calibrii.ttf")))
pdfmetrics.registerFontFamily("Calibri", normal="Calibri", bold="Calibri-Bold", italic="Calibri-Italic")

BODY = 9.9
S = {
    "name": ParagraphStyle("name", fontName="Calibri-Bold", fontSize=25, leading=28, textColor=INK),
    "role": ParagraphStyle("role", fontName="Calibri-Bold", fontSize=13.5, leading=17, textColor=TEAL),
    "meta": ParagraphStyle("meta", fontName="Calibri", fontSize=9.5, leading=12.5, textColor=GREY),
    "avail": ParagraphStyle("avail", fontName="Calibri", fontSize=9.5, leading=12.5, textColor=INK),
    "h": ParagraphStyle("h", fontName="Calibri-Bold", fontSize=10.5, leading=13, textColor=TEAL),
    "body": ParagraphStyle("body", fontName="Calibri", fontSize=BODY, leading=12.9, textColor=INK),
    "item": ParagraphStyle("item", fontName="Calibri-Bold", fontSize=10.3, leading=13, textColor=INK),
    "sub": ParagraphStyle("sub", fontName="Calibri", fontSize=9.2, leading=11.8, textColor=GREY),
    "date": ParagraphStyle("date", fontName="Calibri", fontSize=9.2, leading=13, textColor=GREY, alignment=TA_RIGHT),
    "bullet": ParagraphStyle("bullet", fontName="Calibri", fontSize=BODY, leading=12.7, textColor=INK),
    "key": ParagraphStyle("key", fontName="Calibri-Bold", fontSize=BODY, leading=12.9, textColor=INK),
}

PAGE_W, PAGE_H = A4
MARGIN_X = 17 * mm
FRAME_PADDING = 6  # marge intérieure par défaut du cadre de SimpleDocTemplate (de chaque côté)
CONTENT_W = PAGE_W - 2 * MARGIN_X - 2 * FRAME_PADDING
SEP = '<font color="#a7b4bb">   |   </font>'


def fr(text):
    """Typographie française : espace insécable avant « : », « ; » et « % »."""
    return re.sub(r" ([:;%])", "\u00a0\\1", text)


def P(text, style):
    return Paragraph(fr(text), style)


def section(title):
    return [
        Spacer(1, 12),
        P(title.upper(), S["h"]),
        HRFlowable(width="100%", thickness=0.6, color=RULE, spaceBefore=2, spaceAfter=5),
    ]


def heading_row(left, sub, dates):
    """Intitulé à gauche, dates à droite, ligne grise en dessous."""
    t = Table([[P(left, S["item"]), P(dates, S["date"])]], colWidths=[CONTENT_W - 32 * mm, 32 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "BOTTOM"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 0), ("TOPPADDING", (0, 0), (-1, -1), 0),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 0)]))
    return [t, P(sub, S["sub"])]


def bullets(items):
    return ListFlowable(
        [ListItem(P(b, S["bullet"]), leftIndent=11, value="•") for b in items],
        bulletType="bullet", bulletFontName="Calibri", bulletColor=TEAL, bulletFontSize=10, leftIndent=11, bulletOffsetY=0.5, spaceBefore=2,
    )


def key_value_table(rows, key_width):
    t = Table([[P(k, S["key"]), P(v, S["body"])] for k, v in rows], colWidths=[key_width, CONTENT_W - key_width])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 0),
                           ("RIGHTPADDING", (0, 0), (-1, -1), 4), ("TOPPADDING", (0, 0), (-1, -1), 1.2),
                           ("BOTTOMPADDING", (0, 0), (-1, -1), 1.2)]))
    return t


def build(path: Path, private: dict | None):
    story = []

    # En-tête
    story.append(P("SAMIR MOGHRABI", S["name"]))
    story.append(Spacer(1, 2))
    story.append(P("Assistant chef de projet SI · Alternance", S["role"]))
    story.append(Spacer(1, 4))
    contact = [private["location"], private["phone"]] if private else ["Paris, France"]
    contact.append(f'<a href="mailto:{EMAIL}" color="#18576a">{EMAIL}</a>')
    story.append(P(SEP.join(contact), S["meta"]))
    story.append(P(SEP.join(f'<a href="{url}" color="#18576a">{label}</a>' for label, url in LINKS), S["meta"]))
    story.append(Spacer(1, 5))
    story.append(P(
        "<b>Disponible dès maintenant</b> · alternance de 2 ans · rythme 3 semaines en entreprise / 1 semaine à l’école",
        S["avail"]))

    # Profil
    story += section("Profil")
    story.append(P(PROFILE, S["body"]))

    # Expérience
    story += section("Expérience professionnelle")
    for i, e in enumerate(EXPERIENCES):
        if i:
            story.append(Spacer(1, 7))
        story.append(KeepTogether(heading_row(e["title"], e["org"], e["dates"]) + [bullets(e["bullets"])]))

    # Projets
    story += section("Projets personnels · open source")
    story.append(P(PROJECTS_INTRO, S["sub"]))
    story.append(bullets([f"<b>{name}</b> <font color='#52616b'>({stack})</font> — {text}" for name, stack, text in PROJECTS]))

    # Formation
    story += section("Formation")
    for i, (title, sub, dates) in enumerate(EDUCATION):
        if i:
            story.append(Spacer(1, 5))
        story += heading_row(title, sub, dates)

    # Compétences
    story += section("Compétences")
    story.append(key_value_table(SKILLS, 44 * mm))

    # Langues
    story += section("Langues")
    story.append(P(LANGUAGES, S["body"]))

    doc = SimpleDocTemplate(
        str(path), pagesize=A4, leftMargin=MARGIN_X, rightMargin=MARGIN_X, topMargin=14 * mm, bottomMargin=12 * mm,
        title="CV - Samir Moghrabi - Alternance gestion de projet SI", author="Samir Moghrabi",
        subject="Candidature en alternance - Gestion de projet SI" + ("" if private else " (version web)"),
    )
    path.parent.mkdir(parents=True, exist_ok=True)
    doc.build(story)
    return doc.page


if __name__ == "__main__":
    web = ROOT / "public" / "CV_Samir_Moghrabi.pdf"
    pages = build(web, None)
    print(f"version web      : {web.relative_to(ROOT)} ({pages} page)")

    prive = Path(__file__).with_name("prive.json")
    if prive.exists():
        full = ROOT / "cv" / "CV_Samir_Moghrabi.pdf"
        pages = build(full, json.loads(prive.read_text(encoding="utf-8")))
        print(f"version complète : {full.relative_to(ROOT)} ({pages} page)")
    else:
        print("prive.json absent : version complète non générée")
