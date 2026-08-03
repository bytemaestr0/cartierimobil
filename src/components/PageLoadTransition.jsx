import { useEffect, useState } from "react";
import "./PageLoadTransition.css";

// Lightweight two-dot loader shown only once on the very first load,
// while deals data comes in from Airtable. Fades out as soon as data
// is ready instead of the previous logo wipe overlay.
export default function PageLoadTransition({ ready }) {
  const [mounted, setMounted] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!ready) return undefined;
    setExiting(true);
    const t = setTimeout(() => setMounted(false), 400);
    return () => clearTimeout(t);
  }, [ready]);

  if (!mounted) return null;

  return (
    <div
      className={`page-load-transition ${exiting ? "page-load-transition--exit" : ""}`}
      aria-hidden="true"
    >
      <div className="page-load-transition__dots">
        <span className="page-load-transition__dot" />
        <span className="page-load-transition__dot" />
      </div>
    </div>
  );
}
