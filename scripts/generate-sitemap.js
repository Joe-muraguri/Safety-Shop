// Regenerates public/sitemap.xml with static pages + every published blog post.
// Runs automatically before `npm run build`; can also be run standalone via `npm run sitemap`.
import { readFileSync, existsSync, writeFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

const SITE_URL = "https://telcosafetymart.co.ke";
const OUTPUT_PATH = "public/sitemap.xml";

const STATIC_PAGES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
];

function loadDotEnv() {
  if (!existsSync(".env")) return;
  for (const line of readFileSync(".env", "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
    if (!(key in process.env)) process.env[key] = value;
  }
}

function formatDate(date) {
  return new Date(date).toISOString().slice(0, 10);
}

function urlEntry({ path, lastmod, changefreq, priority }) {
  return `  <url>\n    <loc>${SITE_URL}${path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`;
}

async function fetchPublishedPosts() {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("[sitemap] Missing Supabase env vars — writing static pages only.");
    return [];
  }

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { data, error } = await supabase
      .from("posts")
      .select("slug, created_at, updated_at")
      .eq("published", true);
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn("[sitemap] Could not fetch posts from Supabase — writing static pages only:", err.message);
    return [];
  }
}

async function main() {
  loadDotEnv();

  const today = formatDate(new Date());
  const entries = STATIC_PAGES.map((page) => urlEntry({ ...page, lastmod: today }));

  const posts = await fetchPublishedPosts();
  for (const post of posts) {
    entries.push(
      urlEntry({
        path: `/blog/${post.slug}`,
        lastmod: formatDate(post.updated_at || post.created_at),
        changefreq: "monthly",
        priority: "0.6",
      })
    );
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
  writeFileSync(OUTPUT_PATH, xml);
  console.log(`[sitemap] Wrote ${OUTPUT_PATH} with ${entries.length} URL(s) (${posts.length} blog post${posts.length === 1 ? "" : "s"}).`);
}

main();
