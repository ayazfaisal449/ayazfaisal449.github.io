import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnv } from "./load-env.mjs";

loadEnv();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const outDir = path.join(root, "public", "data");
const outFile = path.join(outDir, "github-contributions.json");

const USERNAME = process.env.GITHUB_USERNAME || "faisalayaz447";
const TOKEN = process.env.GITHUB_TOKEN || "";

const AUTH_QUERY = `
  query {
    viewer {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

const PUBLIC_QUERY = `
  query($login: String!) {
    user(login: $login) {
      login
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
      }
    }
  }
`;

function contributionLevel(count, max) {
  if (!count) return 0;
  if (!max) return 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

function normalizeWeeksFromDays(days) {
  const weeks = [];
  for (let index = 0; index < days.length; index += 7) {
    weeks.push(days.slice(index, index + 7));
  }
  return weeks;
}

function buildPayload({ username, totalContributions, days, includesPrivate, source }) {
  const max = Math.max(0, ...days.map((day) => day.count));
  const normalizedDays = days.map((day) => ({
    date: day.date,
    count: day.count,
    level: typeof day.level === "number" ? day.level : contributionLevel(day.count, max)
  }));

  return {
    username,
    totalContributions,
    includesPrivate,
    weeks: normalizeWeeksFromDays(normalizedDays),
    source,
    fetchedAt: new Date().toISOString()
  };
}

async function fetchFromProfileApi() {
  const response = await fetch(
    `https://github-contributions-api.jogruber.de/v4/${USERNAME}?y=last`
  );
  if (!response.ok) {
    throw new Error(`Profile contributions API failed (${response.status})`);
  }

  const payload = await response.json();
  const contributions = Array.isArray(payload) ? payload : payload.contributions;
  if (!Array.isArray(contributions)) {
    throw new Error("Unexpected profile contributions API response");
  }

  return buildPayload({
    username: USERNAME,
    totalContributions:
      payload.total?.lastYear ??
      contributions.reduce((sum, day) => sum + day.count, 0),
    days: contributions,
    includesPrivate: true,
    source: "github-profile"
  });
}

async function fetchFromGraphQL() {
  const authenticated = Boolean(TOKEN);
  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "User-Agent": "faisal-ayaz-portfolio",
      ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
    },
    body: JSON.stringify({
      query: authenticated ? AUTH_QUERY : PUBLIC_QUERY,
      variables: authenticated ? undefined : { login: USERNAME }
    })
  });

  if (!response.ok) {
    throw new Error(`GitHub GraphQL failed (${response.status})`);
  }

  const payload = await response.json();
  if (payload.errors?.length) {
    throw new Error(payload.errors.map((error) => error.message).join("; "));
  }

  const node = authenticated ? payload.data?.viewer : payload.data?.user;
  const calendar = node?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error("Missing contribution calendar data");
  }

  const days = calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount
    }))
  );

  return buildPayload({
    username: node.login || USERNAME,
    totalContributions: calendar.totalContributions,
    days,
    includesPrivate: authenticated,
    source: authenticated ? "github-graphql-auth" : "github-graphql-public"
  });
}

async function main() {
  let data;

  try {
    data = await fetchFromProfileApi();
    console.log(
      `Fetched ${data.totalContributions} contributions for ${data.username} from GitHub profile`
    );
  } catch (error) {
    console.warn(`Profile API fetch failed: ${error.message}`);
    console.warn("Falling back to GitHub GraphQL...");
    data = await fetchFromGraphQL();
    console.log(
      `Fetched ${data.totalContributions} contributions for ${data.username} from GraphQL`
    );
  }

  if (data.totalContributions === 0) {
    try {
      const graphqlData = await fetchFromGraphQL();
      if (graphqlData.totalContributions > 0) {
        data = graphqlData;
      }
    } catch {
      // Keep profile API payload even if empty.
    }
  }

  await mkdir(outDir, { recursive: true });
  await writeFile(outFile, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`Wrote ${path.relative(root, outFile)}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
