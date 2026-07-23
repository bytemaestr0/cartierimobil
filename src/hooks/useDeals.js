import { useEffect, useState } from "react";
import { fetchDeals, isAirtableConfigured } from "../lib/airtable";
import { sampleDeals } from "../data/sampleDeals";

export function useDeals() {
  const [deals, setDeals] = useState(null);
  const [error, setError] = useState(null);
  const [usingSampleData, setUsingSampleData] = useState(false);

  useEffect(() => {
    let cancelled = false;

    if (!isAirtableConfigured()) {
      // No .env set up yet — show the bundled sample deals so the template
      // still looks complete out of the box, but flag it so a developer
      // notices in the console.
      console.warn(
        "[Cartier Imobil] Airtable is not configured — showing sample deals. " +
          "See README.md for setup instructions."
      );
      setDeals(sampleDeals);
      setUsingSampleData(true);
      return undefined;
    }

    fetchDeals()
      .then((result) => {
        if (cancelled) return;
        if (result.length === 0) {
          // Base is reachable but empty (or everything is unpublished).
          setDeals(sampleDeals);
          setUsingSampleData(true);
        } else {
          setDeals(result);
        }
      })
      .catch((err) => {
        if (cancelled) return;
        console.error("[Cartier Imobil] Failed to load deals from Airtable:", err);
        setError(err);
        setDeals(sampleDeals);
        setUsingSampleData(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    deals: deals ?? [],
    loading: deals === null,
    error,
    usingSampleData,
  };
}
