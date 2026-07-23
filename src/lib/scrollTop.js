import { SCROLL_KEY_PREFIX } from "../hooks/useScrollPersistence";

// Navigates to `path` (which may include a query string) and makes sure the
// new page starts at scrollY 0 — used for the "View offers" / "View all
// offers" actions, which should always land at the top of /deals, even if
// a previous visit to that route left a saved scroll position, and even
// though client-side routing doesn't reset scroll on its own.
export function navigateToTop(navigate, path) {
  const pathname = path.split("?")[0].split("#")[0];
  try {
    sessionStorage.removeItem(SCROLL_KEY_PREFIX + pathname);
  } catch {
    // sessionStorage can throw in locked-down/private contexts — ignore.
  }

  navigate(path);

  // Double rAF: run after the new route has painted, so this wins over
  // anything else that might try to adjust scroll on mount.
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
    });
  });
}
