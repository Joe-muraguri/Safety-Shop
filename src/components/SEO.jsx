// src/components/SEO.jsx
// Usage: <SEO title="..." description="..." page="home" />

export default function SEO({ title, description, page = "home" }) {
  const siteName = "Teclo Safety Mart";
  const siteUrl = "https://www.teclosafety.co.ke"; // update to your real domain
  const defaultDescription =
    "Kenya's trusted supplier of certified industrial safety equipment. PPE, helmets, gloves, vests & more — delivered nationwide. ISO certified gear for construction, manufacturing & logistics.";

  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} — Certified Safety Equipment in Kenya`;
  const metaDescription = description || defaultDescription;

  const pageKeywords = {
    home: "safety equipment Kenya, PPE Kenya, industrial safety gear Nairobi, helmets Kenya, safety gloves Kenya, reflective vests Kenya, construction safety equipment, safety equipment supplier Kenya, KEBS certified PPE, safety equipment Nairobi",
    about: "Teclo Safety Mart about, safety equipment company Kenya, certified PPE supplier Kenya, ISO certified safety gear, industrial safety Kenya",
    products: "buy safety equipment Kenya, PPE prices Kenya, safety helmets Kenya, safety gloves Nairobi, high visibility vests Kenya, respirators Kenya, safety footwear Kenya",
    contact: "contact Teclo Safety Mart, safety equipment quote Kenya, bulk PPE order Kenya, safety equipment WhatsApp Kenya",
  };

  const keywords = pageKeywords[page] || pageKeywords.home;
  const canonicalUrl = page === "home" ? siteUrl : `${siteUrl}/${page}`;

  // Inject tags into document head
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

    // Open Graph (Facebook, WhatsApp previews)
    setMeta("og:type", "website", true);
    setMeta("og:url", canonicalUrl, true);
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", metaDescription, true);
    setMeta("og:site_name", siteName, true);
    setMeta("og:locale", "en_KE", true);
    setMeta("og:image", `${siteUrl}/og-image.jpg`, true);
    setMeta("og:image:width", "1200", true);
    setMeta("og:image:height", "630", true);

    // Twitter card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", metaDescription);
    setMeta("twitter:image", `${siteUrl}/og-image.jpg`);

    // Canonical URL
    setLink("canonical", canonicalUrl);
  }

  return null;
}
