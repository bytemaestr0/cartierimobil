# Cartier Imobil — Real Estate Site

A real estate landing page for **Cartier Imobil** (Chișinău, Moldova), built with React + Vite.
Property listings are managed in **Airtable** — add, edit, hide, or remove listings from a
spreadsheet-like table with no code changes required.

## Getting started

```bash
npm install
npm run dev       # start dev server
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint      # run oxlint
```

Without any setup, the site runs immediately with bundled sample listings.

## Contact

- **Address:** str. Miron Costin 14, Chișinău, Moldova 2001
- **Phone:** +373 79 029 473
- **Instagram:** [@cartierimobil.md](https://www.instagram.com/cartierimobil.md/)
- **TikTok:** [@cartierimobil.md](https://www.tiktok.com/@cartierimobil.md)

## What's inside

- **Hero** — intro section with company positioning and a price/sector/room search bar
- **Deals** — abstract wave-layout grid of property listings (desktop), loaded from Airtable
- **All deals page** (`/deals`) — full listing grid with sector, property type, deal type, room, bath, and price filters
- **Deal detail page** (`/deal/:slug`) — photo carousel, specs, inquiry form
- **Story** — company stats (1000+ clients, 3+ years)
- **Process** — how we work
- **Footer** — contact, social links, working hours

## Airtable setup

See the original template README for full Airtable field setup. Configure `.env`:

```env
VITE_AIRTABLE_BASE_ID=appXXXXXXXXXXXXXX
VITE_AIRTABLE_TOKEN=patXXXXXXXXXXXXXX
VITE_AIRTABLE_TABLE_NAME=Deals
```

In addition to the original fields (Title RO/EN/RU, Type, Price, Location, Beds, Baths, Area,
Description RO/EN/RU, Photos, Published, Order, Slug), the table now also supports:

- **Sector** (single line text / single select) — the city district, e.g. `Botanica`, `Centru`,
  `Rîșcani`, `Ciocana`, `Buiucani`, `Telecentru`. Used by the sector filter on the search bar.
- **Property Type** (single select: `apartment` or `building`) — defaults to `apartment` if
  left blank. `building` covers houses/villas.
- **Living Rooms** (number) — optional. Leave blank or `0` to hide it; otherwise the site shows
  it next to the bedroom count as e.g. "3 beds+1 living".

## Languages

Romanian (default), Russian, English — switch via the navbar.
