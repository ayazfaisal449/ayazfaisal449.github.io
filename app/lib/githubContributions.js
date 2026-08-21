export const GITHUB_USERNAME = "faisalayaz447";
export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`;

/** @param {number} count @param {number} max */
export function contributionLevel(count, max) {
  if (!count) return 0;
  if (!max) return 1;
  const ratio = count / max;
  if (ratio <= 0.25) return 1;
  if (ratio <= 0.5) return 2;
  if (ratio <= 0.75) return 3;
  return 4;
}

/** @param {{ weeks: Array<{ contributionDays: Array<{ contributionCount: number, date: string }> }> }} calendar */
export function flattenContributionWeeks(calendar) {
  const days = calendar.weeks.flatMap((week) => week.contributionDays);
  const max = Math.max(0, ...days.map((day) => day.contributionCount));
  return days.map((day) => ({
    date: day.date,
    count: day.contributionCount,
    level: contributionLevel(day.contributionCount, max)
  }));
}
