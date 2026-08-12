import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getProduct } from "@/lib/products";
import {
    ArrowLeft,
    CheckCircle2,
    Clock3,
    MapPin,
    Package,
    Truck,
    XCircle,
} from "lucide-react";

import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/db";
import { OrderModel } from "@/lib/models/order";

type Props = {
    params: Promise<{
        id: string;
    }>;
};

function formatDate(date: Date) {
    return new Intl.DateTimeFormat("en-NP", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
}

function getStatusInfo(status: string) {
    switch (status) {
        case "Delivered":
            return {
                label: "Delivered",
                icon: CheckCircle2,
                className:
                    "border-emerald-200 bg-emerald-50 text-emerald-700",
            };

        case "Cancelled":
            return {
                label: "Cancelled",
                icon: XCircle,
                className:
                    "border-red-200 bg-red-50 text-red-700",
            };

        case "Pending":
        default:
            return {
                label: "Pending",
                icon: Clock3,
                className:
                    "border-amber-200 bg-amber-50 text-amber-700",
            };
    }
}

export default async function OrderDetailsPage({ params }: Props) {
    const session = await auth();

    if (!session?.user?.email) {
        redirect("/profile");
    }

    const { id } = await params;

    await connectToDatabase();

    const order = await OrderModel.findOne({
        _id: id,
        email: session.user.email,
    }).lean();

    /*
     * IMPORTANT:
     * The email condition above makes sure a logged-in customer
     * cannot view another customer's order simply by changing
     * the order ID in the URL.
     */

    if (!order) {
        notFound();
    }

    const status = order.status ?? "Pending";
    const statusInfo = getStatusInfo(status);
    const StatusIcon = statusInfo.icon;

    return (
        <main className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 sm:py-10">
            <div className="mx-auto w-full max-w-4xl">

                {/* Back */}
                <Link
                    href="/profile/orders"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-slate-900"
                >
                    <ArrowLeft size={18} />
                    Back to My Orders
                </Link>

                {/* Header */}
                <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

                    <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div>
                                <div className="flex items-center gap-2">
                                    <Package
                                        size={21}
                                        className="text-sky-500"
                                    />

                                    <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
                                        Order Details
                                    </h1>
                                </div>

                                <p className="mt-2 break-all font-mono text-xs text-slate-500 sm:text-sm">
                                    #{order._id.toString().slice(-8).toUpperCase()}
                                </p>

                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    {formatDate(new Date(order.createdAt))}
                                </p>
                            </div>

                            <div
                                className={`inline-flex w-fit items-center gap-2 rounded-full border px-3 py-2 text-xs font-semibold ${statusInfo.className}`}
                            >
                                <StatusIcon size={15} />
                                {statusInfo.label}
                            </div>

                        </div>
                    </div>

                    {/* Order status */}
                    <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                        <h2 className="text-sm font-semibold text-slate-900">
                            Order Status
                        </h2>

                        <div className="mt-4 flex items-center gap-3">
                            <div
                                className={`flex h-10 w-10 items-center justify-center rounded-full ${statusInfo.className}`}
                            >
                                <StatusIcon size={19} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold text-slate-800">
                                    {statusInfo.label}
                                </p>

                                <p className="text-xs text-slate-500">
                                    {status === "Delivered"
                                        ? "Your order has been delivered."
                                        : status === "Cancelled"
                                            ? "This order has been cancelled."
                                            : "Your order is being processed."}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                        <h2 className="text-sm font-semibold text-slate-900">
                            Items
                        </h2>

                        <div className="mt-4 divide-y divide-slate-100">
                            {order.products?.map(
                                (product: any, index: number) => {
                                    const originalProduct = getProduct(product.id);

                                    const image =
                                        originalProduct?.images?.[0] ?? "/placeholder.png";

                                    const quantity = Number(product.quantity);
                                    const price = Number(product.price);

                                    return (
                                        <div
                                            key={`${product.id ?? product._id ?? product.name}-${index}`}
                                            className="flex gap-4 py-4"
                                        >
                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
                                                <img
                                                    src={image}
                                                    alt={product.name ?? "Product"}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <h3 className="text-sm font-semibold text-slate-900 sm:text-base">
                                                    {product.name}
                                                </h3>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Rs. {price.toLocaleString("en-IN")} ×{" "}
                                                    {quantity}
                                                </p>
                                            </div>

                                            <div className="shrink-0 text-right">
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Rs.{" "}
                                                    {(price * quantity).toLocaleString(
                                                        "en-IN"
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    );
                                }
                            )}
                        </div>
                    </div>

                    {/* Delivery information */}
                    <div className="grid gap-5 border-b border-slate-100 px-5 py-5 sm:grid-cols-2 sm:px-7">

                        <div>
                            <div className="flex items-center gap-2">
                                <MapPin
                                    size={18}
                                    className="text-sky-500"
                                />

                                <h2 className="text-sm font-semibold text-slate-900">
                                    Delivery Address
                                </h2>
                            </div>

                            <p className="mt-2 text-sm leading-6 text-slate-600">
                                {order.address}
                            </p>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <Truck
                                    size={18}
                                    className="text-sky-500"
                                />

                                <h2 className="text-sm font-semibold text-slate-900">
                                    Payment Method
                                </h2>
                            </div>

                            <p className="mt-2 text-sm text-slate-600">
                                {order.paymentMethod === "esewa"
                                    ? "eSewa"
                                    : "Cash on Delivery"}
                            </p>
                        </div>

                    </div>

                    {/* Customer information */}
                    <div className="border-b border-slate-100 px-5 py-5 sm:px-7">
                        <h2 className="text-sm font-semibold text-slate-900">
                            Customer Information
                        </h2>

                        <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            <div>
                                <p className="text-xs text-slate-400">
                                    Name
                                </p>

                                <p className="mt-1 text-sm text-slate-700">
                                    {order.customerName}
                                </p>
                            </div>

                            <div>
                                <p className="text-xs text-slate-400">
                                    Phone
                                </p>

                                <p className="mt-1 text-sm text-slate-700">
                                    {order.phone}
                                </p>
                            </div>

                            <div className="sm:col-span-2">
                                <p className="text-xs text-slate-400">
                                    Email
                                </p>

                                <p className="mt-1 break-all text-sm text-slate-700">
                                    {order.email}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Total */}
                    <div className="bg-slate-50/70 px-5 py-5 sm:px-7">
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-slate-600">
                                Total Amount
                            </span>

                            <span className="text-xl font-bold text-slate-900">
                                Rs.{" "}
                                {Number(order.totalPrice ?? 0).toLocaleString(
                                    "en-IN"
                                )}
                            </span>
                        </div>
                    </div>

                </section>
            </div>
        </main>
    );
}