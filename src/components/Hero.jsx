import { useMemo } from "react";
import Reveal from "./Reveal";
import PriceSearch from "./PriceSearch";
import CountUp from "./CountUp";
import { useDealsContext } from "../data/DealsContext";
import heroBg from "../assets/hero/hero-bg.jpg";
import "./Hero.css";

export default function Hero({ t, lang }) {
  const { deals, loading } = useDealsContext();

  const stats = useMemo(() => {
    if (loading) return null;
    let houses = 0;
    let apartments = 0;
    let bedrooms = 0;
    for (const deal of deals) {
      if (deal.propertyType === "building") houses += 1;
      else apartments += 1;
      bedrooms += Number(deal.beds) || 0;
    }
    return { houses, apartments, bedrooms };
  }, [deals, loading]);

  return (
    <section id="top" className="hero">
      <img src={heroBg} alt="" aria-hidden="true" className="hero__bg" loading="eager" />
      <div className="hero__scrim" aria-hidden="true" />
      <div className="hero__fade" aria-hidden="true" />
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

        <Reveal resetKey={lang} delay={190} className="hero__stats">
          <div className="hero__stat">
            <CountUp value={stats?.houses ?? null} className="hero__stat-value" />
            <span className="hero__stat-label">{t.hero.stats.housesLabel}</span>
          </div>
          <div className="hero__stat">
            <CountUp value={stats?.apartments ?? null} className="hero__stat-value" />
            <span className="hero__stat-label">{t.hero.stats.apartmentsLabel}</span>
          </div>
          <div className="hero__stat">
            <CountUp value={stats?.bedrooms ?? null} className="hero__stat-value" />
            <span className="hero__stat-label">{t.hero.stats.bedroomsLabel}</span>
          </div>
        </Reveal>

        <Reveal resetKey={lang} delay={220} className="hero__search-row">
          <div className="hero__search-glass">
            <PriceSearch t={t} compact className="price-search--compact price-search--glass" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
