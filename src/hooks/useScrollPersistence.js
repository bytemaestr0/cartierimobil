import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export const SCROLL_KEY_PREFIX = "cc_scroll_pos:";

// Persists window scroll position to sessionStorage (per route) so it
// survives in-app navigation/re-renders but is cleared when the tab closes.
export function useScrollPersistence() {
  const location = useLocation();
  const restoredPath = useRef(null);

  useEffect(() => {
    const key = SCROLL_KEY_PREFIX + location.pathname;

    if (restoredPath.current !== location.pathname) {
      restoredPath.current = location.pathname;
      const saved = sessionStorage.getItem(key);
      if (saved !== null) {
        const y = parseInt(saved, 10);
        if (!Number.isNaN(y) && y > 0) {
          // Wait a tick so layout (images, fonts) has a chance to settle.
          requestAnimationFrame(() => {
            window.scrollTo({ top: y, behavior: "instant" in window ? "instant" : "auto" });
          });
        }
      }
    }

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        sessionStorage.setItem(key, String(window.scrollY));
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);
}
