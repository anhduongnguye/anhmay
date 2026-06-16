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

function upsertMeta(attr, key, content) {
  if (!content) return;

  const selector = `meta[${attr}="${key}"]`;
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }

  element.setAttribute("content", content);
}

function upsertCanonical(url) {
  if (!url) return;

  let element = document.head.querySelector('link[rel="canonical"]');
  
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

    document.title = title;
    
    // Basic meta
    upsertMeta("name", "description", description);
    
    // Canonical URL for SEO and social sharing
    upsertCanonical(url);
    
    // Open Graph tags for Facebook
    upsertMeta("property", "og:type", "article");
    upsertMeta("property", "og:site_name", companyName);
    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:image", image);
    upsertMeta("property", "og:image:width", "1200");
    upsertMeta("property", "og:image:height", "630");
    upsertMeta("property", "og:image:alt", post.name);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:locale", "vi_VN");
    
    // Twitter card tags
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", image);

    return () => {
      document.title = previousTitle;
      META_KEYS.forEach((key) => {
        if (key === "canonical") {
          document.head.querySelector('link[rel="canonical"]')?.remove();
        } else {
          const attr = key.startsWith("og:") ? "property" : "name";
          document.head.querySelector(`meta[${attr}="${key}"]`)?.remove();
        }
      });
    };
  }, [post, companyName]);
}
