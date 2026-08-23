export type Product = {
  id: string;
  slug: string;

  name: string;

  price: number;
  originalPrice: number;

  images: string[];

  shortDescription: string;
  description: string;

  categories: string[];

  stockStatus: "in-stock" | "out-of-stock";

  featured: boolean;

  volume: string;

  rating: number;
  reviews: number;

  notes: string;
};

export type ComboOffer = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  originalPrice: number;
  price: number;
  items: string[];
};

export const brand = {
  name: "Sugandha Attar",
  legalName: "Sugandha Attar",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com",

  whatsappNumber:
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",

  esewaId: "9818849093",

  contactPhone:
    process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "9818849093",

  contactEmail:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ??
    "orders@sugandhaattar.com",

  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ??
    "https://facebook.com",

  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ??
    "https://instagram.com",

  tiktokUrl:
    process.env.NEXT_PUBLIC_TIKTOK_URL ??
    "https://tiktok.com",
};


export const comboOffers: ComboOffer[] = [
  {
    id: "combo-001",
    slug: "blueberry-cr7-combo",
    name: "Blueberry + CR7 Combo",
    description: "Two premium fragrances together at a special price.",
    image: "/combos/poshBluberryMusk+ChocolateMusk.png",
    originalPrice: 998,
    price: 899,
    items: ["Blueberry Musk", "CR7"],
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NP", {
    style: "currency",
    currency: "NPR",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getProduct(productId: string) {
  return products.find((product) => product.id === productId);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export const products: Product[] = [
  {
    id: "blueberry-musk",
    slug: "blueberry-musk",

    name: "Blueberry Musk Perfume Oil 6ml | Unisex ",

    price: 449,
    originalPrice: 599,

    images: [
      "/productImages/blue.png",
      "/productImages/blueberry1.png",
      "/productImages/blueberry2.png",
    ],

    shortDescription: "A sweet and refreshing blueberry fragrance blended with soft musk for a smooth, fruity, and long-lasting scent.",

    description:
      `Blueberry Musk is a delightful blend of juicy blueberry sweetness and warm, elegant musk. Its fresh fruity opening develops into a smooth and comforting aroma, creating a fragrance that feels modern, luxurious, and easy to wear. Perfect for everyday use, special occasions, or whenever you want to leave a memorable impression.`,

    categories: [
      "men",
      "women",
      "unisex",
      "new",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: false,

    volume: "6ml",

    rating: 4.82,
    reviews: 42,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "cr7-attar",
    slug: "cr7-attar",

    name: "CR7 Perfume-Oil 6ml | Unisex",

    price: 449,
    originalPrice: 599,

    images: [
      "/productImages/cr7.png",
      "/productImages/cr73.png",
      "/productImages/cr75.png",
    ],

    shortDescription: "A bold and energetic fragrance with fresh citrus, aromatic notes, and a warm woody finish—perfect for a confident, modern style.",

    description:
      `CR7 is a fresh, masculine fragrance designed for those who like to stand out. It opens with vibrant and refreshing notes, followed by an aromatic heart and a smooth woody base. The result is a clean, confident, and long-lasting scent that works perfectly for everyday wear, outings, and special occasions.`,

    categories: [
      "men",
      "unisex",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "6ml",

    rating: 4.79,
    reviews: 32,

    notes: "Fresh citrus, woods, amber",
  },

  {
    id: "hawas",
    slug: "hawas",

    name: "Hawas Perfume-Oil 6ml | Men ",

    price: 699,
    originalPrice: 799,

    images: [
      "/productImages/hawas1.webp",
      "/productImages/hawas2.jpeg",
    ],

    shortDescription: "A fresh, aquatic, and energetic fragrance with fruity notes and a smooth woody-musky finish.",

    description:
      `Hawas delivers a refreshing and modern fragrance with a vibrant aquatic character. Its fruity freshness blends beautifully with aromatic and subtly sweet notes, settling into a smooth, warm musky-woody base. Perfect for everyday wear, casual outings, and special occasions when you want a fresh and confident presence.`,

    categories: [
      "men",
      "best-seller",
      "attar",
      "new"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "6ml",

    rating: 4.82,
    reviews: 42,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "amaze4-gift-set",
    slug: "amaze4-gift-set",

    name: "Amaze 4 | Gift Set",

    price: 1999,
    originalPrice: 2499,

    images: [
      "/productImages/amaze4.webp",
      "/productImages/amaze41.webp",
      "/productImages/amaze42.webp",
    ],

    shortDescription: "Collection of fresh fruity premium attrs.",

    description:
      `This luxurious collection features four signature fragrances: Black De Orchid, Chocolate      Musk, Blueberry Musk, and Ameer Al Oudh, all beautifully presented in one stunning gift box.

      These 6 ML Roll-On's are perfect for everyday use or gifting, offering fine fragrances in a convenient, travel-friendly size.`,

    categories: [
      "combo",
      "new",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "6ml",

    rating: 4.8,
    reviews: 32,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "red-vanilla",
    slug: "red-vanilla",

    name: "Red Vanilla Perfume Oil 6ml | Ladies",

    price: 449,
    originalPrice: 599,

    images: [
      "/productImages/redVenilla1.jpg",
      "/productImages/redVanilla2.webp",
      "/productImages/redVanilla3.jpg",
    ],

    shortDescription: "A sweet, elegant, and captivating fragrance with rich vanilla, fruity sweetness, and a warm, sensual finish.",

    description:
      `Red Vanilla Attar is a beautifully sweet and feminine fragrance that blends luscious fruity notes with creamy vanilla and a soft, warm base. Its smooth and captivating aroma creates an elegant presence that is perfect for everyday wear, romantic evenings, and special occasions.`,

    categories: [
      "women",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "6ml",

    rating: 4.73,
    reviews: 23,

    notes: "Vanilla warmth, soft woods",
  },

  {
    id: "chocolate-musk",
    slug: "chocolate-musk",

    name: "Chocolate Musk Perfume Oil 6ml | Unisex",

    price: 299,
    originalPrice: 499,

    images: [
      "/productImages/chocolatemusk.png",
      "/productImages/chocolateMusk2.webp",
      "/productImages/chocolateMusk3.jpg",
    ],

    shortDescription: "A rich and irresistible blend of creamy chocolate and soft musk, creating a warm, sweet, and comforting aroma.",

    description:
      `Chocolate Musk Attar combines the delicious sweetness of creamy chocolate with the smooth warmth of musk. Its rich and cozy aroma creates a luxurious, indulgent fragrance that feels both comforting and captivating. Perfect for evening wear, special occasions, or whenever you want a sweet and memorable scent.`,

    categories: [
      "unisex",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "6ml",

    rating: 4.77,
    reviews: 39,

    notes: "Cocoa, musk, creamy resin",
  },

  {
    id: "eclaire",
    slug: "eclaire",

    name: "Eclaire Perfume-Oil 6ml | Ladies ",

    price: 699,
    originalPrice: 799,

    images: [
      "/productImages/Eclaire.png",
      "/productImages/Eclaire1.jpeg",
      "/productImages/Eclaire2.jpeg",
    ],

    shortDescription: "A creamy, sweet, and luxurious fragrance with delicious caramel, vanilla, and soft gourmand notes.",

    description:
      `Eclaire Attar is a rich gourmand fragrance that wraps you in the irresistible sweetness of creamy caramel, smooth vanilla, and delicate milky notes. Its warm and comforting aroma feels elegant, indulgent, and incredibly inviting. Perfect for cozy evenings, special occasions, or anyone who loves sweet and luxurious fragrances.`,

    categories: [
      "women",
      "new",
      "best-seller",
      "attar"
    ],

    stockStatus: "in-stock",

    featured: false,

    volume: "6ml",

    rating: 4.82,
    reviews: 42,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "french-tobacco",
    slug: "french-tobacco",

    name: "French Tobacco Perfume Oil | Gents",

    price: 499,
    originalPrice: 599,

    images: [
      "/productImages/frenchTobacco1.jpg",
      "/productImages/frenchTobacco2.webp",
      "/productImages/frenchTobacco3.webp",
    ],

    shortDescription: "A rich and sophisticated fragrance blending warm tobacco, sweet spices, and smooth woody notes for a bold, elegant aroma.",

    description:
      `French Tobacco Attar offers a warm and refined fragrance with the deep character of tobacco balanced by sweet, spicy, and woody accords. Its smooth and luxurious aroma creates a confident, sophisticated presence, making it especially suited for evenings, formal occasions, and cooler days.

      6ML Roll-On: Compact, travel-friendly, and alcohol-free perfect for carrying your signature scent wherever you go.`,

    categories: [
      "men",
      "unisex",
      "best-seller",
      "attar"
    ],

    stockStatus: "out-of-stock",

    featured: false,

    volume: "6ml",

    rating: 4.6,
    reviews: 32,

    notes: "Tobacco, amber, white musk",
  },

  {
    id: "posh-blueberry-musk",
    slug: "posh-blueberry-musk",

    name: "Posh Blueberry Musk 100ml Perfume | Unisex ",

    price: 1499,
    originalPrice: 1799,

    images: [
      "/productImages/poshBlueberry1.png",
      "/productImages/poshBlueberry.png",
      "/productImages/poshBlueberry2.png",
    ],

    shortDescription: "A sweet and refreshing blueberry fragrance blended with soft musk for a smooth, elegant, and long-lasting scent.",

    description:
      `Blueberry Musk Perfume is a delightful fruity-musky fragrance that combines the juicy sweetness of ripe blueberries with a soft, warm musk base. Its fresh and inviting character develops into a smooth, comforting aroma that feels modern and luxurious. Perfect for everyday wear, outings, and special occasions.

      100ML Perfume: A generous full-size bottle designed for regular use, allowing you to enjoy the captivating Blueberry Musk fragrance throughout the day.`,

    categories: [
      "men",
      "unisex",
      "perfume"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "100ml",

    rating: 4.8,
    reviews: 32,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "afnan-9pm",
    slug: "afnan-9pm",

    name: "Afnan 9PM 100ml Perfume | Men ",

    price: 4999,
    originalPrice: 6999,

    images: [
      "/productImages/9pm.jpg",
      "/productImages/9pm1.webp",
    ],

    shortDescription: "A warm, sweet, and seductive fragrance with fruity freshness, creamy vanilla, and rich amber notes.",

    description:
      `Afnan 9PM is a captivating evening fragrance with a sweet and sophisticated character. It opens with fresh fruity notes before developing into a warm, creamy heart and a smooth vanilla-amber base. Its rich and inviting aroma makes it an excellent choice for evenings, dates, parties, and special occasions.

      100ML Perfume: A full-size fragrance designed for evening wear, offering a smooth, memorable scent that leaves a confident and lasting impression.`,

    categories: [
      "men",
      "new",
      "perfume"
    ],

    stockStatus: "out-of-stock",

    featured: true,

    volume: "100ml",

    rating: 4.8,
    reviews: 32,

    notes: "Oud, blue citrus, dry amber",
  },

  {
    id: "chocolate_musk-blueberry_musk",
    slug: "chocolate_muskblueberry_musk",

    name: "Chocolate Musk 20ML + Blueberry Musk 6ML Combo",

    price: 1099,
    originalPrice: 1499,

    images: [
      "/productImages/combo1.jpeg",
      "/productImages/blueberry.png",
    ],

    shortDescription: "A perfect sweet & fresh fragrance combo — 20ML Chocolate Musk paired with 6ML Blueberry Musk, available together for just Rs. 1,099.",

    description:
      `Sweet meets fresh in this irresistible fragrance combo. This exclusive set combines the warm, creamy and addictive Chocolate Musk 20ML with the fresh, fruity and youthful Blueberry Musk 6ML.

      Whether you’re heading out for the day or looking for a sweeter scent for the evening, this combo gives you two different fragrance experiences in one package.`,

    categories: [
      "combo"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "20ml and 6ml",

    rating: 4.8,
    reviews: 32,

    notes: "Oud, blue citrus, dry amber",
  },
];