# Regulatory Horizon global source universe

Stage 1C separates the size of the governed monitoring universe from live ingestion coverage.

## Source-of-truth files

- `dashboard/data/regulatory-source-universe.generated.json` is the generated global catalogue.
- `dashboard/data/source-registry.json` remains the curated operational and assessed registry.
- `tools/reg-scan/scan/feeds.py` contains the currently connected Regulatory Horizon adapters.

The global catalogue is generated from the IOSCO ordinary-member directory and overlaid with the project's existing regulatory sources. IOSCO supplies the securities-and-markets authority baseline; it does not by itself prove adequate prudential, conduct, insurance, payments, resolution, sanctions or financial-crime coverage.

## Readiness states

- `catalogued`: the authority and homepage are evidenced by an official institutional directory, but no publication endpoint has been qualified.
- `operational-or-assessed`: the endpoint already exists in the curated source registry. This does not necessarily mean the Regulatory Horizon scanner currently ingests it.
- Scanner source health is reported separately as `ok`, `failed` or `not-configured` during a live run.

Authority count, endpoint count and operational coverage must never be presented as interchangeable metrics.

## Build and validation

Run:

```sh
npm run reg-sources:build
npm run reg-sources:validate
```

The validator requires at least 150 endpoints, 100 authorities and 40 jurisdiction labels, unique endpoint identifiers, source provenance and explicit ingestion readiness.

## Qualification waves

1. G20 and major financial centres: qualify official consultations, rules, guidance and enforcement endpoints.
2. EU/EEA national authorities: add banking, markets, insurance, resolution and financial-crime channels, retaining native-language publication paths.
3. Asia-Pacific, Middle East, Africa and Latin America: qualify local-language official channels and translation requirements.
4. Add official gazettes, ministries, legislatures, sanctions bodies and resolution authorities where regulator feeds do not capture binding change.
5. Measure 30-day recall, precision, date completeness, language coverage and source health before promoting an endpoint to operational status.

An endpoint is not promoted merely because it responds successfully. It must expose dated regulatory material, have a stable canonical URL, pass source-specific noise tests and produce usable jurisdiction and instrument metadata.
