import { Route, Routes } from "react-router-dom";
import { useLanguage } from "./hooks/useLanguage";
import { useScrollPersistence } from "./hooks/useScrollPersistence";
import { translations } from "./i18n/translations";
import { LanguageContext } from "./i18n/LanguageContext";

import LanguageTransition from "./components/LanguageTransition";
import SampleDataNotice from "./components/SampleDataNotice";
import HomePage from "./pages/HomePage";
import DealPage from "./pages/DealPage";
import AllDealsPage from "./pages/AllDealsPage";

export default function App() {
  const [lang, setLang, transitioning] = useLanguage();
  useScrollPersistence();

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <LanguageTransition active={transitioning} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<AllDealsPage />} />
        <Route path="/deal/:slug" element={<DealPage />} />
      </Routes>
      <SampleDataNotice />
    </LanguageContext.Provider>
  );
}
