// Vercel serverless function: POST /api/request
// Receives a "request to see a deal" submission from ContactForm and writes
// it to Airtable as a new record. Airtable Automations (configured in the
// Airtable UI, not here) handle sending the actual notification — e.g.
// "When record created in Requests -> send email".
//
// IMPORTANT: this file runs server-side only. AIRTABLE_WRITE_TOKEN is never
// sent to the browser. Do NOT prefix it with VITE_ or it will be bundled
// into the client JS and exposed to anyone who opens dev tools.

const REQUESTS_BASE_ID = process.env.AIRTABLE_REQUESTS_BASE_ID; // separate base, holds only Requests
const WRITE_TOKEN = process.env.AIRTABLE_WRITE_TOKEN; // server-only, scoped to the requests base only
const REQUESTS_TABLE = process.env.AIRTABLE_REQUESTS_TABLE || "Requests";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!REQUESTS_BASE_ID || !WRITE_TOKEN) {
    console.error("Airtable write env vars missing");
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const { name, email, phone, message, dealSlug, dealTitle } = req.body || {};

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Very small honeypot / sanity limits to cut down on spam and abuse
  if (String(name).length > 200 || String(message || "").length > 5000) {
    return res.status(400).json({ error: "Input too long" });
  }

  try {
    const airtableRes = await fetch(
      `https://api.airtable.com/v0/${REQUESTS_BASE_ID}/${encodeURIComponent(REQUESTS_TABLE)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${WRITE_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Name: name,
            Email: email,
            Phone: phone || "",
            Message: message || "",
            "Deal Slug": dealSlug || "",
            "Deal Title": dealTitle || "",
            "Submitted At": new Date().toISOString(),
          },
        }),
      }
    );

    if (!airtableRes.ok) {
      const body = await airtableRes.json().catch(() => ({}));
      console.error("Airtable write failed:", airtableRes.status, body);
      return res.status(502).json({ error: "Failed to save request" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Request handler error:", err);
    return res.status(500).json({ error: "Unexpected server error" });
  }
}
