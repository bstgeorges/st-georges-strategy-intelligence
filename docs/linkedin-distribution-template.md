# LinkedIn Distribution Template

Every weekly release produces a reviewable Markdown posting pack alongside its JSON distribution record:

```bash
npm run distribution:pack
npm run distribution:verify
```

The output is stored in `release-artifacts/distribution/` and includes:

- `edition-YYYY-MM-DD-linkedin.md` — the approved Weekly Brief copy, plus one post for each current Deep Dive;
- `edition-YYYY-MM-DD.json` — the structured source record for newsletter and LinkedIn delivery.

Use the permanent Brief and Deep Dive URLs and the matching contextual PNGs in the template. The copy comes directly from the approved edition or Deep Dive metadata. It is a publishing aid, not an autoposting mechanism: review it, then post manually to LinkedIn.
