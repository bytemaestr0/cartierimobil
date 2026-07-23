// Bundled fallback/demo data, used when Airtable isn't configured (or is
// unreachable) so the template still looks complete out of the box.
import { getDealImages } from "./dealImages";

const rawDeals = [
  {
    id: 1,
    slug: "vila-grigorescu",
    type: "sale",
    price: "€184,500",
    title: "Vilă cu grădină în Botanica",
    titleEn: "Garden villa in Botanica",
    titleRu: "Вилла с садом в Ботанике",
    location: "Chișinău, Botanica",
    sector: "Botanica",
    propertyType: "building",
    beds: 4,
    baths: 3,
    livingRooms: 1,
    area: 210,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Vilă spațioasă cu grădină privată, în una dintre cele mai căutate zone din Botanica. Finisaje de calitate, lumină naturală generoasă și liniște deplină, la doar câțiva pași de parc.",
    descriptionEn:
      "Spacious villa with a private garden in one of Botanica's most sought-after areas. Quality finishes, generous natural light, and complete quiet just steps from the park.",
    descriptionRu:
      "Просторная вилла с частным садом в одном из самых востребованных районов Ботаники. Качественная отделка, много естественного света и полная тишина в двух шагах от парка.",
  },
  {
    id: 2,
    slug: "apartament-centru-vechi",
    type: "rent",
    price: "€650",
    title: "Apartament modern, Centru",
    titleEn: "Modern apartment, city center",
    titleRu: "Современная квартира в центре",
    location: "Chișinău, Centru",
    sector: "Centru",
    propertyType: "apartment",
    beds: 2,
    baths: 1,
    livingRooms: 0,
    area: 68,
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Apartament renovat recent, situat în inima centrului Chișinăului. Bucătărie complet utilată, mobilier modern și acces facil la restaurante, magazine și transport public.",
    descriptionEn:
      "Recently renovated apartment in the heart of Chișinău. Fully equipped kitchen, modern furniture, and easy access to restaurants, shops, and public transport.",
    descriptionRu:
      "Недавно отремонтированная квартира в самом центре Кишинёва. Полностью оборудованная кухня, современная мебель и удобный доступ к ресторанам, магазинам и транспорту.",
  },
  {
    id: 3,
    slug: "casa-traditionala-bistrita",
    type: "sale",
    price: "€96,000",
    title: "Casă tradițională cu curte",
    titleEn: "Traditional house with courtyard",
    titleRu: "Традиционный дом с двором",
    location: "Chișinău, Rîșcani",
    sector: "Rîșcani",
    propertyType: "building",
    beds: 3,
    baths: 2,
    livingRooms: 0,
    area: 140,
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Casă cu specific tradițional, curte generoasă și dependințe utile. Ideală pentru o familie care își dorește spațiu, verdeață și liniștea unui cartier rezidențial din Rîșcani.",
    descriptionEn:
      "A house with traditional character, a generous courtyard, and useful outbuildings. Ideal for a family wanting space, greenery, and the calm of a residential Rîșcani neighborhood.",
    descriptionRu:
      "Дом с традиционным характером, просторным двором и полезными хозяйственными постройками. Идеален для семьи, желающей простора, зелени и спокойствия жилого района Рышкановка.",
  },
  {
    id: 4,
    slug: "penthouse-terasa",
    type: "sale",
    price: "€315,000",
    title: "Penthouse cu terasă panoramică",
    titleEn: "Penthouse with panoramic terrace",
    titleRu: "Пентхаус с панорамной террасой",
    location: "Chișinău, Ciocana",
    sector: "Ciocana",
    propertyType: "apartment",
    beds: 3,
    baths: 2,
    livingRooms: 1,
    area: 158,
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Penthouse de excepție cu terasă panoramică și priveliște deschisă spre oraș. Finisaje premium, spații generoase și un living deschis, perfect pentru relaxare și evenimente.",
    descriptionEn:
      "An exceptional penthouse with a panoramic terrace and open city views. Premium finishes, generous spaces, and an open living area, perfect for relaxing or hosting.",
    descriptionRu:
      "Исключительный пентхаус с панорамной террасой и видом на город. Премиальная отделка, просторные помещения и открытая гостиная — идеально для отдыха и приёмов.",
  },
  {
    id: 5,
    slug: "studio-langa-parc",
    type: "rent",
    price: "€420",
    title: "Studio luminos aproape de parc",
    titleEn: "Bright studio near the park",
    titleRu: "Светлая студия рядом с парком",
    location: "Chișinău, Buiucani",
    sector: "Buiucani",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    livingRooms: 0,
    area: 42,
    image:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Studio compact și luminos, situat la câțiva pași de Valea Morilor. Perfect pentru o persoană sau un cuplu care caută confort și o locație liniștită, dar bine conectată la oraș.",
    descriptionEn:
      "A compact, bright studio just steps from Valea Morilor park. Perfect for a single person or a couple looking for comfort and a quiet location well connected to the city.",
    descriptionRu:
      "Компактная светлая студия в нескольких шагах от парка Валя Морilor. Идеально для одного человека или пары, ищущих комфорт и тихое, но удобно расположенное место.",
  },
  {
    id: 6,
    slug: "casa-familie-sibiu",
    type: "sale",
    price: "€228,000",
    title: "Casă de familie, zonă liniștită",
    titleEn: "Family house, quiet area",
    titleRu: "Семейный дом в тихом районе",
    location: "Chișinău, Telecentru",
    sector: "Telecentru",
    propertyType: "building",
    beds: 4,
    baths: 2,
    livingRooms: 1,
    area: 175,
    image:
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=900&q=80",
    descriptionRo:
      "Casă generoasă într-o zonă liniștită din Telecentru, ideală pentru familii. Camere spațioase, grădină amenajată și vecinătate sigură, aproape de școli și grădinițe.",
    descriptionEn:
      "A generous house in a quiet Telecentru area, ideal for families. Spacious rooms, a landscaped garden, and a safe neighborhood close to schools and kindergartens.",
    descriptionRu:
      "Просторный дом в тихом районе Телецентр, идеальный для семьи. Просторные комнаты, ухоженный сад и безопасный район рядом со школами и детскими садами.",
  },
];

export const sampleDeals = rawDeals.map((deal) => ({
  ...deal,
  images: getDealImages(deal.slug),
}));
