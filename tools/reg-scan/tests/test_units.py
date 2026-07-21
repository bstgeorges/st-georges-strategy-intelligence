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

    def test_consultative_group_is_not_a_consultation(self):
        self.assertEqual(self.classify_type("Regional Consultative Group meets in Mauritius"), "other")

    def test_type_final_rule(self):
        self.assertEqual(self.classify_type("Commission adopts final rule on DORA"), "final-rule")

    def test_type_enforcement(self):
        self.assertEqual(self.classify_type("FCA fines bank for misconduct"), "enforcement")

    def test_type_guidance(self):
        self.assertEqual(self.classify_type("PRA issues supervisory statement on model risk"), "guidance")

    def test_type_other(self):
        self.assertEqual(self.classify_type("Annual general meeting results announced"), "other")

    def test_research_benchmark_is_not_a_final_rule(self):
        self.assertEqual(self.classify_type("Production benchmark for LLM agents"), "other")

    def test_risk_area_balance_sheet(self):
        areas = self.classify_risk_areas("New capital requirements under Basel III")
        self.assertIn("balance-sheet", areas)

    def test_risk_area_crime(self):
        areas = self.classify_risk_areas("FATF updates AML guidance for financial institutions")
        self.assertIn("crime-and-sanctions", areas)

    def test_risk_area_ai(self):
        areas = self.classify_risk_areas("EU AI Act implementing rules for large language models")
        self.assertIn("ai-and-models", areas)

    def test_risk_area_default(self):
        areas = self.classify_risk_areas("Quarterly newsletter from a regulator")
        self.assertEqual(areas, [])

    def test_risk_areas_match_publication_contract(self):
        allowed = {"balance-sheet", "customer-outcomes", "crime-and-sanctions", "digital-resilience", "ai-and-models", "market-plumbing"}
        self.assertTrue(set(self.classify_risk_areas("AI cyber resilience and capital rules")).issubset(allowed))

    def test_multiple_risk_areas(self):
        areas = self.classify_risk_areas(
            "Cyber incident disclosure requirements under DORA and AML implications"
        )
        self.assertIn("digital-resilience", areas)
        self.assertIn("crime-and-sanctions", areas)

    def test_portuguese_and_french_instrument_classification(self):
        self.assertEqual(self.classify_type("CVM abre consulta pública sobre nova resolução"), "consultation")
        self.assertEqual(self.classify_type("AMF publie une décision de sanction"), "enforcement")
        self.assertIn("customer-outcomes", self.classify_risk_areas("orientação para proteção do consumidor e investidor"))

    def test_spanish_and_chinese_instrument_classification(self):
        self.assertEqual(self.classify_type("CNMV publica documento a consulta sobre el mercado"), "consultation")
        self.assertEqual(self.classify_type("关于规则公开征求意见的通知"), "consultation")

    def test_japanese_fatf_instrument_classification(self):
        text = "FATFによる市中協議文書「FATF改訂勧告16ガイダンス案」の公表について"
        self.assertEqual(self.classify_type(text), "consultation")
        self.assertIn("crime-and-sanctions", self.classify_risk_areas(text))

    def test_german_instrument_classification(self):
        self.assertEqual(self.classify_type("BaFin eröffnet Konsultation zur MaRisk-Novelle"), "consultation")
        self.assertEqual(self.classify_type("BaFin setzt Bußgeld gegen Institut fest"), "enforcement")


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

    def test_primary_other_without_evidence_is_not_material(self):
        item = {"signal_type": "other", "risk_areas": []}
        self.assertFalse(self.is_material({"score": self.score(item, {"tier": "primary"})}))


class TestFetch(unittest.TestCase):
    def test_canonicalize_url_removes_tracking_and_fragment(self):
        from scan.utils import canonicalize_url
        self.assertEqual(canonicalize_url("https://EXAMPLE.com/item/?utm_source=x&id=4#part"), "https://example.com/item?id=4")

    def test_infer_date_from_official_url(self):
        from scan.utils import infer_date_from_url
        self.assertEqual(infer_date_from_url("https://www.fsa.go.jp/news/20260717/item.html"), "2026-07-17T00:00:00+00:00")
        self.assertIsNone(infer_date_from_url("https://example.com/20261340/item"))

    def test_source_filter_excludes_noise_and_keeps_regulatory_items(self):
        from scan.fetch import passes_source_filter
        from scan.feeds import SOURCE_FILTERS
        self.assertFalse(passes_source_filter("hkma", "Tender for office furniture", filters=SOURCE_FILTERS))
        self.assertFalse(passes_source_filter("apra", "APRA publishes its annual report", filters=SOURCE_FILTERS))
        self.assertTrue(passes_source_filter("apra", "APRA consults on prudential reporting standards", filters=SOURCE_FILTERS))

    def test_nonstandard_official_feed_date_is_parsed(self):
        from scan.fetch import _parse_date
        entry = type("Entry", (), {"published": "17 Jul, 2026 +0530"})()
        self.assertEqual(_parse_date(entry), "2026-07-16T18:30:00+00:00")

    def test_spanish_and_italian_page_dates_are_parsed(self):
        from bs4 import BeautifulSoup
        from scan.fetch import _parse_page_date
        spanish = BeautifulSoup("<span>17 de junio de 2026 Fecha de publicación</span>", "html.parser").span
        italian = BeautifulSoup("<span>10 luglio 2026</span>", "html.parser").span
        self.assertEqual(_parse_page_date(spanish), "2026-06-17T00:00:00+00:00")
        self.assertEqual(_parse_page_date(italian), "2026-07-10T00:00:00+00:00")

    def test_mas_published_date_label_is_parsed(self):
        from bs4 import BeautifulSoup
        from scan.fetch import _parse_page_date
        node = BeautifulSoup("<span>Published Date: 25 May 2026</span>", "html.parser").span
        self.assertEqual(_parse_page_date(node), "2026-05-25T00:00:00+00:00")

    def test_japanese_reiwa_page_dates_are_parsed(self):
        from bs4 import BeautifulSoup
        from scan.fetch import _parse_page_date
        node = BeautifulSoup("<a>令和８年６月25日　FATFによる市中協議文書</a>", "html.parser").a
        self.assertEqual(_parse_page_date(node), "2026-06-25T00:00:00+00:00")

    def test_page_adapter_reports_anti_bot_block(self):
        from unittest.mock import patch
        from scan.fetch import fetch_page_source
        html = b"<html><title>Challenge Validation</title><body>Please solve this CAPTCHA</body></html>"
        response = type("Response", (), {"content": html, "text": html.decode("utf-8")})()
        config = [{
            "url": "https://www.gob.mx/cnbv/archivo/prensa?idiom=es-MX",
            "item_selectors": ["article"],
            "link_selectors": ["a[href]"],
            "date_selectors": ["time[datetime]"],
        }]
        source = {"id": "mexico-cnbv", "name": "CNBV"}
        with patch("scan.fetch._get", return_value=response):
            items, error = fetch_page_source(source, config, {})
        self.assertEqual(items, [])
        self.assertIn("blocked by anti-bot challenge", error)

    def test_page_adapter_treats_maintenance_shell_as_blocked(self):
        from unittest.mock import patch
        from scan.fetch import fetch_page_source
        html = b"<html><head><title>Maintenance</title></head><body>Back to Home</body></html>"
        response = type("Response", (), {"content": html, "text": html.decode("utf-8")})()
        config = [{
            "url": "https://www.mas.gov.sg/publications/consultations",
            "item_selectors": ["article"],
            "link_selectors": ["a[href]"],
            "date_selectors": ["time[datetime]"],
        }]
        source = {"id": "mas", "name": "MAS"}
        with patch("scan.fetch._get", return_value=response):
            items, error = fetch_page_source(source, config, {})
        self.assertEqual(items, [])
        self.assertIn("blocked by anti-bot challenge", error)

    def test_browser_request_profile_uses_browser_user_agent(self):
        from unittest.mock import Mock, patch
        from scan.fetch import _get

        response = Mock()
        response.raise_for_status.return_value = None
        with patch("scan.fetch.requests.get", return_value=response) as request:
            _get("https://www.mas.gov.sg/sitemap.xml", {"request_profile": "browser"})
        headers = request.call_args.kwargs["headers"]
        self.assertIn("Mozilla/5.0", headers["User-Agent"])

    def test_page_adapter_extracts_only_dated_filtered_official_entries(self):
        from unittest.mock import patch
        from scan.fetch import fetch_page_source
        from scan.feeds import SOURCE_FILTERS

        html = b"""
        <div class='views-row'><h3><a href='/consultation'>APRA consults on prudential reporting standards</a></h3>
          <time datetime='2026-07-10'>10 July 2026</time><p>Responses invited.</p></div>
        <div class='views-row'><h3><a href='/annual-report'>APRA publishes its annual report</a></h3>
          <time datetime='2026-07-09'>9 July 2026</time></div>
        <div class='views-row'><h3><a href='/undated'>APRA issues guidance</a></h3></div>
        """
        response = type("Response", (), {"content": html})()
        config = [{
            "url": "https://www.apra.gov.au/news-and-publications?page=0",
            "item_selectors": [".views-row"],
            "link_selectors": ["h3 a[href]"],
            "date_selectors": ["time[datetime]"],
        }]
        source = {"id": "apra", "name": "APRA"}
        with patch("scan.fetch._get", return_value=response):
            items, error = fetch_page_source(source, config, SOURCE_FILTERS)
        self.assertIsNone(error)
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["url"], "https://www.apra.gov.au/consultation")
        self.assertEqual(items[0]["published_at"], "2026-07-10T00:00:00+00:00")

    def test_page_adapter_extracts_japan_fsa_fatf_items(self):
        from unittest.mock import patch
        from scan.fetch import fetch_page_source
        from scan.feeds import SOURCE_FILTERS

        html = """
        <article id="content">
          <ul>
            <li><a href="/inter/fatf/20260624/20260626.html">令和８年６月25日　FATFによる市中協議文書「FATF改訂勧告16ガイダンス案」の公表について</a></li>
            <li><a href="/inter/etc/20240628/20240628.html">令和６年６月28日　羽渕国際資金洗浄対策室長の政策企画部会共同議長再任について</a></li>
          </ul>
        </article>
        """.encode("utf-8")
        response = type("Response", (), {"content": html, "text": html.decode("utf-8")})()
        config = [{
            "url": "https://www.fsa.go.jp/inter/fatf/fatf_menu.html",
            "item_selectors": ["article#content ul li"],
            "link_selectors": ["a[href]"],
            "title_selector": "a[href]",
            "date_selectors": ["a[href]"],
        }]
        source = {"id": "fatf", "name": "Financial Action Task Force"}
        with patch("scan.fetch._get", return_value=response):
            items, error = fetch_page_source(source, config, SOURCE_FILTERS)
        self.assertIsNone(error)
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["published_at"], "2026-06-25T00:00:00+00:00")
        self.assertEqual(items[0]["url"], "https://www.fsa.go.jp/inter/fatf/20260624/20260626.html")

    def test_page_adapter_extracts_saudi_sharepoint_cards(self):
        from unittest.mock import patch
        from scan.fetch import fetch_page_source
        from scan.feeds import SOURCE_FILTERS

        html = b"""
        <td class="carditem"><div class="card-wrapper">
          <span class="date">07-June-2026</span>
          <h3>Imposition of a Fine on Keir International Company, due to the violation of the Rules on the Offer of Securities and Continuing Obligations</h3>
          <p>The Capital Market Authority announces the issuance of a board resolution.</p>
          <a class="btn" title="Read More" href="/en/MediaCenter/NEWS/Pages/CMA_N_4064.aspx">Read More</a>
        </div></td>
        <td class="carditem"><div class="card-wrapper">
          <span class="date">09-June-2026</span>
          <h3>The Capital Market Authority approves a routine capital increase request</h3>
          <a class="btn" title="Read More" href="/en/MediaCenter/NEWS/Pages/CMA_N_4065.aspx">Read More</a>
        </div></td>
        """
        response = type("Response", (), {"content": html, "text": html.decode("utf-8")})()
        config = [{
            "url": "https://cma.gov.sa/en/MediaCenter/NEWS/Pages/default.aspx",
            "item_selectors": ["td.carditem"],
            "link_selectors": ["a.btn[href]"],
            "title_selector": "h3",
            "summary_selector": "p",
            "date_selectors": ["span.date"],
        }]
        source = {"id": "saudi-cma", "name": "Saudi CMA"}
        with patch("scan.fetch._get", return_value=response):
            items, error = fetch_page_source(source, config, SOURCE_FILTERS)
        self.assertIsNone(error)
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["published_at"], "2026-06-07T00:00:00+00:00")
        self.assertEqual(items[0]["url"], "https://cma.gov.sa/en/MediaCenter/NEWS/Pages/CMA_N_4064.aspx")

    def test_sitemap_adapter_extracts_mas_detail_pages(self):
        from unittest.mock import patch
        from scan.fetch import fetch_sitemap_source
        from scan.feeds import SOURCE_FILTERS

        sitemap = b"""
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
          <url><loc>https://www.mas.gov.sg/regulation/enforcement/enforcement-actions/2026/mas-imposes-$300000-composition-penalty-on-padang-trust-singapore-pte-ltd-for-aml-cft-breaches</loc></url>
          <url><loc>https://www.mas.gov.sg/careers</loc></url>
        </urlset>
        """
        detail = b"""
        <html><body>
          <div class="mas-ancillaries"><span><div>Enforcement Actions</div></span><span>Published Date: 25 May 2026</span></div>
          <h1 class="mas-text-h1">MAS Imposes $300,000 Composition Penalty on Padang Trust Singapore Pte. Ltd. for AML/CFT Breaches</h1>
          <div class="mas-text-summary">MAS has imposed a composition penalty for anti-money laundering breaches.</div>
        </body></html>
        """
        sitemap_response = type("Response", (), {"content": sitemap, "text": sitemap.decode("utf-8")})()
        detail_response = type("Response", (), {"content": detail, "text": detail.decode("utf-8")})()
        config = [{
            "url": "https://www.mas.gov.sg/sitemap.xml",
            "request_profile": "browser",
            "include_url_patterns": [r"/regulation/enforcement/enforcement-actions/20\d{2}/"],
            "title_selectors": ["h1.mas-text-h1", "h1"],
            "summary_selectors": [".mas-text-summary"],
            "date_selectors": [".mas-ancillaries > span"],
        }]
        source = {"id": "mas", "name": "MAS"}
        with patch("scan.fetch._get", side_effect=[sitemap_response, detail_response]):
            items, error = fetch_sitemap_source(source, config, SOURCE_FILTERS)
        self.assertIsNone(error)
        self.assertEqual(len(items), 1)
        self.assertEqual(items[0]["published_at"], "2026-05-25T00:00:00+00:00")
        self.assertIn("AML/CFT Breaches", items[0]["title"])


class TestSourcePerimeter(unittest.TestCase):
    def test_regulatory_perimeter_excludes_research_press_and_cyber_alerts(self):
        from scan.feeds import REGULATORY_SOURCE_IDS
        self.assertNotIn("arxiv-ai", REGULATORY_SOURCE_IDS)
        self.assertNotIn("reuters", REGULATORY_SOURCE_IDS)
        self.assertNotIn("cisa", REGULATORY_SOURCE_IDS)
        self.assertIn("hkma", REGULATORY_SOURCE_IDS)
        self.assertIn("apra", REGULATORY_SOURCE_IDS)
        self.assertIn("osfi", REGULATORY_SOURCE_IDS)
        self.assertIn("india-sebi", REGULATORY_SOURCE_IDS)
        self.assertIn("korea-fsc", REGULATORY_SOURCE_IDS)
        self.assertIn("brazil-cvm", REGULATORY_SOURCE_IDS)
        self.assertIn("fr-amf", REGULATORY_SOURCE_IDS)
        self.assertIn("spain-cnmv", REGULATORY_SOURCE_IDS)
        self.assertIn("ireland-cbi", REGULATORY_SOURCE_IDS)
        self.assertIn("adgm-fsra", REGULATORY_SOURCE_IDS)
        self.assertIn("de-bafin", REGULATORY_SOURCE_IDS)
        self.assertIn("dubai-dfsa", REGULATORY_SOURCE_IDS)
        self.assertIn("mexico-cnbv", REGULATORY_SOURCE_IDS)
        self.assertIn("italy-consob", REGULATORY_SOURCE_IDS)
        self.assertIn("saudi-cma", REGULATORY_SOURCE_IDS)


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
