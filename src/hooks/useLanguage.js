import { useCallback, useEffect, useRef, useState } from "react";
import { languages } from "../i18n/translations";

const STORAGE_KEY = "cc_lang";
const TRANSITION_MS = 480;

function getInitialLanguage() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && languages.includes(stored)) return stored;
  } catch {
    /* localStorage unavailable */
  }
  return "ro";
}

export function useLanguage() {
  const [lang, setLangState] = useState(getInitialLanguage);
  const [transitioning, setTransitioning] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const setLang = useCallback(
    (next) => {
      if (!languages.includes(next) || next === lang) return;
      setTransitioning(true);
      clearTimeout(timeoutRef.current);
      // Swap the copy right as the overlay reaches full coverage, then
      // let it settle back so the new language fades/wipes into view.
      timeoutRef.current = setTimeout(() => {
        setLangState(next);
        try {
          localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* localStorage unavailable */
        }
        requestAnimationFrame(() => {
          timeoutRef.current = setTimeout(() => setTransitioning(false), TRANSITION_MS);
        });
      }, TRANSITION_MS);
    },
    [lang]
  );

  return [lang, setLang, transitioning];
}
