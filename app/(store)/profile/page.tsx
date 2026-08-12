import {
  UserRound,
  ArrowRight,
  ShoppingBag,
  UserCircle,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { auth } from "@/auth";
import GoogleSignInButton from "./GoogleSignInButton";
import Link from "next/link";
import SignOutButton from "./SignOutButton";

export default async function ProfilePage() {
  const session = await auth();
  const user = session?.user;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">

        {!user ? (
          /* =====================================================
             LOGGED OUT
          ====================================================== */
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

            {/* Top decoration */}
            <div className="h-2 bg-sky-400" />

            <div className="px-5 py-10 sm:px-10 sm:py-12">

              {/* Icon */}
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-sky-50 text-sky-500 ring-8 ring-sky-50/60">
                <UserRound
                  className="h-10 w-10"
                  strokeWidth={1.7}
                />
              </div>

              {/* Heading */}
              <div className="mt-7 text-center">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
                  Sugandha
                </p>

                <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  Welcome to your profile
                </h1>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Sign in to save your delivery details and make
                  your future orders faster and easier.
                </p>
              </div>

              {/* Google */}
              <div className="mx-auto mt-8 w-full max-w-md">
                <GoogleSignInButton />
              </div>

              {/* Guest checkout message */}
              <div className="mx-auto mt-6 flex max-w-md items-start gap-3 rounded-xl bg-slate-50 px-4 py-3">
                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-sky-500"
                />

                <p className="text-left text-xs leading-5 text-slate-500">
                  No account is required to shop. You can continue
                  browsing and checkout as a guest anytime.
                </p>
              </div>
            </div>
          </section>
        ) : (
          /* =====================================================
             LOGGED IN
          ====================================================== */
          <div className="space-y-5">

            {/* Profile Header */}
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.08)]">

              {/* Banner */}
              <div className="h-28 bg-gradient-to-br from-sky-300 via-sky-400 to-sky-500 sm:h-32" />

              {/* User information */}
              <div className="px-5 pb-7 sm:px-8">

                {/* Avatar */}
                <div className="-mt-12 flex justify-center sm:justify-start">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name ?? "Profile"}
                      className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-4 border-white bg-sky-50 text-sky-500 shadow-lg">
                      <UserRound
                        className="h-11 w-11"
                        strokeWidth={1.6}
                      />
                    </div>
                  )}
                </div>

                {/* Name / email */}
                <div className="mt-4 text-center sm:text-left">
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    {user.name ?? "Welcome"}
                  </h1>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {user.email}
                  </p>
                </div>
              </div>
            </section>

            {/* Account Menu */}
            <section className="rounded-3xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">

              <p className="px-3 pb-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">
                My Account
              </p>

              {/* Personal Details */}
              <Link
                href="/profile/details"
                className="group flex min-h-[72px] items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-sky-50 sm:px-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition group-hover:bg-sky-100">
                  <UserCircle size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Personal Details
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    Manage your name, phone and delivery details
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500"
                />
              </Link>

              {/* Divider */}
              <div className="mx-4 border-t border-slate-100" />

              {/* Orders */}
              <Link
                href="/profile/orders"
                className="group flex min-h-[72px] items-center gap-4 rounded-2xl px-3 py-3 transition hover:bg-sky-50 sm:px-4"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-500 transition group-hover:bg-sky-100">
                  <ShoppingBag size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-slate-800">
                    My Orders
                  </h2>

                  <p className="mt-0.5 text-xs text-slate-500">
                    View your orders and track your purchases
                  </p>
                </div>

                <ArrowRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-sky-500"
                />
              </Link>
            </section>

            {/* Sign Out */}

            {/* <section className="rounded-3xl border border-red-600 bg-white p-3 shadow-sm sm:p-4">
              <SignOutButton />
            </section> */}

            {/* Small footer */}
            <p className="pb-5 text-center text-xs text-slate-400">
              Sugandha · Smell Good, feel confident.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}