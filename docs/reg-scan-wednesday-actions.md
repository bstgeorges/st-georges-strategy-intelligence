# Reg Scan Sunday GitHub Actions Handoff

Status date: 2026-07-05

The `reg-scan` folder has now been migrated into this workspace under `tools/reg-scan/`.

The active workflow is the repo-level file `.github/workflows/reg-scan-weekly.yml`.
The old standalone Claude folder is no longer the migration source of truth.

Local commands:

```bash
npm run reg-scan:test
npm run reg-scan:dry-run
npm run reg-scan:run
npm run horizon:sync
npm run horizon:refresh
```

## Required Workflow Shape

Use Sunday as the evidence refresh day, before the site publisher runs, so the approved edition is ready for Monday distribution.

```yaml
name: weekly-scan

on:
  schedule:
    - cron: "0 6 * * 0"   # 06:00 UTC Sundays
  workflow_dispatch:

permissions:
  contents: write

concurrency:
  group: weekly-scan
  cancel-in-progress: false

jobs:
  scan:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: "3.12"
          cache: pip

      - run: pip install -r requirements.txt

      - name: Run unit tests
        run: python tests/test_units.py

      - name: Run scan
        run: python -m scan

      - name: Verify outputs
        run: |
          test -f docs/latest.json
          test -f docs/feed.xml
          test -f docs/horizon.ics
          python -m json.tool docs/latest.json >/dev/null

      - name: Commit dashboard and state
        run: |
          git config user.name "reg-scan bot"
          git config user.email "actions@users.noreply.github.com"
          git add docs state/scan.db
          git diff --cached --quiet || git commit -m "Weekly scan $(date -u +%F)"
          git push
```

## Cutover Dependency

The migration remains blocked until the repo-level workflow has completed at least one Sunday run in GitHub Actions and pushed updated `tools/reg-scan/docs/`, `tools/reg-scan/state/scan.db`, and synced site artifacts.
