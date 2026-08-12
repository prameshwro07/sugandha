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
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"
  ),

  title: {
    default: "Sugandha - let's smell good",
    template: "%s | Sugandha - let's smell good",
  },

  description:
    "Premium attar fragrances with simple checkout and fast delivery.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Sugandha Attar",
    description:
      "Premium attar fragrances with simple checkout and fast delivery.",
    url: "/",
    siteName: "Sugandha Attar",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Sugandha Attar logo",
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Sugandha Attar",
    description:
      "Premium attar fragrances with simple checkout and fast delivery.",
    images: ["/logo.png"],
  },

  robots: {
    index: true,
    follow: true,
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
        {children}
      </body>
    </html>
  );
}