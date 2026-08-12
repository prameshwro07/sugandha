import Link from "next/link";
import { ArrowRight, Home, ShoppingBag } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-72px)] items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-50 px-6">
      <div className="mx-auto max-w-xl text-center">

        {/* 404 */}
        <h1 className="text-8xl font-black tracking-tight text-sky-500 sm:text-9xl">
          404
        </h1>

        {/* Heading */}
        <h2 className="mt-4 text-3xl font-bold text-slate-900">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-600">
          The page you're looking for doesn't exist or may have been moved.
          Let's help you find your next signature fragrance.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-sky-500 px-6 py-3 font-semibold text-white transition hover:bg-sky-600"
          >
            Go Home
          </Link>

        </div>

      </div>
    </main>
  );
}