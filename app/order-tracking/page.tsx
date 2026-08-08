"use client";
import { Search } from "lucide-react";
import PolicyLayout from "@/components/legal/PolicyLayout";
import { useState } from "react";
import type { OrderDto } from "@/lib/orders";
import Image from "next/image";

export default function OrderTrackingPage() {
    const [orderId, setOrderId] = useState("");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [order, setOrder] = useState<OrderDto | null>(null);

    async function trackOrder() {
        setLoading(true);
        setError("");
        setOrder(null);

        const res = await fetch("/api/order-tracking", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                orderId,
                phone,
            }),
        });

        const data = await res.json();

        if (!res.ok) {
            setError(data.message);
            return;
        }

        setOrder(data.order);
        console.log(data.order.products);

        setLoading(false);

        if (!res.ok) {
            setError(data.message);
            console.log(data)
            return;
        }

        setOrder(data.order);
    }
    return (
        <PolicyLayout
            title="Order Tracking"
            // description="Track your order and stay updated on its delivery status."
            description="Enter your Order ID and the phone number used while placing your
                order. Order tracking will be available soon."
        >
            <section className="text-center">
                {/* <h2 className="text-2xl font-semibold text-slate-900">
                    Track Your Order
                </h2> */}

                {/* <p className="mt-3 text-slate-600 leading-8">
                    Enter your Order ID and the phone number used while placing your
                    order. Order tracking will be available soon.
                </p> */}

                <div className="mx-auto mt-10 max-w-lg rounded-2xl border border-slate-200 bg-slate-50 p-6">
                    <div className="space-y-4">
                        <input
                            value={orderId}
                            onChange={(e) => setOrderId(e.target.value)}
                            type="text"
                            placeholder="Order ID"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-500 outline-none"
                        />

                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            type="tel"
                            placeholder="Phone Number"
                            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-500 outline-none"
                        />

                        <button
                            onClick={trackOrder}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-5 py-3 font-semibold text-white opacity-60"
                        >
                            <Search size={18} />
                            Track Order
                        </button>
                    </div>
                </div>
                {error && (
                    <div className="mx-auto mt-8 max-w-lg rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                        {error}
                    </div>
                )}

                {order && (
                    <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">

                        <div className="flex items-center justify-between border-b pb-5">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-900">
                                    Order Found
                                </h2>

                                <p className="mt-1 text-slate-500">
                                    Order ID: {order.id}
                                </p>
                            </div>

                            <span
                                className={`rounded-full px-4 py-2 text-sm font-semibold ${order.status === "Pending"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : order.status === "Delivered"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {order.status}
                            </span>
                        </div>

                        <div className="mt-8 grid gap-6 md:grid-cols-2">

                            <div>
                                <p className="text-sm text-slate-500">Customer</p>
                                <p className="font-semibold">{order.customerName}</p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Phone</p>
                                <p className="font-semibold">{order.phone}</p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Payment</p>
                                <p className="font-semibold uppercase">
                                    {order.paymentMethod}
                                </p>
                            </div>

                            <div>
                                <p className="text-sm text-slate-500">Ordered On</p>
                                <p className="font-semibold">
                                    {order.date} • {order.time}
                                </p>
                            </div>

                        </div>

                        <div className="mt-10">
                            <h3 className="mb-4 text-lg font-semibold">
                                Products
                            </h3>



                            <div className="space-y-4">
                                {order.products.map((product) => (


                                    <div
                                        key={product.id}
                                        className="flex items-center justify-between rounded-xl border p-4"
                                    >
                                        <div>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-sm text-slate-500">
                                                Quantity: {product.quantity}
                                            </p>
                                        </div>

                                        <p className="font-semibold">
                                            Rs. {(product.price * product.quantity).toLocaleString()}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 flex justify-between border-t pt-6 text-lg font-bold">
                            <span>Total</span>
                            <span>Rs. {order.totalPrice.toLocaleString()}</span>
                        </div>

                    </div>
                )}
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-slate-900">
                    Order Status
                </h2>

                <p className="mt-3 leading-8 text-slate-600">
                    We're currently building a real-time order tracking system. Once
                    available, you'll be able to track your order directly from this page.
                </p>

                <p className="mt-4 leading-8 text-slate-600">
                    Until then, if you'd like to know the status of your order, please
                    contact our customer support team with your <strong>Order ID</strong>.
                    We'll be happy to provide an update.
                </p>
            </section>

            <section>
                <h2 className="text-2xl font-semibold text-slate-900">
                    Need Help?
                </h2>

                <p className="mt-3 leading-8 text-slate-600">
                    If you have any questions regarding your order, please visit our
                    Contact page. Our support team will assist you as soon as possible.
                </p>
            </section>

            <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
                Last Updated: July 2026
            </div>
        </PolicyLayout>
    );
}