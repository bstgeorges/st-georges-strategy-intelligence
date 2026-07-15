"""Unit tests for reg-scan.

Run from the tools/reg-scan/ directory:
    python tests/test_units.py

All tests are stdlib-only (no pytest required).
"""
import os
import sys
import tempfile
import unittest
from datetime import datetime, timezone

# Add tools/reg-scan/ to sys.path so `import scan` resolves
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


class TestDeadlines(unittest.TestCase):
    def setUp(self):
        from scan.deadlines import extract_deadline, annotate, band, horizon
        self.extract = extract_deadline
        self.annotate = annotate
        self.band = band
        self.horizon = horizon

    def test_extract_deadline_finds_cued_date(self):
        text = "The consultation closes on 15 September 2026 and responses must be submitted."
        published = "2026-07-01T00:00:00+00:00"
        result = self.extract(text, published)
        self.assertEqual(result, "2026-09-15")

    def test_extract_deadline_ignores_uncued_date(self):
        text = "The report was published on 15 September 2026."
        published = "2026-07-01T00:00:00+00:00"
        result = self.extract(text, published)
        self.assertIsNone(result)

    def test_extract_deadline_none_on_empty(self):
        self.assertIsNone(self.extract("", "2026-07-01T00:00:00+00:00"))
        self.assertIsNone(self.extract("closes 12 March 2025", None))

    def test_extract_deadline_past_date_ignored(self):
        text = "The deadline was 1 January 2020 for responses."
        published = "2026-07-01T00:00:00+00:00"
        self.assertIsNone(self.extract(text, published))

    def test_annotate_attaches_deadline(self):
        records = [
            {
                "title": "Consultation closes 30 November 2026",
                "summary": "Please submit feedback before the deadline.",
                "published_at": "2026-07-01T00:00:00+00:00",
            }
        ]
        self.annotate(records)
        self.assertEqual(records[0]["deadline"], "2026-11-30")

    def test_band_boundaries(self):
        self.assertEqual(self.band(0), "0-30")
        self.assertEqual(self.band(30), "0-30")
        self.assertEqual(self.band(31), "31-60")
        self.assertEqual(self.band(60), "31-60")
        self.assertEqual(self.band(61), "61-90")
        self.assertEqual(self.band(90), "61-90")
        self.assertEqual(self.band(91), "90+")

    def test_horizon_filters_past_deadlines(self):
        today = datetime(2026, 7, 14, tzinfo=timezone.utc)
        records = [
            {"deadline": "2026-06-01", "url": "https://a.example/1", "title": "Old", "signal_type": "other"},
            {"deadline": "2026-08-01", "url": "https://a.example/2", "title": "Future", "signal_type": "other"},
        ]
        result = self.horizon(records, today)
        self.assertEqual(len(result), 1)
        self.assertEqual(result[0]["deadline"], "2026-08-01")


class TestClassify(unittest.TestCase):
    def setUp(self):
        from scan.classify import classify_type, classify_risk_areas
        self.classify_type = classify_type
        self.classify_risk_areas = classify_risk_areas

    def test_type_consultation(self):
        self.assertEqual(self.classify_type("EBA consults on new guidelines"), "consultation")

    def test_type_final_rule(self):
        self.assertEqual(self.classify_type("Commission adopts final rule on DORA"), "final-rule")

    def test_type_enforcement(self):
        self.assertEqual(self.classify_type("FCA fines bank for misconduct"), "enforcement")

    def test_type_guidance(self):
        self.assertEqual(self.classify_type("PRA issues supervisory statement on model risk"), "guidance")

    def test_type_other(self):
        self.assertEqual(self.classify_type("Annual general meeting results announced"), "other")

    def test_risk_area_balance_sheet(self):
        areas = self.classify_risk_areas("New capital requirements under Basel III")
        self.assertIn("balance-sheet", areas)

    def test_risk_area_crime(self):
        areas = self.classify_risk_areas("FATF updates AML guidance for financial institutions")
        self.assertIn("crime-and-sanctions", areas)

    def test_risk_area_ai(self):
        areas = self.classify_risk_areas("EU AI Act implementing rules for large language models")
        self.assertIn("ai-governance", areas)

    def test_risk_area_default(self):
        areas = self.classify_risk_areas("Quarterly newsletter from a regulator")
        self.assertEqual(areas, ["other"])

    def test_multiple_risk_areas(self):
        areas = self.classify_risk_areas(
            "Cyber incident disclosure requirements under DORA and AML implications"
        )
        self.assertIn("digital-resilience", areas)
        self.assertIn("crime-and-sanctions", areas)


class TestScore(unittest.TestCase):
    def setUp(self):
        from scan.score import score, is_material, MATERIAL_THRESHOLD
        self.score = score
        self.is_material = is_material
        self.threshold = MATERIAL_THRESHOLD

    def test_primary_consultation_is_material(self):
        item = {"signal_type": "consultation", "risk_areas": ["balance-sheet"]}
        source = {"tier": "primary"}
        s = self.score(item, source)
        self.assertGreaterEqual(s, self.threshold)

    def test_press_other_is_not_material(self):
        item = {"signal_type": "other", "risk_areas": []}
        source = {"tier": "press"}
        s = self.score(item, source)
        self.assertLess(s, self.threshold)

    def test_score_is_float(self):
        item = {"signal_type": "guidance", "risk_areas": ["market-plumbing"]}
        source = {"tier": "specialist"}
        self.assertIsInstance(self.score(item, source), float)


class TestDb(unittest.TestCase):
    def test_url_hash_is_deterministic(self):
        from scan.db import url_hash
        self.assertEqual(url_hash("https://example.com"), url_hash("https://example.com"))

    def test_url_hash_differs(self):
        from scan.db import url_hash
        self.assertNotEqual(url_hash("https://a.com"), url_hash("https://b.com"))

    def test_connect_and_upsert(self):
        from scan.db import connect, upsert_items, seen_urls
        with tempfile.TemporaryDirectory() as tmpdir:
            import pathlib
            db_path = pathlib.Path(tmpdir) / "test.db"
            conn = connect(db_path)
            items = [
                {
                    "url": "https://example.com/1",
                    "source_id": "test-source",
                    "title": "Test item",
                    "summary": "A summary",
                    "published_at": "2026-07-01T00:00:00+00:00",
                    "signal_type": "consultation",
                    "risk_areas": ["balance-sheet"],
                    "score": 1.3,
                    "deadline": None,
                }
            ]
            upsert_items(conn, items)
            urls = seen_urls(conn, "test-source")
            self.assertIn("https://example.com/1", urls)

    def test_upsert_idempotent(self):
        from scan.db import connect, upsert_items, seen_urls
        with tempfile.TemporaryDirectory() as tmpdir:
            import pathlib
            db_path = pathlib.Path(tmpdir) / "test.db"
            conn = connect(db_path)
            item = {
                "url": "https://example.com/dup",
                "source_id": "src",
                "title": "Dup",
                "summary": "",
                "published_at": None,
                "signal_type": "other",
                "risk_areas": [],
                "score": 0.5,
                "deadline": None,
            }
            upsert_items(conn, [item])
            upsert_items(conn, [item])
            urls = seen_urls(conn, "src")
            self.assertEqual(len(urls), 1)


class TestWriter(unittest.TestCase):
    def test_write_json_roundtrip(self):
        import tempfile, json, pathlib
        from scan.writer import write_json
        data = {"edition": "2026-07-14", "signals": []}
        with tempfile.TemporaryDirectory() as tmpdir:
            path = pathlib.Path(tmpdir) / "out.json"
            write_json(data, path)
            loaded = json.loads(path.read_text())
        self.assertEqual(loaded["edition"], "2026-07-14")

    def test_write_feed_xml_produces_rss(self):
        import tempfile, pathlib
        from scan.writer import write_feed_xml
        from datetime import datetime, timezone
        signals = [
            {
                "source_id": "eba",
                "title": "EBA consults",
                "url": "https://eba.eu/item",
                "published_at": "2026-07-01T00:00:00+00:00",
                "signal_type": "consultation",
            }
        ]
        sources_by_id = {"eba": {"name": "EBA", "tier": "primary"}}
        gen = datetime(2026, 7, 14, 6, 0, tzinfo=timezone.utc)
        with tempfile.TemporaryDirectory() as tmpdir:
            path = pathlib.Path(tmpdir) / "feed.xml"
            write_feed_xml(signals, sources_by_id, path, gen)
            xml = path.read_text()
        self.assertIn("<rss", xml)
        self.assertIn("EBA consults", xml)

    def test_write_html_produces_table(self):
        import tempfile, pathlib
        from scan.writer import write_html
        data = {
            "edition": "2026-07-14",
            "generatedAt": "2026-07-14 06:00 UTC",
            "bottomLine": "Test bottom line.",
            "signals": [
                {
                    "date": "2026-07-14",
                    "title": "Test signal",
                    "url": "https://example.com",
                    "source": "EBA",
                    "type": "consultation",
                    "score": 1.3,
                }
            ],
            "horizon": [],
        }
        with tempfile.TemporaryDirectory() as tmpdir:
            path = pathlib.Path(tmpdir) / "index.html"
            write_html(data, path)
            html = path.read_text()
        self.assertIn("Test signal", html)
        self.assertIn("<table", html)


if __name__ == "__main__":
    unittest.main(verbosity=2)
