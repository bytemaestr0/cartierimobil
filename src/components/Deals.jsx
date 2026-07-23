import { Link, useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import { useDeals } from "../hooks/useDeals";
import { formatBedsLabel, formatBathsLabel } from "../lib/formatSpecs";
import { navigateToTop } from "../lib/scrollTop";
import "./Deals.css";

function getTitle(deal, lang) {
  if (lang === "en") return deal.titleEn;
  if (lang === "ru") return deal.titleRu;
  return deal.title;
}

function getWaveClass(index) {
  // Every card now uses the same "wave-2" silhouette (the rise from
  // right to left that the third card in each row used to have alone),
  // just with the row offset kept so rows still stack into a wave.
  const row = Math.floor(index / 3);
  return `deal-card deal-card--wave-2${row > 0 ? ` deal-card--row-${row}` : ""}`;
}

export default function Deals({ t, lang }) {
  const { deals, loading } = useDeals();
  const navigate = useNavigate();

  return (
    <section id="deals" className="deals">
      <div className="section-inner">
        <Reveal as="p" resetKey={lang} className="section-eyebrow">
          {t.deals.eyebrow}
        </Reveal>
        <Reveal as="h2" resetKey={lang} delay={60} className="section-title">
          {t.deals.title}
        </Reveal>
        <Reveal as="p" resetKey={lang} delay={120} className="deals__subtitle">
          {t.deals.subtitle}
        </Reveal>

        {loading ? (
          <div className="deals__grid">
            {[0, 1, 2].map((i) => (
              <div className={`deal-card deal-card--skeleton ${getWaveClass(i)}`} key={i} aria-hidden="true" />
            ))}
          </div>
        ) : (
          <div className="deals__grid">
            {deals.map((deal, i) => (
              <Reveal
                as={Link}
                to={`/deal/${deal.slug}`}
                resetKey={lang}
                delay={(i % 3) * 90}
                className={getWaveClass(i)}
                key={deal.id}
              >
                {/* Idle floating motion lives on this inner wrapper so it
                    never fights with the card's hover lift/scale transforms
                    or the wave layout's margin offsets. */}
                <div className="deal-card__float" style={{ animationDelay: `${(i % 3) * -1.4}s` }}>
                  <div className="deal-card__image-wrap">
                    <img
                      src={deal.image}
                      alt={getTitle(deal, lang)}
                      loading="lazy"
                      className="deal-card__image"
                    />
                    <span className={`deal-card__badge deal-card__badge--${deal.type}`}>
                      {deal.type === "sale" ? t.deals.badge.sale : t.deals.badge.rent}
                    </span>
                    <span className="deal-card__price">
                      {deal.price}
                      {deal.type === "rent" ? t.deals.perMonth : ""}
                    </span>
                  </div>
                  <div className="deal-card__body">
                    <h3 className="deal-card__title">{getTitle(deal, lang)}</h3>
                    <p className="deal-card__location">
                      <svg viewBox="0 0 20 20" width="14" height="14" aria-hidden="true">
                        <path
                          d="M10 2c-3 0-5.5 2.4-5.5 5.5 0 4 5.5 10.2 5.5 10.2s5.5-6.2 5.5-10.2C15.5 4.4 13 2 10 2z"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                        <circle cx="10" cy="7.5" r="1.8" fill="currentColor" />
                      </svg>
                      {deal.location}
                    </p>
                    <div className="deal-card__specs">
                      <span>{formatBedsLabel(deal, t.deals.specs)}</span>
                      <span className="dot">•</span>
                      <span>{formatBathsLabel(deal, t.deals.specs)}</span>
                      <span className="dot">•</span>
                      <span>
                        {deal.area} {t.deals.specs.area}
                      </span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal resetKey={lang} className="deals__cta-row">
          <button
            type="button"
            className="btn btn--outline"
            onClick={() => navigateToTop(navigate, "/deals")}
          >
            {t.deals.viewAll}
          </button>
        </Reveal>
      </div>
    </section>
  );
}
