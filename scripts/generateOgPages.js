import fs from "node:fs";
import path from "node:path";

function escapeHtml(value = "") {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function truncateText(text = "", maxLength = 200) {
  const normalized = text.replace(/\s+/g, " ").trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 1).trim()}…`;
}

export function generateOgPages({
  distDir,
  postsPath,
  companyPath,
  siteUrl,
}) {
  const indexHtml = fs.readFileSync(path.join(distDir, "index.html"), "utf-8");
  const posts = JSON.parse(fs.readFileSync(postsPath, "utf-8"));
  const company = JSON.parse(fs.readFileSync(companyPath, "utf-8"));
  const baseUrl = siteUrl.replace(/\/$/, "");

  posts
    .filter((post) => post.isActive)
    .forEach((post) => {
      const postUrl = `${baseUrl}/bai-viet/${post.id}`;
      const title = `${post.name} | ${company.name}`;
      const description = truncateText(post.description, 200);
      const image = post.thumbnail || post.images?.[0] || company.thumbnail;

      const metaTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="${escapeHtml(company.name)}" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:image" content="${escapeHtml(image)}" />
    <meta property="og:image:secure_url" content="${escapeHtml(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:url" content="${escapeHtml(postUrl)}" />
    <meta property="og:locale" content="vi_VN" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(post.name)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(image)}" />`;

      const html = indexHtml
        .replace(/<title>.*?<\/title>/s, "")
        .replace("<head>", `<head>${metaTags}`);

      const outDir = path.join(distDir, "bai-viet", post.id);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, "index.html"), html, "utf-8");
    });
}
