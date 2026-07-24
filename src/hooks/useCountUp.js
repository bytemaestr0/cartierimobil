import { useEffect, useRef, useState } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Animates a displayed integer from wherever it currently sits up to
// `target`, using an eased requestAnimationFrame loop. Re-triggers
// automatically whenever `target` changes (e.g. once real data arrives
// from Airtable) or whenever `start` flips from false to true (e.g. once
// the element scrolls into view).
export function useCountUp(target, { duration = 1400, start = true } = {}) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!start || target == null) return undefined;

    const from = fromRef.current;
    const to = target;

    if (from === to) {
      setDisplay(to);
      return undefined;
    }

    if (prefersReducedMotion()) {
      setDisplay(to);
      fromRef.current = to;
      return undefined;
    }

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
      const current = Math.round(from + (to - from) * eased);
      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        fromRef.current = to;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, start, duration]);

  return display;
}
