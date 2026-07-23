import { useEffect, useRef, useState } from "react";

// Reveals an element the first time it scrolls into view. Because the
// "seen" state lives only in component memory (not localStorage), it
// naturally resets on page refresh. Passing a changing `resetKey` (e.g.
// the active language) also forces it to re-arm and animate again.
export function useRevealOnce(resetKey) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const seen = useRef(false);

  useEffect(() => {
    seen.current = false;
    setVisible(false);
  }, [resetKey]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (seen.current) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !seen.current) {
          seen.current = true;
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [resetKey]);

  return [ref, visible];
}
