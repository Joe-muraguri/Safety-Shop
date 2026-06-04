// src/components/SEO.jsx
export default function SEO({ title, description, page = "home", products = [] }) {
  const siteName = "TelcoSafetyMart";
  const siteUrl = "https://telcosafetymart.co.ke";
  const defaultDescription = "Kenya's trusted supplier of certified industrial safety equipment. PPE, helmets, gloves, vests & more — delivered nationwide. ISO certified gear for construction, manufacturing & logistics.";

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Certified Safety Equipment in Kenya`;
  const metaDescription = description || defaultDescription;

  const pageKeywords = {
    home: "safety equipment Kenya, PPE Kenya, industrial safety gear Nairobi, helmets Kenya, safety gloves Kenya, reflective vests Kenya, construction safety equipment, safety equipment supplier Kenya, KEBS certified PPE, safety equipment Nairobi",
    about: "TelcoSafetyMart about, safety equipment company Kenya, certified PPE supplier Kenya, ISO certified safety gear, industrial safety Kenya",
    products: "buy safety equipment Kenya, PPE prices Kenya, safety helmets Kenya, safety gloves Nairobi, high visibility vests Kenya, respirators Kenya, safety footwear Kenya",
    contact: "contact TelcoSafetyMart, safety equipment quote Kenya, bulk PPE order Kenya, safety equipment WhatsApp Kenya",
  };

  const keywords = pageKeywords[page] || pageKeywords.home;
  const canonicalUrl = page === "home" ? siteUrl : `${siteUrl}/${page}`;

  if (typeof document !== "undefined") {
    document.title = fullTitle;

    const setMeta = (name, content, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setLink = (rel, href) => {
      let el = document.querySelector(`link[rel="${rel}"]`);
      if (!el) {
        el = document.createElement("link");
        el.setAttribute("rel", rel);
        document.head.appendChild(el);
      }
      el.setAttribute("href", href);
    };

    // Core meta
    setMeta("description", metaDescription);
    setMeta("keywords", keywords);
    setMeta("author", siteName);
    setMeta("robots", "index, follow");
    setMeta("language", "English");
    setMeta("geo.region", "KE");
    setMeta("geo.placename", "Kenya");
    setMeta("geo.position", "-1.2921;36.8219");
    setMeta("ICBM", "-1.2921, 36.8219");

    // Open Graph
    setMeta("og:type", "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", metaDescription, true);
    setMeta("og:site_name", siteName, true);
    setMeta("og:locale", "en_KE", true);
    setMeta("og:image", `${siteUrl}/og-image.jpeg`, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", metaDescription);
    setMeta("twitter:image", `${siteUrl}/og-image.jpeg`);

    setLink("canonical", canonicalUrl);

    // ── JSON-LD structured data ──────────────────────
    // Remove existing script if any
    const existing = document.querySelector('script[data-seo="ld-json"]');
    if (existing) existing.remove();

    const schema = [];

    // Organization schema — always present
    schema.push({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": siteName,
      "url": siteUrl,
      "logo": `${siteUrl}/og-image.jpeg`,
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+254701223920",
        "contactType": "sales",
        "areaServed": "KE"
      }
    });

    // Product schemas — only if products passed
    if (products.length > 0) {
      products.forEach((p) => {
        if (!p || p.price == null) return;
        schema.push({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": p.name,
          "description": p.shortDescription || p.name,
          "image": p.image,
          "offers": {
            "@type": "Offer",
            "url": siteUrl,
            "priceCurrency": "KES",
            "price": String(p.price),
            "availability": "https://schema.org/InStock",
            "seller": {
              "@type": "Organization",
              "name": siteName
            }
          }
        });
      });
    }

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-seo", "ld-json");
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }

  return null;
}