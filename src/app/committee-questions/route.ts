import { getCommitteeQuestionsSnapshot } from "@/lib/content";

export const dynamic = "force-static";

const snapshot = getCommitteeQuestionsSnapshot();

const document = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${snapshot.metadata.title}</title>
    <meta name="robots" content="${snapshot.metadata.robots}">
    <link rel="icon" type="image/svg+xml" href="https://stgeorgesstrategy.com/assets/favicon.svg">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
    <style>
      :root { color-scheme: light; --paper:#e7e1d3; --ink:#15140f; --body:#3a382f; --navy:#0f2233; --cream:#f1ebdc; --accent:#a07e2e; }
      * { box-sizing: border-box; }
      body { display:grid; min-height:100vh; margin:0; background:var(--paper); color:var(--ink); font-family:"Hanken Grotesk", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; line-height:1.55; }
      main { display:grid; align-content:center; width:min(920px, 100%); margin:0 auto; padding:clamp(32px, 7vw, 84px); }
      .wordmark, .eyebrow, .button { font-family:"JetBrains Mono", ui-monospace, SFMono-Regular, monospace; text-transform:uppercase; }
      .wordmark { display:flex; align-items:center; gap:16px; margin-bottom:clamp(56px, 10vw, 104px); color:var(--navy); font-size:13px; font-weight:600; letter-spacing:.16em; text-decoration:none; }
      .mark { display:grid; place-items:center; min-width:42px; height:30px; border:1px solid rgba(160,126,46,.55); color:var(--accent); font-size:12px; letter-spacing:.12em; }
      .eyebrow { margin:0 0 18px; color:var(--accent); font-size:12px; font-weight:600; letter-spacing:.18em; }
      h1 { max-width:760px; margin:0 0 20px; font-family:"Playfair Display", Georgia, serif; font-size:clamp(52px, 9vw, 112px); line-height:.98; }
      p { max-width:620px; margin:0; color:var(--body); font-size:clamp(18px, 2vw, 23px); }
      .actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
      .button { display:inline-flex; align-items:center; justify-content:center; min-height:46px; border:1px solid var(--navy); padding:13px 18px; background:var(--navy); color:var(--cream); font-size:12px; font-weight:600; letter-spacing:.14em; text-decoration:none; }
      .button.secondary { border-color:rgba(15,34,51,.26); background:transparent; color:var(--navy); }
    </style>
  </head>
  <body>
    ${snapshot.bodyHtml}
  </body>
</html>`;

export function GET() {
  return new Response(document, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
