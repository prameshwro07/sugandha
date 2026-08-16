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

    shortDescription: "Fresh fruity premium attar.",

    description:
      "A sweet fruity fragrance with long-lasting performance.",

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

    shortDescription: "Fresh fruity premium attar.",

    description:
      "A sweet fruity fragrance with long-lasting performance.",

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

    shortDescription: "Fresh fruity premium attar.",

    description:
      "A sweet fruity fragrance with long-lasting performance.",

    categories: [
      "men",
      "best-seller",
      "attar"
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

    price: 1599,
    originalPrice: 1799,

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

    shortDescription: "Warm vanilla premium attar.",

    description:
      "Rich vanilla blended with soft woody notes.",

    categories: [
      "women",
      "unisex",
      "new",
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

    shortDescription: "Sweet chocolate musk attar.",

    description:
      "Creamy chocolate fragrance with smooth musk.",

    categories: [
      "unisex",
      "new",
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

    shortDescription: "Fresh fruity premium attar.",

    description:
      "A sweet fruity fragrance with long-lasting performance.",

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

    shortDescription: "Luxury tobacco fragrance.",

    description:
      "Elegant tobacco blended with amber and musk.",

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

    shortDescription: "Fresh fruity premium perfume.",

    description:
      "A sweet fruity fragrance with long-lasting performance.",

    categories: [
      "men",
      "unisex",
      "new",
      "perfume"
    ],

    stockStatus: "in-stock",

    featured: true,

    volume: "100ml",

    rating: 4.8,
    reviews: 32,

    notes: "Oud, blue citrus, dry amber",
  },
];