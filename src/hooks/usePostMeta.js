import { useEffect } from "react";
import { SITE_NAME } from "../constants/site";
import { getPostShareData } from "../utils/share";

const META_KEYS = [
  "description",
  "og:type",
  "og:site_name",
  "og:title",
  "og:description",
  "og:image",
  "og:image:width",
  "og:image:height",
  "og:image:alt",
  "og:url",
  "og:locale",
  "twitter:card",
  "twitter:title",
  "twitter:description",
  "twitter:image",
  "canonical",
];

function upsertMeta(attr, key, content, previousMeta) {
  if (!content) return;

  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!previousMeta.hasOwnProperty(key)) {
    previousMeta[key] = element ? element.getAttribute("content") : null;
  }

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url, previousCanonical) {
  if (!url) return;

  let element = document.head.querySelector('link[rel="canonical"]');
  if (!previousCanonical.hasOwnProperty("canonical")) {
    previousCanonical.canonical = element ? element.getAttribute("href") : null;
  }

  if (!element) {
    element = document.createElement("link");
    element.setAttribute("rel", "canonical");
    document.head.appendChild(element);
  }

  element.setAttribute("href", url);
}

export function usePostMeta(post, companyName = SITE_NAME) {
  useEffect(() => {
    if (!post) return;

    const { url, title, description, image } = getPostShareData(post, companyName);
    const previousTitle = document.title;
    const previousMeta = {};
    const previousCanonical = {};

    document.title = title;
    
    // Basic meta
    upsertMeta("name", "description", description, previousMeta);
    
    // Canonical URL for SEO and social sharing
    upsertCanonical(url, previousCanonical);
    
    // Open Graph tags for Facebook
    upsertMeta("property", "og:type", "article", previousMeta);
    upsertMeta("property", "og:site_name", companyName, previousMeta);
    upsertMeta("property", "og:title", title, previousMeta);
    upsertMeta("property", "og:description", description, previousMeta);
    upsertMeta("property", "og:image", image, previousMeta);
    upsertMeta("property", "og:image:width", "1200", previousMeta);
    upsertMeta("property", "og:image:height", "630", previousMeta);
    upsertMeta("property", "og:image:alt", post.name, previousMeta);
    upsertMeta("property", "og:url", url, previousMeta);
    upsertMeta("property", "og:locale", "vi_VN", previousMeta);
    
    // Twitter card tags
    upsertMeta("name", "twitter:card", "summary_large_image", previousMeta);
    upsertMeta("name", "twitter:title", title, previousMeta);
    upsertMeta("name", "twitter:description", description, previousMeta);
    upsertMeta("name", "twitter:image", image, previousMeta);

    return () => {
      document.title = previousTitle;

      Object.entries(previousMeta).forEach(([key, previousValue]) => {
        const attr = key.startsWith("og:") ? "property" : "name";
        const element = document.head.querySelector(`meta[${attr}="${key}"]`);
        if (!element) return;

        if (previousValue === null) {
          element.remove();
        } else {
          element.setAttribute("content", previousValue);
        }
      });

      const canonicalElement = document.head.querySelector('link[rel="canonical"]');
      if (canonicalElement) {
        if (previousCanonical.canonical === null) {
          canonicalElement.remove();
        } else {
          canonicalElement.setAttribute("href", previousCanonical.canonical);
        }
      }
    };
  }, [post, companyName]);
}
