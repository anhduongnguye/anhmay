import company from "../data/company.json";

export const SITE_NAME = company.name;

export function getSiteUrl() {
  if (import.meta.env.VITE_SITE_URL) {
    return import.meta.env.VITE_SITE_URL.replace(/\/$/, "");
  }
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return "";
}

export function getPostUrl(postId) {
  return `${getSiteUrl()}/bai-viet/${postId}`;
}
