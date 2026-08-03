import { useState } from "react";
import { useDealsContext } from "../data/DealsContext";
import "./SampleDataNotice.css";

export default function SampleDataNotice() {
  const { usingSampleData } = useDealsContext();
  const [dismissed, setDismissed] = useState(false);

  // Only ever shown in local/dev builds — never in a production build,
  // so a real site owner never sees this even if something's misconfigured.
  if (!import.meta.env.DEV || !usingSampleData || dismissed) return null;

  return (
    <div className="sample-data-notice">
      <span>
        Showing sample deals — Airtable isn't connected yet. See{" "}
        <code>README.md</code> to set it up.
      </span>
      <button type="button" onClick={() => setDismissed(true)} aria-label="Dismiss">
        ×
      </button>
    </div>
  );
}
