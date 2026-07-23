import { useCallback, useEffect, useState } from "react";
import "./Carousel.css";

export default function Carousel({ images, altBase }) {
  const [index, setIndex] = useState(0);
  const count = images.length;

  const goTo = useCallback(
    (i) => {
      if (count === 0) return;
      setIndex(((i % count) + count) % count);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [next, prev]);

  if (count === 0) {
    return <div className="carousel carousel--empty">No photos yet</div>;
  }

  return (
    <div className="carousel">
      <div className="carousel__frame">
        {images.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${altBase} — ${i + 1}/${count}`}
            className={`carousel__slide ${i === index ? "is-active" : ""}`}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}

        {count > 1 && (
          <>
            <button
              type="button"
              className="carousel__nav carousel__nav--prev"
              onClick={prev}
              aria-label="Previous photo"
            >
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path
                  d="M12 4l-6 6 6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              onClick={next}
              aria-label="Next photo"
            >
              <svg viewBox="0 0 20 20" width="18" height="18">
                <path
                  d="M8 4l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span className="carousel__counter">
              {index + 1} / {count}
            </span>
          </>
        )}
      </div>

      {count > 1 && (
        <div className="carousel__thumbs">
          {images.map((src, i) => (
            <button
              key={src}
              type="button"
              className={`carousel__thumb ${i === index ? "is-active" : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to photo ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
