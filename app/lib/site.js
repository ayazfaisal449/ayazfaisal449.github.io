export const SITE_URL = process.env.SITE_URL || "https://ayazfaisal449.github.io";
export const SECONDARY_URL = "https://stately-sprite-a9099d.netlify.app";
export const SITE_NAME = "Faisal Ayaz Portfolio";
export const SITE_TITLE = "Faisal Ayaz | PHP & Laravel Developer";
export const SITE_DESCRIPTION =
  "Experienced PHP and Laravel developer specializing in scalable backend systems, REST APIs, payment integrations, and production-ready web applications.";
export const SITE_KEYWORDS = [
  "Faisal Ayaz",
  "PHP Developer",
  "Laravel Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Portfolio",
  "Pakistan Developer"
];

/** Primary host is indexable; Netlify mirror uses noindex + canonical to GitHub Pages. */
export const IS_INDEXABLE = process.env.SEO_INDEX !== "false" && !process.env.NETLIFY;
