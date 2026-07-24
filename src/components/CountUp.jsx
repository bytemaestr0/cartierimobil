import { useEffect, useRef, useState } from "react";
import { useCountUp } from "../hooks/useCountUp";

// `value` is null while the real count is still loading (e.g. from
// Airtable) — we show a placeholder dash until it arrives, then count
// up from 0 to the real number as soon as the element is in view.
export default function CountUp({ value, duration = 1400, suffix = "", className = "" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const display = useCountUp(value, { duration, start: inView && value != null });

  return (
    <span ref={ref} className={className}>
      {value == null ? "–" : `${display}${suffix}`}
    </span>
  );
}
