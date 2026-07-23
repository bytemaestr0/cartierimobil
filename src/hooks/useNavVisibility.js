import { useEffect, useRef, useState } from "react";

// Returns true when the navbar should be in its "raised" (mostly hidden) state.
export function useNavVisibility() {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(typeof window !== "undefined" ? window.scrollY : 0);
  const ticking = useRef(false);

  useEffect(() => {
    const THRESHOLD = 6; // ignore tiny jitter
    const REVEAL_ZONE = 80; // always show near the very top

    const handleScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const currentY = window.scrollY;
        const delta = currentY - lastY.current;

        if (currentY < REVEAL_ZONE) {
          setHidden(false);
        } else if (Math.abs(delta) > THRESHOLD) {
          setHidden(delta > 0);
        }

        lastY.current = currentY;
        ticking.current = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return hidden;
}
