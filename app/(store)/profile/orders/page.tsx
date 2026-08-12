import Link from "next/link";
import { redirect } from "next/navigation";
import { getProduct } from "@/lib/products";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingBag,
} from "lucide-react";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import{ OrderModel }from "@/lib/models/order";

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("en-NP", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function getStatusStyle(status: string) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";

    case "Cancelled":
      return "bg-red-50 text-red-700 border-red-200";

    case "Pending":
    default:
      return "bg-amber-50 text-amber-700 border-amber-200";
  }
}

export default async function MyOrdersPage() {
  const session = await auth();

  if (!session?.user?.email) {
    redirect("/profile");
  }

  await connectToDatabase();

  const orders = await OrderModel.find({
    email: session.user.email,
  })
    .sort({ createdAt: -1 })
    .lean();



  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-4xl">

        {/* Back */}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Back to Profile
        </Link>

        {/* Header */}
        <div className="mb-7 flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-sky-100 text-sky-600">
            <Package size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              My Orders
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              View and track your recent purchases.
            </p>
          </div>
        </div>

        {/* Empty state */}
        {orders.length === 0 ? (
          <section className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm sm:px-10">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <ShoppingBag size={30} />
            </div>

            <h2 className="mt-5 text-lg font-semibold text-slate-900">
              No orders yet
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
              You haven't placed any orders yet. Once you make a purchase,
              your orders will appear here.
            </p>

            <Link
              href="/shop"
              className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-sky-400 px-6 text-sm font-semibold text-slate-900 transition hover:bg-sky-300 active:scale-[0.98]"
            >
              Start Shopping
            </Link>
          </section>
        ) : (
          <div className="space-y-5">

            {/* Order count */}
            <div className="text-sm text-slate-500">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </div>

            {orders.map((order: any) => (
              <article
                key={order._id.toString()}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Order header */}
                <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                        Order ID
                      </p>

                      <p className="mt-1 break-all font-mono text-sm font-semibold text-slate-800">
                        #{order._id.toString().slice(-8).toUpperCase()}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        {formatDate(new Date(order.createdAt))}
                      </p>
                    </div>

                    <span
                      className={`inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(
                        order.status
                      )}`}
                    >
                      {order.status ?? "Pending"}
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="divide-y divide-slate-100">
                 {order.products?.map((product: any, index: number) => {
  const originalProduct = getProduct(product.id);

  const image =
    originalProduct?.images?.[0] ?? "/placeholder.png";

  return (
    <div
      key={`${product.id ?? product._id ?? product.name}-${index}`}
      className="flex gap-3 px-4 py-4 sm:gap-4 sm:px-6"
    >
      {/* Product image */}
      <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50 sm:h-20 sm:w-20">
        <img
          src={image}
          alt={product.name ?? "Product"}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Product information */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-slate-900 sm:text-base">
          {product.name}
        </h3>

        <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
          <span>
            Qty: {product.quantity}
          </span>

          <span>
            Rs. {Number(product.price).toLocaleString("en-IN")}
          </span>
        </div>
      </div>

      {/* Product total */}
      <div className="shrink-0 text-right">
        <p className="text-sm font-semibold text-slate-900">
          Rs.{" "}
          {(
            Number(product.price) *
            Number(product.quantity)
          ).toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
})}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 bg-slate-50/70 px-4 py-4 sm:px-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div className="space-y-1">
                      <p className="text-xs text-slate-500">
                        Payment
                      </p>

                      <p className="text-sm font-medium capitalize text-slate-700">
                        {order.paymentMethod === "esewa"
                          ? "eSewa"
                          : "Cash on Delivery"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-5 sm:justify-end">
                      <div className="text-right">
                        <p className="text-xs text-slate-500">
                          Total
                        </p>

                        <p className="text-lg font-bold text-slate-900">
                          Rs.{" "}
                          {Number(order.totalPrice ?? 0).toLocaleString(
                            "en-IN"
                          )}
                        </p>
                      </div>

                      <Link
                        href={`/profile/orders/${order._id}`}
                        className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700"
                      >
                        <span className="hidden sm:inline">
                          View Details
                        </span>

                        <span className="sm:hidden">
                          View
                        </span>

                        <ArrowRight size={16} />
                      </Link>
                    </div>

                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}