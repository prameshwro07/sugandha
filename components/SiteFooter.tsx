import Image from "next/image";
import Link from "next/link";
import { Camera, Heading4, Mail, Music2, Phone, Share2 } from "lucide-react";
import { brand } from "@/lib/products";

export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-[#0F172A]">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">

        {/* Brand */}
        <div>
          <Image
            src="/sugandha_white_logo.png"
            alt="Sugandha"
            width={200}
            height={70}
          />

          <p className="mt-5 text-sm leading-7 text-slate-300">
            Discover premium alcohol-free attars crafted to leave a lasting
            impression. Elegant fragrances for every occasion.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Quick Links
          </h3>

          <ul className="mt-5 space-y-3">

            <li>
              <Link
                href="/"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Home
              </Link>
            </li>

            {/* <li>
              <Link
                href="/shop"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Shop
              </Link>
            </li> */}

            <li>
              <Link
                href="/about"
                className="text-slate-300 transition hover:text-sky-500"
              >
                About
              </Link>
            </li>


            <li>
              <Link
                href="/contact"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Contact
              </Link>
            </li>

          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Customer Care
          </h3>

          <ul className="mt-5 space-y-3">

            <li>
              <Link
                href="/order-tracking"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Order Tracking
              </Link>
            </li>

            <li>
              <Link
                href="/shipping"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Shipping Policy
              </Link>
            </li>

            <li>
              <Link
                href="/return-and-refund"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Returns & Refunds
              </Link>
            </li>

            <li>
              <Link
                href="/privacy-policy"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                href="/terms"
                className="text-slate-300 transition hover:text-sky-500"
              >
                Terms & Conditions
              </Link>
            </li>

          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-white">
            Connect With Us
          </h3>

          <div className="mt-5 flex flex-wrap gap-3">
            {/* 
            <a
              href="mailto:hello@sugandha.com"
            >
              <Image
                src="/gmail.png"
                alt="Email"
                width={22}
                height={22}
              />
            </a> */}

            <a
              href="https://www.facebook.com/profile.php?id=61592136763590"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={22}
                height={22}
              />
            </a>

            <a
              href="https://www.instagram.com/shopsugandha/"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={22}
                height={22}
              />
            </a>

            <a
              href="https://www.tiktok.com/@shopsugandha"
            >
              <Image
                src="/tiktok.png"
                alt="TikTok"
                width={22}
                height={22}
              />
            </a>

            <a
              href="https://wa.me/9779818849093"
            >
              <Image
                src="/whatsAppv2.0.png"
                alt="WhatsApp"
                width={22}
                height={22}
              />
            </a>

          </div>

          <p className="mt-6 text-sm text-slate-300">
            Follow us for new arrivals, exclusive offers and fragrance updates.
          </p>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-slate-200 md:flex-row">

          <p className="text-xs">
            © Copyright by Prameshwor Malla 2026 . All rights reserved.
          </p>
          {/* 
          <p>
            Crafted with ❤️ in Nepal
          </p> */}

        </div>
      </div>
    </footer>
  );
}
