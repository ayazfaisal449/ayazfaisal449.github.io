import { existsSync } from "node:fs";
import { writeFile, mkdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "data");
const outFile = path.join(outDir, "github-achievements.json");

const USERNAME = process.env.GITHUB_USERNAME || "faisalayaz447";
const API_BASE =
  process.env.GITHUB_ACHIEVEMENTS_API ||
  "https://github-achievements-api.wangrunlin.workers.dev";

function normalizePayload(payload) {
  if (!Array.isArray(payload?.achievements)) {
    throw new Error("Unexpected achievements API response");
  }

  return {
    username: USERNAME,
    total: payload.total || {
      raw: payload.achievements.length,
      weighted: payload.achievements.reduce((sum, item) => sum + (item.tier || 1), 0)
    },
    achievements: payload.achievements.map((item) => ({
      type: item.type,
      tier: item.tier || 1,
      image: item.image
    })),
    source: "github-achievements-api",
    fetchedAt: new Date().toISOString()
  };
}

async function fetchAchievements(allowRetry = true) {
  const response = await fetch(`${API_BASE}/${USERNAME}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "faisal-ayaz-portfolio"
    }
  });

  if (response.status === 429 && allowRetry) {
    console.warn("Achievements API rate limited (429). Retrying in 3 seconds...");
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return fetchAchievements(false);
  }

  if (!response.ok) {
    throw new Error(`Achievements API failed (${response.status})`);
  }

  return normalizePayload(await response.json());
}

async function loadCachedData() {
  if (!existsSync(outFile)) return null;

  try {
    const parsed = JSON.parse(await readFile(outFile, "utf8"));
    if (!Array.isArray(parsed?.achievements)) return null;
    return parsed;
  } catch {
    return null;
  }
}

async function main() {
  let data;
  let wroteFile = false;

  try {
    data = await fetchAchievements();
    console.log(`Fetched ${data.achievements.length} achievements for ${data.username}`);
  } catch (error) {
    console.warn(`Achievements API fetch failed: ${error.message}`);

    const cached = await loadCachedData();
    if (cached?.achievements.length) {
      console.warn(`Using cached achievements from ${path.relative(root, outFile)}`);
      data = cached;
    } else {
      console.warn("No cached achievements available; continuing with an empty list.");
      data = {
        username: USERNAME,
        total: { raw: 0, weighted: 0 },
        achievements: [],
        source: "unavailable",
        fetchedAt: new Date().toISOString()
      };
      await mkdir(outDir, { recursive: true });
      await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
      wroteFile = true;
    }
  }

  if (!wroteFile && data.source === "github-achievements-api") {
    await mkdir(outDir, { recursive: true });
    await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
    console.log(`Wrote ${path.relative(root, outFile)}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
