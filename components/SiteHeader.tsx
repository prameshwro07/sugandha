"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products, formatPrice } from "@/lib/products";
import { Search, House, ShoppingBag, Phone, Info, UserRound, ShoppingCart } from "lucide-react";
import { useCart } from "@/src/store/cart";
import { useRouter } from "next/navigation";
import AnnouncementBar from "./announcementBar";
import { motion, useAnimation } from "framer-motion";

export function SiteHeader() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase()),
  );
  const [mounted, setMounted] = useState(true);
  const items = useCart((state) => state.items);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const controls = useAnimation();

  const cartAnimationKey = useCart(
    (state) => state.cartAnimationKey
  );

  useEffect(() => {
    controls.start({
      scale: [1, 1.5, 1],
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    });
  }, [cartAnimationKey, controls]);
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="fixed top-0 z-50 w-full bg-white border-b border-slate-200">
      <AnnouncementBar />

      <header className="mx-auto flex h-11 w-full max-w-7xl items-center px-4 justify-between">
        {/* Transparent Click Area */}
        <div
          className={`fixed inset-0 z-30 bg-transparent transition-opacity duration-300 ${mobileMenuOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
            }`}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Mobile Drawer */}
        <div
          className={`fixed left-0 top-[68px] border-t z-40 flex h-[calc(100dvh-68px)] w-[78%] flex-col border-r border-slate-200 bg-white transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${mobileMenuOpen
            ? "translate-x-0 opacity-100"
            : "-translate-x-full opacity-0"
            }`}
        >
          {/* Navigation */}
          <nav className="mt-3 flex flex-col px-3">

            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <House size={16} />
              Home
            </Link>

            <Link
              href="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <ShoppingBag size={16} />
              Shop
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Info size={16} />
              About Us
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-slate-700 transition hover:bg-sky-50 hover:text-sky-600"
            >
              <Phone size={16} />
              Contact
            </Link>

          </nav>

          {/* Footer */}
          <div className="mt-auto border-t border-slate-200 p-5">
            <p className="font-semibold text-slate-900">Sugandha</p>
            <p className="text-sm text-slate-500">Let's Smell Good.</p>
          </div>
        </div>

        {/* Desktop */}
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex h-9 w-9 flex-col justify-center gap-[5px] transition-transform duration-150 active:scale-90 md:hidden"
          aria-label="Open menu"
        >
          <span className="h-[2px] w-2.5 rounded-full bg-slate-900" />
          <span className="h-[2px] w-[18px] rounded-full bg-slate-900" />
          <span className="ml-4 h-[2px] w-2.5 rounded-full bg-slate-900" />
        </button>
        <Link href="/" className="hidden shrink-0 md:block">
          <Image
            src="/sugandha_logo_black.png"
            alt="Sugandha"
            width={72}
            height={26}
          // className="h-10 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link href="/" className="text-sm font-medium transition hover:text-sky-500">
            Home
          </Link>

          <Link
            href="/shop"
            className="text-sm font-medium transition hover:text-sky-500"
          >
            Shop
          </Link>

          <Link
            href="/about"
            className="text-sm font-medium transition hover:text-sky-500"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="text-sm font-medium transition hover:text-sky-500"
          >
            Contact
          </Link>
        </nav>

        <div
          ref={searchRef}
          className="relative hidden flex-1 max-w-xl lg:block mx-2"
        >
          <div className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-2 h-6 focus-within:border-sky-400 focus-within:bg-white">
            <Search size={12} className="text-slate-400" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search premium attars..."
              className="w-full bg-transparent text-xs outline-none placeholder:text-slate-400"
            />
          </div>

          {search.trim() !== "" && (
            <div
              className="absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto">
                {search.trim() !== "" &&
                  (filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          router.push(`/product/${product.slug}`);
                        }}
                        className="flex cursor-pointer items-center gap-4 p-4 transition-all duration-200 hover:bg-sky-50"
                      >
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={65}
                          height={65}
                          className="h-16 w-16 rounded-xl object-cover border border-slate-100"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-slate-900">
                            {product.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            Premium alcohol-free attar
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-bold text-sky-500">
                            {formatPrice(product.price)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="font-semibold text-slate-700">
                        No products found
                      </p>
                      <p className="mt-2 text-sm text-slate-500">
                        Try another keyword.
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
        {/* Right Side */}
        <div className="flex items-center gap-2">
          {/* Mobile Search */}
          <div
            className="relative min-w-0 flex-1 lg:hidden"
            ref={searchRef}
          >
            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 h-7 ">
              <Search size={16} className="text-slate-400" />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full px-2 bg-transparent text-base outline-none placeholder:text-slate-400 lg:text-xs"
              />
            </div>

            {/* Search  results  */}
            {search.trim() !== "" && (
              <div
                className="absolute left-0 mt-2 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-xl border border-white/20 bg-white/80 backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
                {/* Results */}
                <div className="max-h-60 overflow-y-auto md:max-h-[300px]">
                  {search.trim() !== "" &&
                    (filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => {
                            // router.push(`/checkout?buyNow=${product.id}`);
                            router.push(`/product/${product.slug}`);
                            setSearch("");
                          }}
                          className="flex cursor-pointer items-center gap-3 border-b border-slate-100 px-3 py-2.5 transition-colors duration-200 hover:bg-sky-50 last:border-b-0"
                        >
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50">
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                              sizes="48px"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="truncate text-xs font-semibold text-slate-900 sm:text-sm">
                              {product.name}
                            </h3>
                            <p className="mt-0.5 text-xs font-bold text-sky-500">
                              {formatPrice(product.price)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center">
                        <p className="font-semibold text-slate-700">
                          No products found
                        </p>
                        <p className="mt-2 text-sm text-slate-500">
                          Try another keyword.
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}

          </div>

          {/* <div className="flex items-center gap-1">
            <Link
              href="/profile"
              aria-label="Profile"
              className="relative flex h-8 w-8 shrink-0 items-center justify-center transition-colors duration-150 hover:bg-sky-100 active:scale-90"
            >
              <Image
                src="/icons/accountImagev1.png"
                alt="profile icon"
                width={18}
                height={18}
              />
            </Link>

            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-150 hover:bg-sky-100 active:scale-90"
            >
              <motion.div animate={controls}>
                <Image
                  src="/icons/shoppingBag.png"
                  alt="Shopping Cart"
                  width={18}
                  height={18}
                />
              </motion.div>

              {mounted && totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div> */}

          <div className="flex items-center gap-0">
            {/* Profile */}
            <Link
              href="/profile"
              aria-label="Profile"
              className="relative flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-150 hover:bg-sky-100 active:scale-90"
            >
              <Image
                src="/icons/accountImagev1.png"
                alt="profile icon"
                width={18}
                height={18}
                className="object-contain"
              />
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Cart"
              className="relative flex h-7 w-7 shrink-0 items-center justify-center transition-colors duration-150 hover:bg-sky-100 active:scale-90"
            >
              <motion.div animate={controls}>
                <Image
                  src="/icons/shoppingBag.png"
                  alt="Shopping Cart"
                  width={18}
                  height={18}
                  className="object-contain"
                />
              </motion.div>

              {mounted && totalItems > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-sky-400 text-[9px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}