import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { useLanguageContext } from "../i18n/LanguageContext";
import { useDeals } from "../hooks/useDeals";
import { formatBedsLabel, formatBathsLabel } from "../lib/formatSpecs";

import Navbar from "../components/Navbar";
import Carousel from "../components/Carousel";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import "./DealPage.css";

function getTitle(deal, lang) {
  if (lang === "en") return deal.titleEn;
  if (lang === "ru") return deal.titleRu;
  return deal.title;
}

function getDescription(deal, lang) {
  if (lang === "en") return deal.descriptionEn;
  if (lang === "ru") return deal.descriptionRu;
  return deal.descriptionRo;
}

export default function DealPage() {
  const { slug } = useParams();
  const { lang, setLang, t } = useLanguageContext();
  const { deals, loading } = useDeals();
  const deal = deals.find((d) => d.slug === slug);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar t={t} lang={lang} setLang={setLang} />
        <main className="deal-page">
          <div className="section-inner deal-page__inner">
            <div className="deal-page__loading">Loading…</div>
          </div>
        </main>
        <Footer t={t} lang={lang} />
      </>
    );
  }

  if (!deal) {
    return <Navigate to="/" replace />;
  }

  const title = getTitle(deal, lang);
  const priceLabel = deal.type === "rent" ? `${deal.price}${t.dealPage.perMonth}` : deal.price;
  const defaultMessage = t.dealPage.messageTemplate(title, priceLabel, deal.location);

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main className="deal-page">
        <div className="section-inner deal-page__inner">
          <Reveal as={Link} to="/" resetKey={lang} className="deal-page__back">
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
              <path
                d="M12 4l-6 6 6 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {t.dealPage.back}
          </Reveal>

          <div className="deal-page__layout">
            <Reveal as="div" resetKey={`${lang}-${slug}`} delay={60} className="deal-page__main">
              <Carousel images={deal.images} altBase={title} />

              <div className="deal-page__header">
                <span className={`deal-card__badge deal-card__badge--${deal.type} deal-page__badge`}>
                  {deal.type === "sale" ? t.dealPage.badge.sale : t.dealPage.badge.rent}
                </span>
                <h1 className="deal-page__title">{title}</h1>
                <p className="deal-page__location">
                  <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
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

                <div className="deal-page__specs">
                  <span>{formatBedsLabel(deal, t.dealPage.specs)}</span>
                  <span className="dot">•</span>
                  <span>{formatBathsLabel(deal, t.dealPage.specs)}</span>
                  <span className="dot">•</span>
                  <span>
                    {deal.area} {t.dealPage.specs.area}
                  </span>
                </div>

                <div className="deal-page__price">{priceLabel}</div>
              </div>

              <div className="deal-page__about">
                <h2 className="section-title deal-page__about-title">{t.dealPage.about}</h2>
                <p className="deal-page__description">{getDescription(deal, lang)}</p>
              </div>
            </Reveal>

            <Reveal
              as="div"
              resetKey={`${lang}-${slug}`}
              delay={140}
              className="deal-page__side"
            >
              <ContactForm
                key={`${lang}-${slug}`}
                t={t.dealPage}
                defaultMessage={defaultMessage}
                dealSlug={slug}
                dealTitle={getTitle(deal, lang)}
              />
            </Reveal>
          </div>
        </div>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
