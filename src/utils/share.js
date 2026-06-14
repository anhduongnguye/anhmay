import { getPostUrl } from "../constants/site";

export function truncateText(text = "", maxLength = 160) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

export function getPostShareData(post, companyName = "") {
  const url = getPostUrl(post.id);
  const title = companyName ? `${post.name} | ${companyName}` : post.name;
  const description = truncateText(post.description, 200);
  const image = post.thumbnail || post.images?.[0] || "";

  return { url, title, description, image };
}

export function getFacebookShareUrl(url) {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
}

export function getZaloShareUrl(url) {
  return `https://button-share.zalo.me/share_inline?layout=2&href=${encodeURIComponent(url)}`;
}

export async function copyToClipboard(text) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return true;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();

  try {
    document.execCommand("copy");
    return true;
  } catch {
    return false;
  } finally {
    document.body.removeChild(textarea);
  }
}

export function canNativeShare() {
  return typeof navigator !== "undefined" && typeof navigator.share === "function";
}

export async function nativeShare({ title, text, url }) {
  if (!canNativeShare()) return false;
  await navigator.share({ title, text, url });
  return true;
}
