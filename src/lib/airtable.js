const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TOKEN = import.meta.env.VITE_AIRTABLE_TOKEN;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME || "Deals";

const API_ROOT = "https://api.airtable.com/v0";

import { toSlug } from "./slug";

export function isAirtableConfigured() {
  return Boolean(BASE_ID && TOKEN);
}

function normalizeRecord(record) {
  const f = record.fields || {};
  const photos = Array.isArray(f.Photos) ? f.Photos : [];

  return {
    id: record.id,
    slug: f.Slug ? toSlug(f.Slug) : toSlug(f["Title EN"] || f["Title RO"] || record.id),
    type: (f.Type || "sale").toLowerCase() === "rent" ? "rent" : "sale",
    price: f.Price != null ? formatPrice(f.Price) : "",
    priceRaw: f.Price ?? null,
    title: f["Title RO"] || "",
    titleEn: f["Title EN"] || f["Title RO"] || "",
    titleRu: f["Title RU"] || f["Title RO"] || "",
    location: f.Location || "",
    // "Sector" is the city district (e.g. Botanica, Centru) — kept separate
    // from the free-text Location so it can be used as an exact filter.
    sector: f.Sector || "",
    // "Property Type" distinguishes apartments from standalone
    // houses/villas ("building"). Defaults to apartment if not set.
    propertyType: (f["Property Type"] || "apartment").toLowerCase() === "building" ? "building" : "apartment",
    beds: f.Beds ?? 0,
    baths: f.Baths ?? 0,
    // Living rooms are optional — 0/empty means "not shown" on the card.
    livingRooms: f["Living Rooms"] ?? 0,
    area: f.Area ?? 0,
    descriptionRo: f["Description RO"] || "",
    descriptionEn: f["Description EN"] || f["Description RO"] || "",
    descriptionRu: f["Description RU"] || f["Description RO"] || "",
    // Cover image for the listing grid card.
    image: photos[0]?.thumbnails?.large?.url || photos[0]?.url || "",
    // Full gallery for the deal detail page carousel — any number of photos.
    images: photos.map((p) => p.url),
    published: f.Published !== false, // default to visible if the field is missing
    order: f.Order ?? 0,
  };
}

function formatPrice(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `€${num.toLocaleString("en-US")}`;
}

async function fetchAllRecords() {
  if (!isAirtableConfigured()) {
    throw new Error(
      "Airtable is not configured. Set VITE_AIRTABLE_BASE_ID and VITE_AIRTABLE_TOKEN in your .env file."
    );
  }

  const records = [];
  let offset;

  do {
    const url = new URL(`${API_ROOT}/${BASE_ID}/${encodeURIComponent(TABLE_NAME)}`);
    url.searchParams.set("pageSize", "100");
    if (offset) url.searchParams.set("offset", offset);

    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${TOKEN}` },
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      const message = body?.error?.message || res.statusText;
      throw new Error(`Airtable request failed (${res.status}): ${message}`);
    }

    const data = await res.json();
    records.push(...data.records);
    offset = data.offset;
  } while (offset);

  return records;
}

let cache = null;
let cachePromise = null;

// Fetches deals from Airtable, normalizes them into the app's deal shape,
// filters out unpublished ones, and sorts by the Order field. Result is
// cached for the lifetime of the page load to avoid refetching on every
// navigation between Home and a deal page.
export async function fetchDeals({ force = false } = {}) {
  if (cache && !force) return cache;
  if (cachePromise && !force) return cachePromise;

  cachePromise = fetchAllRecords()
    .then((records) => {
      const deals = records
        .map(normalizeRecord)
        .filter((d) => d.published)
        .sort((a, b) => a.order - b.order);
      cache = deals;
      return deals;
    })
    .finally(() => {
      cachePromise = null;
    });

  return cachePromise;
}
