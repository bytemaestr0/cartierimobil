import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useLanguageContext } from "../i18n/LanguageContext";
import { useDealsContext } from "../data/DealsContext";
import { parsePrice } from "../lib/price";
import { toSlug } from "../lib/slug";
import { normalizeText } from "../lib/normalizeText";
import { formatBedsLabel, formatBathsLabel } from "../lib/formatSpecs";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Reveal from "../components/Reveal";
import PriceSearch from "../components/PriceSearch";
import SectionFloaters from "../components/SectionFloaters";
import "../components/Deals.css";
import "./AllDealsPage.css";

function getTitle(deal, lang) {
  if (lang === "en") return deal.titleEn;
  if (lang === "ru") return deal.titleRu;
  return deal.title;
}

export default function AllDealsPage() {
  const { lang, setLang, t } = useLanguageContext();
  const { deals, loading } = useDealsContext();
  const [searchParams, setSearchParams] = useSearchParams();

  const keywordParam = searchParams.get("q") || "";
  const sectorParam = searchParams.get("sector") || "";
  const propertyTypeParam = searchParams.get("propertyType") || "";
  const dealTypeParam = searchParams.get("dealType") || "";
  const bedsParam = searchParams.get("beds") || "";
  const bathsParam = searchParams.get("baths") || "";
  const minParam = searchParams.get("min") || "";
  const maxParam = searchParams.get("max") || "";

  const handleSearch = (filters) => {
    const params = new URLSearchParams();
    if (filters.keyword) params.set("q", filters.keyword);
    if (filters.sector) params.set("sector", filters.sector);
    if (filters.propertyType) params.set("propertyType", filters.propertyType);
    if (filters.dealType) params.set("dealType", filters.dealType);
    if (filters.beds) params.set("beds", filters.beds);
    if (filters.baths) params.set("baths", filters.baths);
    if (filters.min) params.set("min", filters.min);
    if (filters.max) params.set("max", filters.max);
    setSearchParams(params);
  };

  const filteredDeals = useMemo(() => {
    const minBeds = bedsParam ? Number(bedsParam) : null;
    const minBaths = bathsParam ? Number(bathsParam) : null;
    const minPrice = minParam ? Number(minParam) : null;
    const maxPrice = maxParam ? Number(maxParam) : null;
    const keyword = normalizeText(keywordParam.trim());

    return deals.filter((deal) => {
      if (keyword) {
        const haystack = normalizeText(
          [
            deal.title,
            deal.titleEn,
            deal.titleRu,
            deal.location,
            deal.sector,
            deal.descriptionRo,
            deal.descriptionEn,
            deal.descriptionRu,
          ]
            .filter(Boolean)
            .join(" ")
        );
        if (!haystack.includes(keyword)) return false;
      }

      if (sectorParam && toSlug(deal.sector) !== sectorParam) return false;
      if (propertyTypeParam && deal.propertyType !== propertyTypeParam) return false;
      if (dealTypeParam && deal.type !== dealTypeParam) return false;
      if (minBeds !== null && Number(deal.beds) < minBeds) return false;
      if (minBaths !== null && Number(deal.baths) < minBaths) return false;

      const price = parsePrice(deal.price);
      if (!Number.isNaN(price)) {
        if (minPrice !== null && price < minPrice) return false;
        if (maxPrice !== null && price > maxPrice) return false;
      }
      return true;
    });
  }, [
    deals,
    keywordParam,
    sectorParam,
    propertyTypeParam,
    dealTypeParam,
    bedsParam,
    bathsParam,
    minParam,
    maxParam,
  ]);

  const hasFilter = Boolean(
    keywordParam ||
      sectorParam ||
      propertyTypeParam ||
      dealTypeParam ||
      bedsParam ||
      bathsParam ||
      minParam ||
      maxParam
  );

  return (
    <>
      <Navbar t={t} lang={lang} setLang={setLang} />
      <main className="all-deals">
        <SectionFloaters theme="light" />
        <div className="section-inner">
          <Reveal as="p" resetKey={lang} className="section-eyebrow">
            {t.deals.eyebrow}
          </Reveal>
          <Reveal as="h1" resetKey={lang} delay={60} className="section-title">
            {t.deals.title}
          </Reveal>
          <Reveal as="p" resetKey={lang} delay={120} className="deals__subtitle">
            {t.deals.subtitle}
          </Reveal>

          <Reveal resetKey={lang} delay={160} className="all-deals__search-row">
            <PriceSearch
              t={t}
              initialKeyword={keywordParam}
              initialSector={sectorParam}
              initialPropertyType={propertyTypeParam}
              initialDealType={dealTypeParam}
              initialBeds={bedsParam}
              initialBaths={bathsParam}
              initialMin={minParam}
              initialMax={maxParam}
              onSearch={handleSearch}
            />
          </Reveal>

          {hasFilter && !loading && (
            <div className="all-deals__results-row">
              <span className="all-deals__results-count">
                {t.search.resultsLabel(filteredDeals.length)}
              </span>
              <button
                type="button"
                className="all-deals__clear"
                onClick={() => setSearchParams(new URLSearchParams())}
              >
                {t.search.clear}
              </button>
            </div>
          )}

          {loading ? (
            <div className="all-deals__grid">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="deal-card deal-card--skeleton" key={i} aria-hidden="true" />
              ))}
            </div>
          ) : filteredDeals.length === 0 ? (
            <p className="all-deals__empty">{t.search.noResults}</p>
          ) : (
            <div className="all-deals__grid">
              {filteredDeals.map((deal, i) => (
                <Reveal
                  as={Link}
                  to={`/deal/${deal.slug}`}
                  resetKey={`${lang}-${keywordParam}-${sectorParam}-${propertyTypeParam}-${dealTypeParam}-${bedsParam}-${bathsParam}-${minParam}-${maxParam}`}
                  delay={(i % 3) * 90}
                  className="deal-card"
                  key={deal.id}
                >
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
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer t={t} lang={lang} />
    </>
  );
}
