import Reveal from "./Reveal";
import PriceSearch from "./PriceSearch";
import "./Hero.css";

export default function Hero({ t, lang }) {
  return (
    <section id="top" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__content">
        <Reveal as="p" resetKey={lang} className="hero__eyebrow">
          {t.hero.eyebrow}
        </Reveal>
        <Reveal as="h1" resetKey={lang} delay={80} className="hero__title">
          {t.hero.title.split("\n").map((line, i) => (
            <span className="hero__title-line" key={i}>
              {line}
            </span>
          ))}
        </Reveal>
        <Reveal as="p" resetKey={lang} delay={160} className="hero__subtitle">
          {t.hero.subtitle}
        </Reveal>
        <Reveal resetKey={lang} delay={200} className="hero__search-row">
          <PriceSearch t={t} compact className="price-search--compact" />
        </Reveal>
      </div>
      <div className="hero__floaters" aria-hidden="true">
        <div className="floater floater--a" />
        <div className="floater floater--b" />
        <div className="floater floater--c" />
      </div>
    </section>
  );
}
