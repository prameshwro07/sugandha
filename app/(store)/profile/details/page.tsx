import { ArrowLeft, Mail, UserRound } from "lucide-react";
import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/db";
import User from "@/lib/models/User";
import DetailsForm from "./DetailsForm";

export default async function ProfileDetailsPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/profile");
  }

  await connectToDatabase();

  const user = await User.findOne({
    email: session.user.email,
  }).lean();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 sm:py-14">
      <div className="mx-auto w-full max-w-2xl">

        {/* Back button */}
        {/* <Link
          href="/profile"
          className="group mb-6 inline-flex items-center gap-2 rounded-xl px-2 py-2 text-sm font-medium text-slate-500 transition hover:bg-white hover:text-sky-600 hover:shadow-sm"
        >
          <ArrowLeft
            size={18}
            className="transition-transform group-hover:-translate-x-0.5"
          />

          <span>Back to Profile</span>
        </Link> */}

        {/* Page heading */}
        <div className="mb-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-sky-500">
            My Account
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Personal Details
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Save your details for faster checkout.
          </p>
        </div>

        {/* Account information */}
        <section className="mb-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06)]">
          <div className="h-1.5 bg-sky-400" />

          <div className="p-5 sm:p-7">
            <div className="mb-6">
              <h2 className="text-base font-bold text-slate-900">
                Account Information
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                These details come from your Google account.
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <UserRound size={16} className="text-sky-500" />
                  Name
                </p>

                <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {session.user.name ?? "Not available"}
                </div>
              </div>

              {/* Email */}
              <div>
                <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Mail size={16} className="text-sky-500" />
                  Email
                </p>

                <div className="break-all rounded-xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  {session.user.email}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Editable details */}
        <DetailsForm
          phone={user?.phone ?? ""}
          address={user?.address ?? ""}
        />

        {/* Bottom back link for mobile */}
        <div className="mt-6 flex justify-center">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-sky-500"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
        </div>
      </div>
    </main>
  );
}