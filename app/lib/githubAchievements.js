export const GITHUB_ACHIEVEMENTS_API =
  "https://github-achievements-api.wangrunlin.workers.dev";

/** @type {Record<string, { name: string, description: string }>} */
export const ACHIEVEMENT_META = {
  starstruck: {
    name: "Starstruck",
    description: "Created a repository that gained significant stars"
  },
  quickdraw: {
    name: "Quickdraw",
    description: "Closed an issue or pull request within five minutes of opening"
  },
  "pair-extraordinaire": {
    name: "Pair Extraordinaire",
    description: "Co-authored commits on merged pull requests"
  },
  "pull-shark": {
    name: "Pull Shark",
    description: "Opened pull requests that were merged"
  },
  "galaxy-brain": {
    name: "Galaxy Brain",
    description: "Answered discussions with accepted answers"
  },
  yolo: {
    name: "YOLO",
    description: "Merged a pull request without code review"
  },
  "arctic-code-vault": {
    name: "Arctic Code Vault",
    description: "Contributed to the 2020 GitHub Archive Program"
  },
  "public-sponsor": {
    name: "Public Sponsor",
    description: "Sponsored open source contributors through GitHub Sponsors"
  },
  "mars-2020-contributor": {
    name: "Mars 2020 Contributor",
    description: "Contributed to repositories used in the Mars 2020 mission"
  }
};

/** @param {number} tier */
export function achievementTierLabel(tier) {
  if (tier <= 1) return null;
  if (tier === 2) return "Bronze";
  if (tier === 3) return "Silver";
  if (tier === 4) return "Gold";
  return `Tier ${tier}`;
}

/** @param {string} type */
export function achievementDisplayName(type) {
  return ACHIEVEMENT_META[type]?.name || type.replace(/-/g, " ");
}

/** @param {string} type */
export function achievementDescription(type) {
  return ACHIEVEMENT_META[type]?.description || "GitHub profile achievement";
}
