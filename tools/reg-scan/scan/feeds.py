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
    "uk-fca-enforcement-notices": [
        "https://www.fca.org.uk/news/search-results.rss?category=notices+and+decisions",
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
        "https://www.bankingsupervision.europa.eu/press/html/index.en.rss.xml",
    ],
    "eba": [
        "https://www.eba.europa.eu/rss.xml",
    ],
    "esma": [
        "https://www.esma.europa.eu/sites/default/files/rss_feed_esma.xml",
    ],
    "eiopa": [
        "https://www.eiopa.europa.eu/sites/default/files/rss.xml",
    ],
    "bis": [
        "https://www.bis.org/rssfeed/press_releases.rss",
    ],
    "fsb": [
        "https://www.fsb.org/feed/",
    ],
    "fatf": [
        "https://www.fatf-gafi.org/en/publications.rss.xml",
    ],

    # US Regulatory
    "sec": [
        "https://www.sec.gov/rss/news/press-releases.rss",
    ],
    "cftc": [
        "https://www.cftc.gov/rss/pressreleases",
    ],
    "fincen-enforcement": [
        "https://www.fincen.gov/news.rss",
    ],
    "cisa": [
        "https://www.cisa.gov/cybersecurity-advisories/all.xml",
    ],

    # EU AI / AI Policy
    "eu-ai-act": [
        "https://digital-strategy.ec.europa.eu/en/policies/regulatory-framework-ai/rss",
    ],
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
