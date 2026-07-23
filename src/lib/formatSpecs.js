import { pluralize } from "./pluralize";

// "3 beds" / "1 bed", or "3 beds+1 living" when the listing has a living
// room set (non-null, non-zero).
export function formatBedsLabel(deal, specs) {
  const bedWord = pluralize(deal.beds, specs.bedOne, specs.bedOther);
  const beds = `${deal.beds} ${bedWord}`;

  const living = Number(deal.livingRooms);
  if (!living) return beds;

  const livingWord = pluralize(living, specs.livingOne, specs.livingOther);
  return `${beds}+${living} ${livingWord}`;
}

// "2 baths" / "1 bath"
export function formatBathsLabel(deal, specs) {
  return `${deal.baths} ${pluralize(deal.baths, specs.bathOne, specs.bathOther)}`;
}
