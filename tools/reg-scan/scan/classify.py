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
            r"\b(consult\w*|discussion paper|call for evidence|call for input"
            r"|DP\s*\d|CP\s*\d|responses?\s+by|feedback\s+requested"
            r"|invite[sd]?\s+comment|comment\s+period)\b",
            re.I,
        ),
    ),
    (
        "final-rule",
        re.compile(
            r"\b(final rule|final standard|final guideline|final report"
            r"|implementing technical standard|regulatory technical standard"
            r"|ITS|RTS|delegated act|delegated regulation|directive|in force"
            r"|enters? into force|entry into force|adopted|published final"
            r"|binding technical)\b",
            re.I,
        ),
    ),
    (
        "enforcement",
        re.compile(
            r"\b(fine[sd]?|penalt|enforcement action|sanction[sd]?"
            r"|banned|prohibition|action against|liable|breach|failure"
            r"|misconduct|disciplinar|prohibition order|public censure)\b",
            re.I,
        ),
    ),
    (
        "guidance",
        re.compile(
            r"\b(guidance|guidelines?|supervisory expectation|dear\s+ceo"
            r"|letter to firms|thematic review|feedback statement"
            r"|recommendation|principles for|supervisory statement|SS\s*\d"
            r"|expectations for firms|supervisory approach)\b",
            re.I,
        ),
    ),
]

# Risk-area classification - multiple areas per item are allowed.
RISK_AREA_PATTERNS = {
    "balance-sheet": re.compile(
        r"\b(capital|liquidity|leverage|solvency|ICAAP|ILAAP|stress[- ]test"
        r"|buffer|CRR|CRD|Basel|TLAC|MREL|DFAST|SIFI|LCR|NSFR|credit risk"
        r"|prudential|minimum requirement)\b",
        re.I,
    ),
    "market-plumbing": re.compile(
        r"\b(clearing|settlement|CCP|derivative|repo|margin|collateral"
        r"|MiFID|EMIR|benchmark|LIBOR|SOFR|market abuse|MAR|short selling"
        r"|securitisation|covered bond)\b",
        re.I,
    ),
    "customer-outcomes": re.compile(
        r"\b(consumer|retail|customer|disclosure|TCF|consumer duty"
        r"|suitability|vulnerable|complaint|redress|mis.?sell|conduct risk"
        r"|product governance|value assessment|fair treatment)\b",
        re.I,
    ),
    "crime-and-sanctions": re.compile(
        r"\b(AML|KYC|CFT|sanction[sd]?|money launder|financial crime"
        r"|FinCEN|OFAC|OFSI|FATF|fraud|suspicious activity|proliferation"
        r"|crypto.asset|digital asset|illicit)\b",
        re.I,
    ),
    "digital-resilience": re.compile(
        r"\b(cyber|DORA|operational resilience|outsourc|third.party risk"
        r"|cloud|ICT|incident|NCSC|CISA|data breach|ransomware|supply chain"
        r"|critical infrastructure|network security|vulnerability|patch)\b",
        re.I,
    ),
    "operational-resilience": re.compile(
        r"\b(operational resilience|business continuity|recovery|resolution"
        r"|BRRD|NCWO|bail.in|operational risk|scenario testing|impact tolerance"
        r"|important business service)\b",
        re.I,
    ),
    "ai-governance": re.compile(
        r"\b(artificial intelligence|machine learning|model risk|algorithmic"
        r"|large language model|LLM|foundation model|AI governance|AI risk"
        r"|automation|generative AI|GenAI|AI Act|EU AI Act|responsible AI)\b",
        re.I,
    ),
    "regulatory-horizon": re.compile(
        r"\b(regulatory initiative|implementation timeline|deadline|horizon"
        r"|future policy|upcoming|proposed rule|consultation period"
        r"|regulatory change|policy statement)\b",
        re.I,
    ),
}


def classify_type(text: str) -> str:
    """Return the first matching signal type for text, or 'other'."""
    for sig_type, rx in _TYPE_RULES:
        if rx.search(text):
            return sig_type
    return "other"


def classify_risk_areas(text: str) -> list:
    """Return all matching risk areas for text; defaults to ['other']."""
    areas = [area for area, rx in RISK_AREA_PATTERNS.items() if rx.search(text)]
    return areas if areas else ["other"]
