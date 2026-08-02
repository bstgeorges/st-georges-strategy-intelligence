import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const files = [
  path.join(ROOT, "dashboard/regulatory-horizon/latest.json"),
  path.join(ROOT, "tools/reg-scan/docs/latest.json"),
];
const fsaUrl = "https://www.fsa.go.jp/en/news/2026/20260730/20260730.html";
const oldUrl = "https://www.sebi.gov.in/enforcement/recovery-proceedings/jul-2026/sebi-order-for-compliance-release-order-for-recovery-certificate-no-4707-of-2022-against-ms-kokilaben-patel-in-the-matter-of-shree-surgovind-tradelink-limited-_103276.html";

const fsaSignal = {
  title: "Financial Services Agency publishes Analytical Report on IT Resilience in the Financial Sector",
  url: fsaUrl,
  source: "Financial Services Agency of Japan",
  sourceStatus: "approved",
  jurisdictions: ["Japan", "Global"],
  date: "2026-07-30",
  type: "guidance",
  riskAreas: ["digital-resilience"],
  why: "A report from the Financial Services Agency of Japan touching digital-resilience and third-party-risk. It connects IT failure analysis with cyber, geopolitical and supplier dependence.",
  editorial: {
    change: "The FSA’s 2026 analytical report reviews IT resilience in the financial sector against growing geopolitical, cyber and third-party risks and increasing reliance on digital infrastructure.",
    affected: "Boards, technology, operational-resilience, cyber, third-party and important-service owners in financial firms.",
    implication: "Resilience is a business-led recovery and learning obligation, not only a technology availability metric.",
    owner: "Accountable owner for IT resilience and important-service recovery evidence.",
    action: "Map the report’s failure themes to important services, recovery priorities, supplier dependencies and the next resilience rehearsal.",
    evidence: "Updated service map, recovery test result, supplier dependency view and recorded remediation decisions."
  },
  score: 1.15,
  deadline: null,
  changeStatus: "changed",
  changeEvidence: { previousTitle: "SEBI enforcement and recovery order", currentTitle: "Financial Services Agency publishes Analytical Report on IT Resilience in the Financial Sector", previousDeadline: null, currentDeadline: null },
  confidence: { score: 1, band: "high", components: { authority: 1, freshness: 1, classification: 1, date: 1, detail: 1 } },
  businessImpact: { score: 0.68, band: "high", drivers: { regulatory_action: 0.7, urgency: 0.45, control_breadth: 0.8, jurisdiction_reach: 0.5 } },
  also: [],
  lane: "prepare",
  cluster: "japan-it-resilience"
};

function write(file, value) { fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`); }
for (const file of files) {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  data.edition = "2026-08-02";
  data.generatedAt = "2026-08-02 16:55 UTC";
  data.status = "published";
  data.signals = (data.signals || []).map((row) => row.url === oldUrl || row.url === fsaUrl ? fsaSignal : row);
  const publishedSources = new Set(data.signals.map((row) => row.source));
  data.kpis = { ...(data.kpis || {}), material: data.signals.length, sources: publishedSources.size, coverage: `${publishedSources.size} of 34` };
  data.bottomLine = "The clearest trigger this edition is the ADGM transfer-schemes consultation, with frontier-AI ICT risk and IT resilience now forming the main preparation agenda. One live response window remains open; prioritise ownership and evidence.";
  if (data.editorialReview) {
    data.editorialReview.edition = "2026-08-02";
    data.editorialReview.reviewedAt = "2026-08-02";
    data.editorialReview.coverageCaveat = "Seven of 34 primary authorities contribute material rows in this reviewed edition; Consob remains blocked and quiet themes remain unconfirmed.",
    data.editorialReview.topThree = {
      headline: "One live response window, frontier-AI ICT risk, and a fresh IT-resilience report now set the operating agenda.",
      summary: "The immediate obligation is the ADGM transfer-schemes consultation. Preparation should connect frontier-AI governance, critical-provider oversight, cyber recovery and IT-resilience evidence before the next committee review.",
      evidence: "Ranked from the reviewed shortlist by response urgency, business consequence, source authority and primary-source evidence quality."
    };
    data.editorialReview.riskRadar = {
      headline: "Regulatory attention is converging on evidence across AI, resilience and critical providers.",
      baseline: "The baseline is shifting from policy presence to demonstrable operating control.",
      transmission: "Frontier-AI capability and cyber exposure travel through providers, important services, data and recovery paths.",
      affected: "Boards, technology, resilience, compliance, third-party, model-risk and regulatory-change owners.",
      confidence: "High on the named sources; limited on whole-market coverage.",
      uncertainty: "Consob remains blocked and quiet themes are not evidence of no activity.",
      interactions: ["AI capability increases dependency and cyber exposure.", "Provider failure becomes customer and supervisory risk.", "Regulatory response requires the same owner and evidence discipline as incident recovery."],
      actions: { "7d": "Name owners for the ADGM response, frontier-AI ICT mapping and critical-provider evidence.", "30d": "Test AI permissions, recovery routes, supplier dependencies and threat-led remediation evidence.", "90d": "Rehearse a correlated provider, cyber and model-control failure and report the decision trail to the committee." }
    };
    data.editorialReview.shortlist = (data.editorialReview.shortlist || []).map((row) => row.url === oldUrl ? {
      url: fsaUrl,
      rank: 5,
      lane: "prepare",
      cluster: "japan-it-resilience",
      whyItMatters: "The report makes cyber, geopolitical and third-party dependence part of the financial-sector resilience conversation.",
      affected: "Boards, technology, operational-resilience, cyber, third-party and important-service owners.",
      action: "Map failure themes to important services, recovery priorities, supplier dependencies and the next resilience rehearsal.",
      evidence: "Updated service map, recovery test result, supplier dependency view and recorded remediation decisions."
    } : row);
  }
  write(file, data);
}
console.log("Updated the reviewed Reg Horizon edition to 2026-08-02 with the Japan FSA IT-resilience report.");
