import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import AnnouncementBar from "@/components/announcementBar";

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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com"),
  title: {
    default: "Sugandha - let's smell good",
    template: "%s | Sugandha - let's smell good",
  },
  description: "Premium attar fragrances with simple checkout and fast delivery.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sugandha Attar",
    description: "Premium attar fragrances with simple checkout and fast delivery.",
    url: "/",
    siteName: "Sugandha Attar",
    images: [{ url: "/logo.png", width: 1200, height: 1200, alt: "Sugandha Attar logo" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sugandha Attar",
    description: "Premium attar fragrances with simple checkout and fast delivery.",
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
      // className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>

        <SiteHeader />
        <>
        <main className="flex-1 pt-[72px]">
          {children}
        </main>

        <SiteFooter />
        </>
        <Toaster
          position="top-right"
          richColors
          closeButton
          duration={3000}
        />
      </body>
    </html>
  );
}
