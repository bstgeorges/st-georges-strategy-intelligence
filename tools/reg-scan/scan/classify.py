"""Signal-type and risk-area classification using keyword patterns.

All patterns are intentionally simple regexes - no NLP, no LLM calls.
The same logic runs in CI without network access.
"""
import re

# Signal-type classification - evaluated in order; first match wins.
_TYPE_RULES = [
    (
        "consultation",
        re.compile(
            r"\b(consult(?!ative)(?:s|ed|ing|ation|ations)?|discussion paper|call for evidence|call for input"
            r"|DP\s*\d|CP\s*\d|responses?\s+by|feedback\s+requested"
            r"|invite[sd]?\s+comment|comment\s+period|consulta p.blica|consulta ao mercado"
            r"|appel . contributions|consultation publique|consulta p.blica|documento a consulta"
            r"|征求意见|公開徵求意見|Konsultation|Stellungnahmeverfahren)",
            re.I,
        ),
    ),
    (
        "final-rule",
        re.compile(
            r"\b(final rule|final standard|final guideline|final report"
            r"|implementing technical standard|regulatory technical standard"
            r"|\bITS\b|\bRTS\b|delegated act|delegated regulation|directive|in force"
            r"|enters? into force|entry into force|adopted|published final"
            r"|binding technical|r.glement|r.solution|instru..o normativa"
            r"|norma definitiva|texto definitivo|texte d.finitif|real decreto|reglamento"
            r"|disposiciones de car.cter general|delibera|regolamento|正式发布"
            r"|Allgemeinverf.gung|tritt in Kraft|Regelwerk)\b",
            re.I,
        ),
    ),
    (
        "enforcement",
        re.compile(
            r"\b(fine[sd]?|penalt|enforcement action|sanction[sd]?"
            r"|banned|prohibition|action against|liable|breach|failure"
            r"|misconduct|disciplinar|prohibition order|public censure|multa|san..o"
            r"|atividade sancionadora|d.cision de sanction|sanci.n|multa|处罚"
            r"|sanzion|abusivismo|oscuramento"
            r"|Bu.geld|verwarnt|Sanktion)\b",
            re.I,
        ),
    ),
    (
        "guidance",
        re.compile(
            r"\b(guidance|guidelines?|supervisory expectation|dear\s+ceo"
            r"|letter to firms|thematic review|feedback statement"
            r"|recommendation|principles for|supervisory statement|SS\s*\d"
            r"|expectations for firms|supervisory approach|orienta..o|of.cio circular"
            r"|doctrine|position-recommandation|criterio|orientaci.n|richiamo di attenzione|指引|指导意见)\b",
            re.I,
        ),
    ),
]

_NON_LATIN_TYPE_RULES = [
    ("consultation", re.compile(r"征求意见|公開徵求意見")),
    ("final-rule", re.compile(r"正式发布|正式發佈|条例|條例")),
    ("enforcement", re.compile(r"处罚|處罰|罚款|罰款")),
    ("guidance", re.compile(r"指导意见|指導意見|指引")),
]

# Risk-area classification - multiple areas per item are allowed.
RISK_AREA_PATTERNS = {
    "balance-sheet": re.compile(
        r"\b(capital|liquidity|leverage|solvency|ICAAP|ILAAP|stress[- ]test"
        r"|buffer|CRR|CRD|Basel|TLAC|MREL|DFAST|SIFI|LCR|NSFR|credit risk"
        r"|prudential|minimum requirement|capital regulat.rio|capitalizaci.n|liquidez|solv.ncia)\b",
        re.I,
    ),
    "market-plumbing": re.compile(
        r"\b(clearing|settlement|CCP|derivative|repo|margin|collateral"
        r"|MiFID|EMIR|benchmark|LIBOR|SOFR|market abuse|MAR|short selling"
        r"|securitisation|covered bond|mercado de capitais|mercado de valores|mercati finanziari|march.s financiers)\b",
        re.I,
    ),
    "customer-outcomes": re.compile(
        r"\b(consumer|retail|customer|disclosure|TCF|consumer duty"
        r"|suitability|vulnerable|complaint|redress|mis.?sell|conduct risk"
        r"|product governance|value assessment|fair treatment|investidor|consumidor|.pargnant)\b",
        re.I,
    ),
    "crime-and-sanctions": re.compile(
        r"\b(AML|KYC|CFT|sanction[sd]?|money launder|financial crime"
        r"|FinCEN|OFAC|OFSI|FATF|fraud|suspicious activity|proliferation"
        r"|crypto.asset|digital asset|illicit|antilavado|lavado de dinero|abusivismo)\b",
        re.I,
    ),
    "digital-resilience": re.compile(
        r"\b(cyber|DORA|outsourc|third.party risk|cloud|ICT|incident|NCSC|CISA"
        r"|data breach|ransomware|supply chain|critical infrastructure|network security"
        r"|vulnerability|patch|operational resilience|business continuity|recovery|resolution"
        r"|BRRD|NCWO|bail.in|operational risk|scenario testing|impact tolerance"
        r"|important business service)\b",
        re.I,
    ),
    "ai-and-models": re.compile(
        r"\b(artificial intelligence|machine learning|model risk|algorithmic"
        r"|large language model|LLM|foundation model|AI governance|AI risk"
        r"|automation|generative AI|GenAI|AI Act|EU AI Act|responsible AI)\b",
        re.I,
    ),
}


def classify_type(text: str) -> str:
    """Return the first matching signal type for text, or 'other'."""
    for sig_type, rx in _NON_LATIN_TYPE_RULES:
        if rx.search(text):
            return sig_type
    for sig_type, rx in _TYPE_RULES:
        if rx.search(text):
            return sig_type
    return "other"


def classify_risk_areas(text: str) -> list:
    """Return all matching publication-contract risk areas for text."""
    areas = [area for area, rx in RISK_AREA_PATTERNS.items() if rx.search(text)]
    return areas
