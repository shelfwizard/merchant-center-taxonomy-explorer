export function JsonLd() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...shelfWizardOrg,
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            ...website,
          }),
        }}
      />
    </>
  );
}

const shelfWizardOrg = {
  "@type": "OnlineBusiness",
  name: "Shelf Wizard B.V.",
  description: "Google Shopping Ads without the risk",
  url: "https://shelfwizard.com",
  brand: {
    "@type": "Brand",
    slogan: "Google Shopping Ads without the risk",
    logo: {
      "@type": "ImageObject",
      "@id": "https://shelfwizard.com/logo.png",
      url: "https://shelfwizard.com/",
    },
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "sales@shelfwizard.com",
  },
  email: "sales@shelfwizard.com",
  address: {
    "@type": "PostalAddress",
    addressCountry: "NL",
    addressLocality: "Amsterdam",
    streetAddress: "Marco Polostraat 75 2",
    postalCode: "1057 WG",
    addressRegion: "Noord-Holland",
  },
  foundingDate: "2022-03-15",
  foundingLocation: "Amsterdam",
  vatID: "NL863740741B01",
  taxID: "85783951",
};

const website = {
  "@type": "WebSite",
  url: "https://google-taxonomy.shelfwizard.com",
  about:
    "Adding the google_product_category to your Google Shopping feed is essential for accurate product categorization, which improves product visibility in relevant searches, enhances ad targeting, boosts click-through rates, and ensures compliance with Google policies. This tool simplifies navigating Google’s complex taxonomy by parsing their taxonomy file and displaying it in a user-friendly format, making it easy to select the right categories for your products.",
};
