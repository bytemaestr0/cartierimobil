import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguageContext } from "../i18n/LanguageContext";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Deals from "../components/Deals";
import Story from "../components/Story";
import Process from "../components/Process";
import Footer from "../components/Footer";

export default function HomePage() {
  const { lang, setLang, t } = useLanguageContext();
  const location = useLocation();
  const navigate = useNavigate();
  const handledScrollState = useRef(false);

  useEffect(() => {
    const targetId = location.state?.scrollTo;
    if (!targetId || handledScrollState.current) return;
    handledScrollState.current = true;

    const el = document.getElementById(targetId);
    if (el) {
      // Skip the animated header scroll and jump straight there, since the
      // person already chose a destination from another page.
      el.scrollIntoView({ behavior: "instant" in window ? "instant" : "auto" });
    }
    // Clear the state so returning to this page later doesn't re-trigger it.
    navigate(location.pathname, { replace: true, state: {} });
  }, [location.pathname, location.state, navigate]);

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main>
        <Hero t={t} lang={lang} />
        <Deals t={t} lang={lang} />
        <Story t={t} lang={lang} />
        <Process t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
