import {
  SITE_DESCRIPTION,
  SITE_TITLE,
  SITE_URL
} from "../lib/site";

export default function SeoJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "en"
      },
      {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Faisal Ayaz",
        url: SITE_URL,
        image: `${SITE_URL}/assets/profile.jpg`,
        jobTitle: "PHP & Laravel Developer",
        description: SITE_DESCRIPTION,
        sameAs: [
          "https://github.com/ayazfaisal449",
          "https://github.com/faisalayaz447",
          "https://www.linkedin.com/in/faisal-ayaz-239a16177"
        ]
      },
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profile`,
        url: SITE_URL,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        mainEntity: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        inLanguage: "en"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
