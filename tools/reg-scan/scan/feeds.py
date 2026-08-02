"""Map source IDs (from source-registry.json) to RSS/Atom feed URLs.

Sources without a feed entry are skipped at fetch time and reported as
no-coverage in the scan warnings. Adding a new feed is as simple as adding
an entry here - no other changes required.
"""

# Each value is a list so a source can be covered by multiple feeds.
FEED_MAP = {

    # UK Regulatory
    "uk-fca": [
        "https://www.fca.org.uk/news/rss.xml",
    ],
    "uk-boe-pra": [
        "https://www.bankofengland.co.uk/rss/news",
        "https://www.bankofengland.co.uk/rss/publications",
    ],
    "ofsi": [
        "https://www.gov.uk/government/organisations/office-of-financial-sanctions-implementation.atom",
    ],
    "uk-nca": [
        "https://www.nationalcrimeagency.gov.uk/news.rss",
    ],
    "uk-ncsc": [
        "https://www.ncsc.gov.uk/api/1/services/v1/all-rss-feed.xml",
    ],

    # European Regulatory
    "ecb-supervision": [
        "https://www.bankingsupervision.europa.eu/rss/press.html",
    ],
    "eba": [
        "https://www.eba.europa.eu/rss.xml",
    ],
    "esma": [
        "https://www.esma.europa.eu/rss.xml",
    ],
    "bis": [
        "https://www.bis.org/doclist/all_pressrels.rss",
    ],
    "fsb": [
        "https://www.fsb.org/feed/",
    ],
    "finma": [
        "https://www.finma.ch/en/rss/news/",
    ],
    "japan-fsa": [
        "https://www.fsa.go.jp/fsaEnNewsList_rss2.xml",
    ],
    "hkma": [
        "https://www.hkma.gov.hk/eng/other-information/rss/rss_press-release.xml",
        "https://www.hkma.gov.hk/eng/other-information/rss/rss_guidelines.xml",
        "https://www.hkma.gov.hk/eng/other-information/rss/rss_circulars.xml",
        "https://www.hkma.gov.hk/eng/other-information/rss/rss_consultations.xml",
    ],
    "india-sebi": [
        "https://www.sebi.gov.in/sebirss.xml",
    ],
    "fr-amf": [
        "https://www.amf-france.org/fr/flux-rss/display/31",
        "https://www.amf-france.org/fr/flux-rss/display/23",
        "https://www.amf-france.org/fr/flux-rss/display/24",
    ],
    "spain-cnmv": [
        "https://www.cnmv.es/portal/RSS/RSS.asmx/GetDatos?iID=1",
        "https://www.cnmv.es/portal/RSS/RSS.asmx/GetDatos?iID=4",
    ],
    "ireland-cbi": [
        "https://www.centralbank.ie/feeds/news-media-feed",
        "https://www.centralbank.ie/feeds/markets-updates-feed",
    ],

    # US Regulatory
    "sec": [
        "https://www.sec.gov/news/pressreleases.rss",
    ],
    "cftc": [
        "https://www.cftc.gov/RSS/RSSGP/rssgp.xml",
        "https://www.cftc.gov/RSS/RSSENF/rssenf.xml",
    ],
    "cisa": [
        "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    ],

    # EU AI / AI Policy
    "ai-act-tracker": [
        "https://artificialintelligenceact.eu/feed/",
    ],
    "nist-ai-rmf": [
        "https://www.nist.gov/blogs/cybersecurity-insights/rss.xml",
    ],

    # AI Labs
    "openai": [
        "https://openai.com/blog/rss.xml",
    ],
    "anthropic": [
        "https://www.anthropic.com/rss.xml",
    ],
    "google-deepmind": [
        "https://deepmind.google/blog/rss.xml",
    ],
    "mistral-ai": [
        "https://mistral.ai/news/rss/",
    ],
    "arxiv-ai": [
        "http://export.arxiv.org/rss/cs.AI",
    ],

    # Specialist aggregators
    "regulation-tomorrow": [
        "https://www.regulationtomorrow.com/feed/",
    ],
    "sidley-insights": [
        "https://www.sidley.com/en/insights/rss",
    ],
    "the-batch": [
        "https://www.deeplearning.ai/the-batch/rss/",
    ],
    "import-ai": [
        "https://jack-clark.net/feed/",
    ],
    "finextra": [
        "https://www.finextra.com/rss/rss_news_channel.aspx",
    ],
    "risk-net": [
        "https://www.risk.net/rss",
    ],

    # Press
    "techcrunch-ai": [
        "https://techcrunch.com/category/artificial-intelligence/feed/",
    ],
    "the-verge-ai": [
        "https://www.theverge.com/rss/ai-artificial-intelligence/index.xml",
    ],
    "ars-technica-ai": [
        "https://feeds.arstechnica.com/arstechnica/index",
    ],
    "reuters": [
        "https://feeds.reuters.com/reuters/businessNews",
    ],
    "reuters-regulatory-news": [
        "https://feeds.reuters.com/reuters/companyNews",
    ],
}

# Regulators that publish dependable, dated official listing pages but no useful
# RSS/Atom feed. Each result selector must identify one publication card/row;
# link and date selectors are evaluated within it. Multiple selectors allow the
# adapter to tolerate minor CMS template changes without crawling arbitrary links.
PAGE_MAP = {
    "hong-kong-sfc": [{"url": "https://www.sfc.hk/en/News-and-announcements/Policy-statements-and-announcements", "request_profile": "browser", "item_selectors": ["article", ".views-row", ".card", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "south-africa-sarb": [{"url": "https://www.resbank.co.za/en/home/newsroom", "item_selectors": ["article", ".card", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "india-rbi": [{"url": "https://www.rbi.org.in/Scripts/BS_PressReleaseDisplay.aspx", "item_selectors": ["article", "table tr", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "singapore-sgx": [{"url": "https://www.sgx.com/regulation", "item_selectors": ["article", ".card", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "brazil-bcb": [{"url": "https://www.bcb.gov.br/en/pressreleasesbyyear?ano=2026", "item_selectors": ["article", ".card", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "south-korea-fss": [{"url": "https://www.fss.or.kr/eng/main/main.do", "request_profile": "browser", "item_selectors": ["article", ".board-list li", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "switzerland-snb": [{"url": "https://www.snb.ch/en/news-publications/media-releases", "item_selectors": ["article", ".card", ".views-row", "li"], "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"], "date_selectors": ["time[datetime]", ".date", ".published"]}],
    "uk-fca": [{
        "url": "https://www.fca.org.uk/news/search-results?search_term=regulatory",
        "request_profile": "browser",
        "timeout": 12,
        "item_selectors": [".search-item", ".views-row", "article"],
        "link_selectors": ["h3 a[href]", "h2 a[href]"],
        "date_selectors": ["time[datetime]", ".published-date", ".date"],
    }],
    "de-bafin": [{
        "url": "https://bafin.de/",
        "item_selectors": ["div.c-teaser"],
        "link_selectors": ["a.c-teaser__link-main[href]"],
        "title_selector": "h3.c-teaser__headline",
        "summary_selector": "div.c-teaser__text p",
        "date_selectors": ["p.c-teaser__topline"],
    }],
    "dubai-dfsa": [{
        "url": "https://www.dfsa.ae/news",
        "item_selectors": ["a.item[href]"],
        "link_selectors": [],
        "link_self": True,
        "title_selector": "h3.title",
        "date_selectors": ["p.date"],
    }],
    "mexico-cnbv": [{
        "url": "https://www.gob.mx/cnbv/archivo/prensa?idiom=es-MX",
        "item_selectors": ["article", ".post", ".card", ".list-article", ".media"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href*='/cnbv/prensa/']"],
        "date_selectors": ["time[datetime]", ".date", ".published", ".fecha", ".small"],
    }],
    "italy-consob": [{
        "url": "https://www.consob.it/web/area-pubblica/comunicati-stampa",
        "request_profile": "browser",
        "timeout": 12,
        "retries": 2,
        "item_selectors": ["article", ".card", ".asset-entry", ".journal-content-article", ".teaser"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", "h4 a[href]", "a[href*='comunicato']"],
        "date_selectors": ["time[datetime]", ".date", ".metadata", ".publish-date", "h2", "h3", "h4"],
    }],
    "saudi-cma": [{
        "url": "https://cma.gov.sa/en/MediaCenter/NEWS/Pages/default.aspx",
        "item_selectors": ["td.carditem"],
        "link_selectors": ["a.btn[href]", "a[title='Read More'][href]"],
        "title_selector": "h3",
        "summary_selector": "p",
        "date_selectors": ["span.date"],
    }],
    "adgm-fsra": [{
        "url": "https://www.adgm.com/legal-framework/public-consultations",
        "item_selectors": ["adgm-expansion-panel"],
        "link_selectors": ["adgm-link-button[href]"],
        "title_selector": "h3",
        "summary_selector": "adgm-text[variant='textS'] p",
        "context_selector": "adgm-text.year",
        "date_selectors": ["adgm-presentation-grid > adgm-flex > adgm-text:not(.year):not(.status) b"],
    }],
    "korea-fsc": [{
        "url": "https://www.fsc.go.kr/eng/pr010101?srchCtgry=1",
        "item_selectors": ["ul.board-list > li"],
        "link_selectors": ["div.cont > a[href]"],
        "title_selector": "div.cont dt",
        "summary_selector": "div.cont dd",
        "date_selectors": ["span.data"],
    }],
    "brazil-cvm": [{
        "url": "https://www.gov.br/cvm/pt-br/assuntos/noticias/",
        "item_selectors": ["ul.noticias > li"],
        "link_selectors": ["h2.titulo a[href]"],
        "date_selectors": ["span.descricao span.data"],
    }],
    "asic": [{
        "url": "https://www.asic.gov.au/regulatory-resources/find-a-document/regulatory-document-updates/regulatory-tracker/regulatory-tracker-2026/",
        "item_selectors": ["tbody tr"],
        "link_selectors": ["td:nth-of-type(3) a[href]", "td a[href]"],
        "date_selectors": ["td:first-of-type"],
    }],
    "uk-fca-enforcement-notices": [{
        "url": "https://www.fca.org.uk/news/search-results?search_term=enforcement&exclude_warnings=1",
        "item_selectors": [".search-item", ".views-row", "article"],
        "link_selectors": ["h3 a[href]", "h2 a[href]"],
        "date_selectors": ["time[datetime]", ".published-date", ".date"],
    }],
    "eiopa": [{
        "url": "https://www.eiopa.europa.eu/media_en",
        "item_selectors": ["article", ".ecl-content-item", ".views-row"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", ".ecl-content-block__title a[href]"],
        "date_selectors": ["time[datetime]", ".ecl-content-block__date", ".date"],
    }],
    "fatf": [{
        "url": "https://www.fsa.go.jp/inter/fatf/fatf_menu.html",
        "item_selectors": ["article#content ul li"],
        "link_selectors": ["a[href]"],
        "title_selector": "a[href]",
        "date_selectors": ["a[href]"],
    }],
    "fincen-enforcement": [{
        "url": "https://www.fincen.gov/news/press-releases",
        "request_profile": "browser",
        "timeout": 15,
        "retries": 2,
        "item_selectors": ["article", ".views-row", ".node--type-news"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href*='/news/']"],
        "date_selectors": ["time[datetime]", ".date", ".field--name-field-date"],
    }],
    "apra": [{
        "url": "https://www.apra.gov.au/news-and-publications?page=0",
        "item_selectors": [".views-row", "article"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", "a[href]"],
        "date_selectors": ["time[datetime]", ".date", ".field--name-field-date"],
    }],
    "osfi": [{
        "url": "https://www.osfi-bsif.gc.ca/en/news",
        "item_selectors": [".views-row", "article", ".card"],
        "link_selectors": ["h2 a[href]", "h3 a[href]", ".card-title a[href]"],
        "date_selectors": ["time[datetime]", ".date", ".field--name-field-date"],
    }],
}

SITEMAP_MAP = {
    "mas": [{
        "url": "https://www.mas.gov.sg/sitemap.xml",
        "request_profile": "browser",
        "include_url_patterns": [
            r"/regulation/enforcement/enforcement-actions/20\d{2}/",
            r"/regulation/circulars/",
            r"/regulation/guidelines/",
            r"/regulation/notices/",
            r"/publications/consultations/",
        ],
        "prefer_url_patterns": [r"/2026/"],
        "max_urls": 15,
        "title_selectors": ["h1.mas-text-h1", "h1"],
        "summary_selectors": [".mas-text-summary", "meta[name='description']"],
        "date_selectors": [
            "time[datetime]",
            ".mas-ancillaries > span",
            ".mas-article-info__date",
            ".mas-date",
            "meta[property='article:published_time']",
            "meta[name='date']",
        ],
    }],
}

# Source-level precision gates run before classification and scoring. Inclusion
# patterns are deliberately regulatory-instrument concepts, not topic keywords.
SOURCE_FILTERS = {
    "hkma": {
        "exclude": [r"\btender\b", r"fraudulent website", r"phishing", r"scam alert", r"monthly statistical bulletin"],
    },
    "japan-fsa": {
        "exclude": [r"materials for the press conference", r"weekly review", r"cold calling", r"list of unregistered"],
    },
    "apra": {
        "include": [r"consult", r"standard", r"guidance", r"prudential", r"reporting", r"supervision", r"enforcement", r"licen[cs]"],
        "exclude": [r"speech", r"statement by", r"appointments?", r"corporate plan", r"annual report"],
    },
    "osfi": {
        "include": [r"consult", r"guideline", r"advisory", r"letter", r"supervis", r"capital", r"liquidity", r"regulatory", r"final"],
        "exclude": [r"speech", r"remarks by", r"appointment", r"annual report"],
    },
    "uk-fca-enforcement-notices": {
        "include": [r"fine[sd]?", r"penalt", r"enforcement", r"decision notice", r"final notice", r"prohibition", r"censure", r"charged", r"convicted"],
        "exclude": [r"clone of", r"not authorised", r"warning"],
    },
    "eiopa": {
        "include": [r"consult", r"guideline", r"technical standard", r"supervis", r"regulat", r"Solvency", r"DORA", r"IRRD"],
        "exclude": [r"speech", r"event", r"vacanc"],
    },
    "fatf": {
        "include": [
            r"standard", r"guidance", r"recommendation", r"risk", r"mutual evaluation", r"jurisdiction",
            r"consult", r"virtual asset", r"FATF", r"市中協議", r"声明", r"公表", r"勧告", r"基準",
            r"暗号資産", r"マネロン", r"テロ資金", r"VASP", r"Payment Transparency",
        ],
        "exclude": [r"speech", r"meeting", r"講演", r"会合.*開催", r"共同議長"],
    },
    "asic": {
        "include": [r"consult", r"regulatory guide", r"legislative instrument", r"reporting", r"guidance", r"rule", r"standard", r"relief"],
        "exclude": [r"corporate plan", r"annual report", r"speech"],
    },
    "mas": {
        "include": [r"consult", r"notice", r"guideline", r"regulat", r"enforcement", r"penalt", r"supervis", r"capital", r"liquidity"],
        "exclude": [r"speech", r"appointment", r"survey"],
    },
    "nist-ai-rmf": {
        "include": [r"artificial intelligence", r"\bAI\b", r"machine learning", r"model risk", r"generative", r"LLM"],
    },
    "india-sebi": {
        "include": [r"circular", r"consult", r"order", r"regulat", r"framework", r"guideline", r"amendment"],
        "exclude": [r"investor awareness", r"vacanc", r"recruitment", r"speech"],
    },
    "fr-amf": {
        "include": [r"consult", r"r.glement", r"doctrine", r"instruction", r"position", r"sanction", r"transaction homologu.e", r"communiqu"],
        "exclude": [r"agenda", r"conf.rence", r"discours", r"recrutement"],
    },
    "korea-fsc": {
        "include": [r"regulat", r"rule", r"supervis", r"capital", r"disclosure", r"AML", r"market", r"financial companies", r"reform"],
        "exclude": [r"meeting with", r"speech", r"appointment", r"work report"],
    },
    "brazil-cvm": {
        "include": [r"consulta p.blica", r"regula", r"resolu..o", r"orienta", r"multa", r"sancion", r"julgamento", r"of.cio circular", r"suspens"],
        "exclude": [r"agenda", r"servidores", r"curso", r"inscri..es", r"indisponibilidade"],
    },
    "spain-cnmv": {
        "include": [r"consulta p.blica", r"proyecto de circular", r"regula", r"supervisi", r"sanci", r"informaci.n al sector"],
        "exclude": [r"advertencias", r"entidades no registradas", r"reclamaciones", r"discurso", r"jornada", r"nombramiento"],
    },
    "ireland-cbi": {
        "include": [r"consult", r"regulat", r"supervis", r"enforcement", r"sanction", r"fine", r"markets update", r"framework", r"guidance", r"capital"],
        "exclude": [r"unauthorised firm", r"warning on", r"coin", r"appointment", r"speech", r"pre-budget letter"],
    },
    "adgm-fsra": {
        "include": [r"consultation paper", r"discussion paper"],
    },
    "de-bafin": {
        "include": [r"Konsultation", r"Allgemeinverf.gung", r"Bu.geld", r"verwarnt", r"Ma.nahmen", r"Aufsicht", r"Regulierung", r"MaRisk", r"DORA", r"MiCAR", r"Geldw.sche"],
        "exclude": [r"Save the Date", r"Anmeldung", r"Phishing", r"warnt vor.*Website", r"Veranstaltung", r"Workshop", r"Stellenangebot"],
    },
    "dubai-dfsa": {
        "include": [r"consultation paper", r"amendments? to legislation", r"rulebook", r"supervisory", r"enforcement", r"fines?", r"penalt", r"regulatory"],
        "exclude": [r"award", r"annual report", r"business plan", r"event"],
    },
    "mexico-cnbv": {
        "include": [r"consulta p.blica", r"disposiciones de car.cter general", r"circular", r"capitalizaci.n", r"liquidez", r"alertas tempranas", r"antilavado", r"sanci.n", r"multa", r"supervisi.n"],
        "exclude": [r"centro de acopio", r"cruz roja", r"convocatoria", r"evento", r"nombramiento"],
    },
    "italy-consob": {
        "include": [r"consultazione", r"regolamento", r"delibera", r"richiamo di attenzione", r"orientamenti", r"sanzion", r"abusivismo", r"oscur", r"vigilanza", r"mercati"],
        "exclude": [r"evento", r"convegno", r"relazione annuale", r"discors"],
    },
    "saudi-cma": {
        "include": [r"consult", r"draft", r"regulat", r"rules?", r"instructions?", r"market institutions?", r"enforcement", r"penalt", r"fine", r"violation", r"amend"],
        "exclude": [r"workshop", r"event", r"appointment", r"annual report", r"Licenses .* to Conduct", r"approves? .*capital increase", r"public offering", r"bonus shares", r"rights issue", r"debt instruments program"],
    },
}

# Regulatory Horizon is intentionally narrower than the shared source registry.
# Signal production, cyber monitoring, AI labs, trade press and research feeds have
# their own pipelines and must never compete with regulatory instruments here.
REGULATORY_SOURCE_IDS = {
    "uk-fca", "uk-fca-enforcement-notices", "uk-boe-pra", "ofsi",
    "ecb-supervision", "eba", "esma", "eiopa", "bis", "fsb", "fatf",
    "sec", "cftc", "fincen-enforcement", "nist-ai-rmf",
    "finma", "japan-fsa", "hkma",
    "apra", "asic", "osfi", "mas", "india-sebi", "korea-fsc", "brazil-cvm", "fr-amf",
    "spain-cnmv", "ireland-cbi", "adgm-fsra",
    "de-bafin", "dubai-dfsa",
    "mexico-cnbv", "italy-consob", "saudi-cma", "hong-kong-sfc", "south-africa-sarb", "india-rbi", "singapore-sgx", "brazil-bcb", "south-korea-fss", "switzerland-snb",
}
