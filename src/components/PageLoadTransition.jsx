import { useEffect, useState } from "react";
import logo from "../assets/brand/logo.png";
import "./LanguageTransition.css";
import "./PageLoadTransition.css";

// Same wipe/panel/logo visual as LanguageTransition, but driven by the
// deals fetch instead of a language switch, and shown only once on the
// very first load so users see the brand animation instead of a blank
// page or skeleton while Airtable data comes in.
export default function PageLoadTransition({ ready }) {
  const [mounted, setMounted] = useState(true);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    // Let the panels finish covering the screen before we consider the
    // overlay "settled" and eligible to unmount once data is ready.
    const t = setTimeout(() => setRevealed(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!ready || !revealed) return undefined;
    const t = setTimeout(() => setMounted(false), 550);
    return () => clearTimeout(t);
  }, [ready, revealed]);

  if (!mounted) return null;

  const exiting = ready && revealed;

  return (
    <div
      className={`lang-transition page-load-transition ${
        exiting ? "page-load-transition--exit" : "lang-transition--active"
      }`}
      aria-hidden="true"
    >
      <div className="lang-transition__panel lang-transition__panel--a" />
      <div className="lang-transition__panel lang-transition__panel--b" />
      <div className="lang-transition__mark">
        <img src={logo} alt="" className="lang-transition__logo page-load-transition__logo" />
      </div>
    </div>
  );
}
