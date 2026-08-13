import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com"
  ),

  applicationName: "Sugandha",

  title: {
    default: "Sugandha | Perfumes & Attars in Nepal",
    template: "%s | Sugandha Nepal",
  },

  description:
    "Shop perfumes and attars online in Nepal. Discover Blueberry Musk, CR7, Chocolate Musk and more fragrances from Sugandha. Fast delivery across Kathmandu, Lalitpur and Bhaktapur.",

  keywords: [
    "perfume in Nepal",
    "attar in Nepal",
    "buy perfume online Nepal",
    "buy attar online Nepal",
    "perfume shop Nepal",
    "attar shop Nepal",
    "perfume Kathmandu",
    "attar Kathmandu",
    "Sugandha perfume",
    "Sugandha attar",
  ],

  authors: [
    {
      name: "Sugandha",
      url: "https://shopsugandha.com",
    },
  ],

  creator: "Sugandha",
  publisher: "Sugandha",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_NP",
    url: "https://shopsugandha.com",
    siteName: "Sugandha",
    title: "Sugandha | Perfumes & Attars in Nepal",
    description:
      "Shop perfumes and attars online in Nepal. Discover Blueberry Musk, CR7, Chocolate Musk and more fragrances from Sugandha.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Sugandha - Perfumes and Attars in Nepal",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Sugandha | Perfumes & Attars in Nepal",
    description:
      "Shop perfumes and attars online in Nepal. Discover premium fragrances from Sugandha.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://shopsugandha.com";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",

  "@id": `${baseUrl}/#organization`,

  name: "Sugandha",
  alternateName: "Sugandha Attar",

  url: baseUrl,

  logo: `${baseUrl}/logo.png`,

  description:
    "Sugandha is a Nepal-based online store offering perfumes and attars.",

  sameAs: [
    process.env.NEXT_PUBLIC_FACEBOOK_URL,
    process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    process.env.NEXT_PUBLIC_TIKTOK_URL,
  ].filter(Boolean),
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",

  "@id": `${baseUrl}/#website`,

  name: "Sugandha",

  alternateName: "Sugandha Attar",

  url: baseUrl,

  description:
    "Shop perfumes and attars online in Nepal from Sugandha.",

  publisher: {
    "@id": `${baseUrl}/#organization`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen font-sans" suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteSchema),
          }}
        />
        {children}
      </body>
    </html>
  );
}