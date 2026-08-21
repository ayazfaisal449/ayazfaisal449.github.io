import { SITE_URL } from "./lib/site";

export const dynamic = "force-static";

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
