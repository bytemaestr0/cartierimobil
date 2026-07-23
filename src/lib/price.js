// Deal prices are stored as display-ready strings (e.g. "€184,500" or
// "€650"). This pulls the plain number back out so we can filter/compare.
export function parsePrice(priceStr) {
  if (typeof priceStr === "number") return priceStr;
  if (!priceStr) return NaN;
  const digits = String(priceStr).replace(/[^0-9]/g, "");
  return digits ? Number(digits) : NaN;
}
