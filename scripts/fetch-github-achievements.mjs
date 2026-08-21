import { writeFile, mkdir } from "node:fs/promises";
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

async function fetchAchievements() {
  const response = await fetch(`${API_BASE}/${USERNAME}`, {
    headers: {
      Accept: "application/json",
      "User-Agent": "faisal-ayaz-portfolio"
    }
  });

  if (!response.ok) {
    throw new Error(`Achievements API failed (${response.status})`);
  }

  const payload = await response.json();
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

async function main() {
  const data = await fetchAchievements();
  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(
    `Fetched ${data.achievements.length} achievements for ${data.username}`
  );
  console.log(`Wrote ${path.relative(root, outFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
