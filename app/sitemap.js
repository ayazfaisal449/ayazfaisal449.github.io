import { SITE_URL } from "./lib/site";

/** @returns {import("next").MetadataRoute.Sitemap} */
export default function sitemap() {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    }
  ];
}
