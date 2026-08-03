import { Route, Routes } from "react-router-dom";
import { useLanguage } from "./hooks/useLanguage";
import { useScrollPersistence } from "./hooks/useScrollPersistence";
import { translations } from "./i18n/translations";
import { LanguageContext } from "./i18n/LanguageContext";
import { DealsProvider } from "./data/DealsProvider";
import { useDealsContext } from "./data/DealsContext";

import LanguageTransition from "./components/LanguageTransition";
import PageLoadTransition from "./components/PageLoadTransition";
import SampleDataNotice from "./components/SampleDataNotice";
import HomePage from "./pages/HomePage";
import DealPage from "./pages/DealPage";
import AllDealsPage from "./pages/AllDealsPage";

function AppShell() {
  const [lang, setLang, transitioning] = useLanguage();
  const { loading } = useDealsContext();
  useScrollPersistence();

  const t = translations[lang];

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      <LanguageTransition active={transitioning} />
      <PageLoadTransition ready={!loading} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/deals" element={<AllDealsPage />} />
        <Route path="/deal/:slug" element={<DealPage />} />
      </Routes>
      <SampleDataNotice />
    </LanguageContext.Provider>
  );
}

export default function App() {
  return (
    <DealsProvider>
      <AppShell />
    </DealsProvider>
  );
}
