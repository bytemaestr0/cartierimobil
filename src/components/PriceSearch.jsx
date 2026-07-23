import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toSlug } from "../lib/slug";
import { navigateToTop } from "../lib/scrollTop";
import "./PriceSearch.css";

const SECTOR_KEYS = ["botanica", "centru", "riscani", "ciocana", "buiucani", "telecentru", "in-afara-orasului"];

export default function PriceSearch({
  t,
  initialKeyword = "",
  initialSector = "",
  initialPropertyType = "",
  initialDealType = "",
  initialBeds = "",
  initialBaths = "",
  initialMin = "",
  initialMax = "",
  onSearch,
  className = "",
  compact = false,
}) {
  const [keyword, setKeyword] = useState(initialKeyword);
  const [sector, setSector] = useState(initialSector);
  const [propertyType, setPropertyType] = useState(initialPropertyType);
  const [dealType, setDealType] = useState(initialDealType);
  const [beds, setBeds] = useState(initialBeds);
  const [baths, setBaths] = useState(initialBaths);
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);
  const navigate = useNavigate();

  const filters = { keyword, sector, propertyType, dealType, beds, baths, min, max };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(filters);
      return;
    }
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (sector) params.set("sector", sector);
    if (propertyType) params.set("propertyType", propertyType);
    if (dealType) params.set("dealType", dealType);
    if (beds) params.set("beds", beds);
    if (baths) params.set("baths", baths);
    if (min) params.set("min", min);
    if (max) params.set("max", max);
    navigateToTop(navigate, `/deals${params.toString() ? `?${params.toString()}` : ""}`);
  };

  return (
    <form className={`price-search ${className}`.trim()} onSubmit={handleSubmit}>
      {!compact && (
        <div className="price-search__row">
          <div className="price-search__field price-search__field--keyword">
            <input
              type="text"
              placeholder={t.search.keywordPlaceholder}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              aria-label={t.search.keywordPlaceholder}
            />
          </div>
        </div>
      )}

      {!compact && (
        <div className="price-search__row">
          <div className="price-search__field">
            <select value={sector} onChange={(e) => setSector(e.target.value)} aria-label={t.search.sectorAny}>
              <option value="">{t.search.sectorAny}</option>
              {SECTOR_KEYS.map((key) => (
                <option value={key} key={key}>
                  {t.search.sectors[key]}
                </option>
              ))}
            </select>
          </div>

          <div className="price-search__field">
            <select
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              aria-label={t.search.propertyTypeAny}
            >
              <option value="">{t.search.propertyTypeAny}</option>
              <option value="apartment">{t.search.propertyTypeApartment}</option>
              <option value="building">{t.search.propertyTypeBuilding}</option>
            </select>
          </div>

          <div className="price-search__field">
            <select value={dealType} onChange={(e) => setDealType(e.target.value)} aria-label={t.search.dealTypeAny}>
              <option value="">{t.search.dealTypeAny}</option>
              <option value="sale">{t.deals.badge.sale}</option>
              <option value="rent">{t.deals.badge.rent}</option>
            </select>
          </div>
        </div>
      )}

      <div className="price-search__row">
        {compact && (
          <>
            <div className="price-search__field price-search__field--keyword">
              <input
                type="text"
                placeholder={t.search.keywordPlaceholder}
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                aria-label={t.search.keywordPlaceholder}
              />
            </div>
            <div className="price-search__field price-search__field--wide">
              <select value={dealType} onChange={(e) => setDealType(e.target.value)} aria-label={t.search.dealTypeAny}>
                <option value="">{t.search.dealTypeAny}</option>
                <option value="sale">{t.deals.badge.sale}</option>
                <option value="rent">{t.deals.badge.rent}</option>
              </select>
            </div>
          </>
        )}

        {!compact && (
          <>
            <div className="price-search__field price-search__field--narrow">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder={t.search.bedsPlaceholder}
                value={beds}
                onChange={(e) => setBeds(e.target.value)}
                aria-label={t.search.bedsPlaceholder}
              />
            </div>
            <div className="price-search__field price-search__field--narrow">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder={t.search.bathsPlaceholder}
                value={baths}
                onChange={(e) => setBaths(e.target.value)}
                aria-label={t.search.bathsPlaceholder}
              />
            </div>
            <div className="price-search__field price-search__field--narrow">
              <input
                type="number"
                inputMode="numeric"
                min="0"
                placeholder={t.search.minPlaceholder}
                value={min}
                onChange={(e) => setMin(e.target.value)}
                aria-label={t.search.minPlaceholder}
              />
            </div>
          </>
        )}

        <div className="price-search__field price-search__field--narrow">
          <input
            type="number"
            inputMode="numeric"
            min="0"
            placeholder={t.search.maxPlaceholder}
            value={max}
            onChange={(e) => setMax(e.target.value)}
            aria-label={t.search.maxPlaceholder}
          />
        </div>

        <button type="submit" className="price-search__cta">
          {t.search.cta}
          <svg viewBox="0 0 20 20" width="15" height="15" aria-hidden="true">
            <path
              d="M4 10h12M11 5l5 5-5 5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </form>
  );
}

export { SECTOR_KEYS };
export function sectorToKey(sector) {
  return toSlug(sector);
}
