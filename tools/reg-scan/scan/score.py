"""Score items for signal relevance.

Scores are not normalised to any fixed range - they are used only for
relative ranking within an edition. A score >= MATERIAL_THRESHOLD is
considered a material signal for KPI purposes.
"""

_TIER_WEIGHTS = {
    "primary": 1.0,
    "specialist": 0.75,
    "press": 0.55,
}

_TYPE_WEIGHTS = {
    "consultation": 1.30,
    "final-rule":   1.40,
    "enforcement":  1.20,
    "guidance":     1.10,
    "other":        0.80,
}

MATERIAL_THRESHOLD = 0.85

# Maximum number of top-scored signals to include in the edition output
MAX_SIGNALS = 15


def score(item, source):
    """Compute a float relevance score for item from source."""
    tier_w = _TIER_WEIGHTS.get(source.get("tier", "press"), 0.55)
    type_w = _TYPE_WEIGHTS.get(item.get("signal_type", "other"), 0.80)
    # Small bonus for cross-cutting items (more risk areas = more relevant)
    area_bonus = 0.05 * min(len(item.get("risk_areas", [])), 3)
    return round(tier_w * type_w + area_bonus, 3)


def is_material(item):
    return item.get("score", 0) >= MATERIAL_THRESHOLD
