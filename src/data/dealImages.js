// Eagerly imports every image file inside src/assets/<slug>/*.
// Vite resolves this glob at build time, so it picks up ANY number of
// images placed in a deal's folder — no hardcoded filenames or counts.
const modules = import.meta.glob("../assets/*/*.{png,jpg,jpeg,webp,svg,avif}", {
  eager: true,
  import: "default",
});

// Build a map of slug -> sorted array of image URLs.
const bySlug = {};
for (const path in modules) {
  // path looks like "../assets/vila-grigorescu/photo-1.svg"
  const match = path.match(/\.\.\/assets\/([^/]+)\//);
  if (!match) continue;
  const slug = match[1];
  if (!bySlug[slug]) bySlug[slug] = [];
  bySlug[slug].push({ path, url: modules[path] });
}
for (const slug in bySlug) {
  bySlug[slug].sort((a, b) => a.path.localeCompare(b.path, undefined, { numeric: true }));
}

export function getDealImages(slug) {
  return (bySlug[slug] || []).map((entry) => entry.url);
}
