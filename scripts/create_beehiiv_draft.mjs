import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API_BASE = "https://api.beehiiv.com/v2";

function parseArgs(argv) {
  const options = {
    input: "",
    testEmail: "",
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "--input") {
      options.input = argv[++index] || "";
    } else if (arg.startsWith("--input=")) {
      options.input = arg.slice("--input=".length);
    } else if (arg === "--test-email") {
      options.testEmail = argv[++index] || "";
    } else if (arg.startsWith("--test-email=")) {
      options.testEmail = arg.slice("--test-email=".length);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }

  if (options.input && !path.isAbsolute(options.input)) options.input = path.join(ROOT, options.input);
  return options;
}

function readJson(file) {
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function findLatestPayload() {
  const dir = path.join(ROOT, "site-dist", "newsletter");
  const files = fs
    .readdirSync(dir)
    .filter((file) => /^beehiiv-\d{4}-\d{2}-\d{2}\.post\.json$/.test(file))
    .sort();
  if (!files.length) {
    throw new Error("No Beehiiv payload found. Run `npm run newsletter:beehiiv` first.");
  }
  return path.join(dir, files[files.length - 1]);
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing ${name}. Set it in your shell or CI secrets.`);
  return value;
}

async function beehiivFetch(url, token, options) {
  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const detail = body ? JSON.stringify(body) : text;
    throw new Error(`Beehiiv API returned ${response.status}: ${detail}`);
  }
  return body;
}

async function createPost(publicationId, token, payload) {
  const body = {
    title: payload.title,
    subtitle: payload.subtitle,
    body_content: payload.body_content,
    seo_settings: payload.seo_settings,
  };

  return beehiivFetch(`${API_BASE}/publications/${publicationId}/posts`, token, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function sendTest(publicationId, postId, token, recipientEmail) {
  return beehiivFetch(`${API_BASE}/publications/${publicationId}/posts/${postId}/test_sends`, token, {
    method: "POST",
    body: JSON.stringify({ recipient_emails: [recipientEmail] }),
  });
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const token = requireEnv("BEEHIIV_API_KEY");
  const publicationId = requireEnv("BEEHIIV_PUBLICATION_ID");
  const payloadPath = options.input || findLatestPayload();
  const payload = readJson(payloadPath);

  const created = await createPost(publicationId, token, payload);
  const post = created?.data || {};
  console.log(`Beehiiv draft created: ${post.id || "(id not returned)"}`);
  if (post.web_url) console.log(`Beehiiv web URL: ${post.web_url}`);

  if (options.testEmail) {
    if (!post.id) throw new Error("Cannot send a test email because Beehiiv did not return a post id.");
    await sendTest(publicationId, post.id, token, options.testEmail);
    console.log(`Beehiiv test email requested for ${options.testEmail}`);
  }
}

try {
  await main();
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
