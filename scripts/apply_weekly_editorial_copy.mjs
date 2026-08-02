import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const signalsPath = path.join(ROOT, "site/data/signals.json");
const editionPath = path.join(ROOT, "site/data/current-edition.json");
const aiPath = path.join(ROOT, "dashboard/data/ai-signals.json");

const editorialByUrl = {
  "https://www.anthropic.com/research/project-pilot": "Project Pilot makes delegated model action a control question: firms need to know which permissions, data boundaries, human approvals and intervention routes apply when a model can operate in the physical world.",
  "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals": "Anthropic’s incident review shows why AI evaluation environments need incident disclosure, access logging, partner assurance and a tested route for containing exposed prompts, data or model behaviour.",
  "https://openai.com/index/advancing-responsible-ai-across-europe": "The responsible-AI push is useful only if it becomes operating evidence: defined use cases, accountable owners, lawful data, deployment controls, monitoring and a record of decisions when risk and speed conflict.",
  "https://www.eiopa.europa.eu/eba-eiopa-and-esma-call-enhanced-governance-and-consistent-supervision-mitigate-ict-risks-frontier-2026-07-31_en": "The ESAs put frontier-AI ICT risk inside the supervisory conversation, linking governance, cyber prevention, detection, response and critical third-party oversight. Firms should map those expectations to real control evidence.",
  "https://www.fsa.go.jp/en/news/2026/20260730/20260730.html": "Japan’s FSA report treats IT resilience as a financial-sector operating issue shaped by cyber, geopolitical and third-party risk. The practical test is whether firms can recover important services and learn from failure.",
  "https://assets.adgm.com/download/assets/Consultation+Paper+No+2+of+2026+Transfer+Schemes.pdf/c47c84a6897b11f1b3149e4dd754476d": "The ADGM transfer-schemes consultation creates a live response decision. Affected firms need an applicability assessment, named owner, response position and evidence for the decision to respond or not.",
  "https://www.gov.uk/government/publications/check-if-an-email-or-communication-claiming-to-be-from-ofsi-is-genuine": "OFSI’s authenticity guidance is a small but practical sanctions control: firms need staff and screening teams to recognise official communications, avoid spoofing, and preserve escalation evidence when instructions change.",
  "https://www.gov.br/cvm/pt-br/assuntos/noticias/2026/cvm-publica-relatorio-da-atividade-sancionadora-do-1o-trimestre-de-2026": "CVM’s enforcement report is a read-across, not a new rule. The value is testing whether recurring conduct, surveillance, financial-crime and remediation weaknesses have comparable internal exposure.",
  "https://www.fsa.go.jp/inter/fatf/20260721/20260721.html": "The FATF DeFi report keeps regulatory perimeter and control ownership in view: firms should identify where decentralised activity touches their services, customers, counterparties or monitoring obligations.",
  "https://www.ncsc.gov.uk/blogs/when-cyber-attacks-happen-helping-organisations-recover": "NCSC recovery guidance emphasises governance, communications, minimum viable operations and rebuilding stronger. Recovery plans become credible only when firms practise them against business-led priorities.",
  "https://www.ncsc.gov.uk/news/uk-and-partners-expose-russian-state-supported-actors-for-new-zero-click-phishing-campaign": "The campaign reinforces that identity and user-exposure controls need threat-led testing, rapid detection and clear ownership across internal teams and suppliers.",
  "https://www.jpcert.or.jp/at/2026/at260021.html": "JPCERT reports an exploited Rails Active Storage vulnerability with public exploit code. The immediate control question is asset coverage, patch urgency, credential rotation and evidence of compromise assessment.",
};

function writeJson(file, value) {
  fs.writeFileSync(file, `${JSON.stringify(value, null, 2)}\n`);
}

const signals = JSON.parse(fs.readFileSync(signalsPath, "utf8"));
for (const topic of signals.topics || []) {
  topic.stillMaterialReviewedAt = "2026-08-02";
  for (const row of [...(topic.top5 || []), ...(topic.stillMaterial || [])]) {
    if (editorialByUrl[row.url]) row.evidence.significance = editorialByUrl[row.url];
  }
}
signals.edition = "2026-08-02";
signals.generatedAt = "2026-08-02T00:00:00.000Z";
writeJson(signalsPath, signals);

const byTopic = new Map(signals.topics.map((topic) => [topic.id, topic]));
const lead = (topic) => topic.top5[0];
const currentEdition = {
  editionNumber: "Vol. V",
  title: "Frontier AI, cyber recovery and regulatory response now meet in the operating model",
  weekOf: "2026-07-27",
  publicationDate: "2026-08-02",
  canonicalUrl: "https://stgeorgesstrategy.com/brief/",
  status: "current",
  signalsRanked: 5,
  streamsScanned: 8,
  mainJudgement: "The week’s evidence makes the operating boundary harder to ignore: frontier AI risk, cyber recovery, supplier oversight and regulatory response now depend on the same control evidence.",
  judgement: {
    observation: "Fresh evidence spans frontier-AI ICT risk, model-evaluation incidents, a live transfer-schemes consultation, cyber recovery guidance, an exploited Rails vulnerability and a Japanese IT-resilience report. These are different events, but each tests the same boundary: whether a firm can see the dependency, assign the decision and act under pressure.",
    executiveJudgement: "World-class control is now less about having another policy and more about joining evidence across AI, suppliers, infrastructure, resilience and regulatory change. If the evidence lives in separate teams, the risk will surface first as a customer outage, an unpatched asset, an unowned response or an unexplained model action.",
    implication: "Ask for one joined-up operating view: critical services and providers, AI permissions and evaluation partners, threat-led remediation, recovery rehearsals, consultation owners and sanctions or reporting decisions. The proof is a current map, named accountable owner, tested intervention route, dated action and decision trail that survives challenge."
  },
  topSignals: [
    { topic: "ai", title: lead(byTopic.get("ai")).title, label: "AI control", why: "Delegated model action makes permissions, evidence, incident response and human intervention part of the operating model.", source: "Anthropic · Company announcement · 2026-07-24" },
    { topic: "cyber", title: lead(byTopic.get("cyber")).title, label: "Cyber", why: "Recovery guidance and active exploitation make preparedness, patching, credential hygiene and recovery evidence immediate management questions.", source: "NCSC · Government · 2026-07-28" },
    { topic: "market-structure", title: lead(byTopic.get("market-structure")).title, label: "Market structure", why: "A live transfer-schemes consultation creates a concrete response, applicability and evidence obligation.", source: "ADGM FSRA · Regulator · 2026-07-27" },
    { topic: "third-party", title: lead(byTopic.get("third-party")).title, label: "Third-party", why: "Frontier-AI ICT risk is now linked to critical-provider oversight and supervisory dialogue.", source: "EBA / EIOPA / ESMA · Regulators · 2026-07-31" },
    { topic: "resilience", title: lead(byTopic.get("resilience")).title, label: "Resilience", why: "The FSA report turns IT resilience into a business-led recovery and learning obligation.", source: "Japan FSA · Regulator · 2026-07-30" }
  ]
};
writeJson(editionPath, currentEdition);

const ai = {
  generatedAt: "2026-08-02",
  publication: "AI Signals",
  audience: "Financial services leaders tracking AI model, product, capability, industry, and governance signals",
  status: "live",
  archiveDedupe: { rule: "Before writing a new edition, read the previous dated AI Signals archive and drop items already covered unless the model, product, capability score, governance status, or market consequence changed.", previousArchiveUrl: "https://stgeorgesstrategy.com/ai-signals/archive/" },
  edition: { displayDate: "2 Aug 2026", line: "Live edition / Updated 2 Aug 2026", descriptor: "Sector-wide / Source-linked snapshot" },
  summary: "AI is moving from experimentation into delegated action, critical-provider dependence and operational resilience. This edition tracks the control evidence that must move with it.",
  sourceUniverse: {
    modelReleases: ["https://www.anthropic.com/research/project-pilot", "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals", "https://openai.com/index/advancing-responsible-ai-across-europe"],
    industryNews: ["https://www.openai.com/index/unive", "https://www.eiopa.europa.eu/eba-eiopa-and-esma-call-enhanced-governance-and-consistent-supervision-mitigate-ict-risks-frontier-2026-07-31_en"],
    capabilityData: ["https://www.anthropic.com/research/project-pilot", "https://www.nist.gov/itl/ai-risk-management-framework"],
    governanceOverlap: ["https://www.eiopa.europa.eu/eba-eiopa-and-esma-call-enhanced-governance-and-consistent-supervision-mitigate-ict-risks-frontier-2026-07-31_en", "https://eur-lex.europa.eu/eli/reg/2024/1689/oj"],
    curatedWeeklySignals: ["https://www.ncsc.gov.uk/blogs/when-cyber-attacks-happen-helping-organisations-recover"]
  },
  sections: [
    { id: "model", order: "01", label: "Model releases", cards: [
      { title: "Project Pilot tests whether AI models can act in the physical world", badge: "Capability signal", body: "Anthropic’s Project Pilot makes delegated action concrete. The control question is how model capability changes permissions, human approval, monitoring, incident response and the evidence required before deployment.", sourceName: "Anthropic", sourceType: "dated", date: "2026-07-24", source: { label: "Project Pilot", url: "https://www.anthropic.com/research/project-pilot" } },
      { title: "Anthropic reviews three real-world incidents in cybersecurity evaluations", badge: "Security signal", body: "The incident review shows why evaluation environments need partner assurance, access logging, disclosure routes and a tested response when prompts, data or model behaviour are exposed.", sourceName: "Anthropic", sourceType: "dated", date: "2026-07-30", source: { label: "Cybersecurity evaluations incident review", url: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals" } },
      { title: "Responsible AI in Europe becomes an operating-evidence question", badge: "Governance signal", body: "The responsible-AI conversation is moving from principles to use-case inventories, accountable owners, lawful data, monitoring and documented decisions when safety and speed conflict.", sourceName: "OpenAI", sourceType: "dated", date: "2026-07-31", source: { label: "Advancing responsible AI across Europe", url: "https://openai.com/index/advancing-responsible-ai-across-europe" } },
      { title: "AI-ready workforces need workflow and accountability design", badge: "Adoption signal", body: "AI adoption is increasingly an operating-model choice. Firms need to identify where AI changes work allocation, review, escalation, data handling and the accountability of the final decision.", sourceName: "OpenAI", sourceType: "dated", date: "2026-07-31", source: { label: "Univé builds an AI-ready workforce", url: "https://openai.com/index/unive" } },
      { title: "AI governance still needs a durable control baseline", badge: "Governance signal", body: "NIST’s AI Risk Management Framework remains useful as a practical bridge between model capability, risk identification, testing, monitoring and accountable governance evidence.", sourceName: "NIST", sourceType: "evergreen", evergreenClassification: "framework", source: { label: "NIST AI Risk Management Framework", url: "https://www.nist.gov/itl/ai-risk-management-framework" } }
    ] },
    { id: "feature", order: "02", label: "Feature launches", cards: [
      { title: "Delegated AI features need permissions outside the prompt", badge: "Control signal", body: "When tools can act across systems, prompt-level instructions are not enough. Technical boundaries, least privilege, monitoring and emergency stop paths need to be enforced in the workflow.", sourceName: "Anthropic", sourceType: "dated", date: "2026-07-24", source: { label: "Project Pilot", url: "https://www.anthropic.com/research/project-pilot" } },
      { title: "AI security evaluation is becoming a product-readiness test", badge: "Security signal", body: "The cybersecurity evaluation incidents underline that model and product launches need disclosure, partner controls, safe testing environments and a route to contain unexpected behaviour.", sourceName: "Anthropic", sourceType: "dated", date: "2026-07-30", source: { label: "Cybersecurity evaluations incident review", url: "https://www.anthropic.com/news/investigating-incidents-cybersecurity-evals" } },
      { title: "Frontier-AI oversight now includes critical ICT providers", badge: "Supervisory signal", body: "The ESAs connect frontier-AI cyber risk to governance, prevention, detection, response and oversight of critical ICT third parties. Product adoption therefore has a supervisory perimeter.", sourceName: "EBA / EIOPA / ESMA", sourceType: "dated", date: "2026-07-31", source: { label: "ESAs frontier-AI ICT risk statement", url: "https://www.eiopa.europa.eu/eba-eiopa-and-esma-call-enhanced-governance-and-consistent-supervision-mitigate-ict-risks-frontier-2026-07-31_en" } },
      { title: "Responsible deployment needs an inventory that survives review", badge: "Governance signal", body: "A live inventory must connect use case, model, data, owner, permission, risk classification, testing, monitoring and exception decisions rather than sit as a static register.", sourceName: "OpenAI", sourceType: "dated", date: "2026-07-31", source: { label: "Advancing responsible AI across Europe", url: "https://openai.com/index/advancing-responsible-ai-across-europe" } },
      { title: "Legal obligations remain the bridge between AI principles and control tests", badge: "Governance signal", body: "The EU AI Act provides a durable legal reference point for converting AI governance language into role, use-case, documentation and evidence questions.", sourceName: "EUR-Lex", sourceType: "evergreen", evergreenClassification: "framework", source: { label: "Artificial Intelligence Act", url: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj" } }
    ] },
    { id: "industry", order: "03", label: "Industry news", cards: [
      { title: "AI-ready workforces make accountability an operating-model choice", badge: "Industry signal", body: "The important shift is not only tool adoption. It is how firms redesign work, review, escalation and evidence when AI becomes part of ordinary delivery.", sourceName: "OpenAI", sourceType: "dated", date: "2026-07-31", source: { label: "Univé builds an AI-ready workforce", url: "https://openai.com/index/unive" } },
      { title: "Supervisors are framing frontier AI as a financial-sector ICT risk", badge: "Supervisory signal", body: "The ESAs’ statement moves frontier AI into financial-sector resilience and critical-provider oversight, increasing the value of governance maps that connect models to important services.", sourceName: "EBA / EIOPA / ESMA", sourceType: "dated", date: "2026-07-31", source: { label: "ESAs frontier-AI ICT risk statement", url: "https://www.eiopa.europa.eu/eba-eiopa-and-esma-call-enhanced-governance-and-consistent-supervision-mitigate-ict-risks-frontier-2026-07-31_en" } },
      { title: "IT resilience is the practical test for AI-enabled financial services", badge: "Resilience signal", body: "Japan’s FSA report highlights cyber, geopolitical and third-party dependence. AI-enabled services need recovery priorities, service mapping and evidence that controls work during disruption.", sourceName: "Financial Services Agency of Japan", sourceType: "dated", date: "2026-07-30", source: { label: "Analytical Report on IT Resilience in the Financial Sector", url: "https://www.fsa.go.jp/en/news/2026/20260730/20260730.html" } },
      { title: "Cyber recovery guidance is now part of AI operating readiness", badge: "Operational signal", body: "NCSC’s recovery framework emphasises governance, communications, minimum viable operations and rebuilding stronger. AI owners should test these paths for services that depend on model providers.", sourceName: "NCSC", sourceType: "dated", date: "2026-07-28", source: { label: "When cyber attacks happen: helping organisations recover", url: "https://www.ncsc.gov.uk/blogs/when-cyber-attacks-happen-helping-organisations-recover" } },
      { title: "AI and data protection remain inseparable control questions", badge: "Data signal", body: "The ICO’s AI guidance remains a practical reminder that provenance, lawful basis, explainability and individual rights belong inside AI delivery evidence rather than in a separate privacy annex.", sourceName: "ICO", sourceType: "evergreen", evergreenClassification: "guidance", source: { label: "ICO AI and data protection guidance", url: "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/" } }
    ] }
  ]
};
writeJson(aiPath, ai);
console.log("Applied reviewed weekly Signals, judgement, and AI Signals copy for 2026-08-02.");
