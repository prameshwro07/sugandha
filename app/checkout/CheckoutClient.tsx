"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ShoppingBag,
  ShoppingCart,
  CreditCard,
  Loader2,
  MessageCircle,
  Truck,
  ShieldCheck,
  Leaf,
  BadgeCheck,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { brand, formatPrice } from "@/lib/products";
import {
  orderCreateSchema,
  type OrderCreateInput,
  type PaymentMethod,
} from "@/lib/validation";
import ImageSlider from "@/components/imageSlider";
import { useCart } from "@/src/store/cart";
import { useSearchParams } from "next/navigation";
import { products } from "@/lib/products";

export function CheckoutClient() {
  const { items, clearCart, removeFromCart } = useCart();

  const searchParams = useSearchParams();
  const buyNowId = searchParams.get("buyNow");
  const [buyNowQuantity, setBuyNowQuantity] = useState(1);

  const checkoutItems = useMemo(() => {
    if (buyNowId) {
      const product = products.find((p) => p.id === buyNowId);

      if (!product) return [];

      return [
        {
          ...product,
          quantity: buyNowQuantity,
        },
      ];
    }

    return items;
  }, [buyNowId, buyNowQuantity, items]);

  const totalPrice = checkoutItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const totalItems = checkoutItems.reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );
  const [serverMessage, setServerMessage] = useState("");
  const [orderId, setOrderId] = useState("");
  const [confirmationName, setConfirmationName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const cartProducts = useMemo(() => {
    if (buyNowId) {
      const product = products.find((p) => p.id === buyNowId);

      if (!product) return [];

      return [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: buyNowQuantity,
          image: product.images?.[0],
        },
      ];
    }

    return checkoutItems.map((i) => ({
      id: i.id,
      name: i.name,
      price: i.price,
      quantity: i.quantity,
      image: i.images?.[0],
    }));
  }, [items, buyNowId, buyNowQuantity]);

  const whatsappUrl = useMemo(() => {
    const summary = checkoutItems
      .map((i) => `${i.name} ×${i.quantity}`)
      .slice(0, 5)
      .join("\n");

    const text = encodeURIComponent(
      `Hello, I completed payment for Sugandha.\n\nOrder items:\n${summary}\n\nPlease verify my order.`,
    );

    return brand.whatsappNumber
      ? `https://wa.me/${brand.whatsappNumber.replace(/\D/g, "")}?text=${text}`
      : `https://wa.me/?text=${text}`;
  }, [items]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<OrderCreateInput>({
    resolver: zodResolver(orderCreateSchema),
    defaultValues: {
      products: cartProducts,
      paymentMethod: "cod",
      customerName: "",
      phone: "",
      email: undefined,
      address: "",
    },
  });

  useEffect(() => {
  async function loadProfile() {
    try {
      const response = await fetch("/api/profile/details");

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      if (!data.user) {
        return;
      }

      reset({
        customerName: data.user.name ?? "",
        email: data.user.email ?? "",
        phone: data.user.phone ?? "",
        address: data.user.address ?? "",
      });
    } catch (error) {
      console.error("Failed to load profile details:", error);
    }
  }

  loadProfile();
}, [reset]);

  // keep products in sync with cart
  useEffect(() => {
    setValue("products", cartProducts);
  }, [cartProducts, setValue]);

  function choosePayment(method: PaymentMethod) {
    setServerMessage("");
    setPaymentMethod(method);
    setValue("paymentMethod", method);
  }
  async function submitOrder(values: OrderCreateInput) {
    if (submitting) return;

    setSubmitting(true);

    try {
      if (!paymentMethod) {
        setServerMessage("Please choose a payment method first.");
        return;
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          paymentMethod,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setServerMessage(result.message ?? "Could not save your order.");
        return;
      }

      setConfirmationName(values.customerName.split(" ")[0]);
      setOrderId(result.orderId);

      if (!buyNowId) {
        clearCart();
      }

      setOrderPlaced(true);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (err) {
      console.error(err);
      setServerMessage("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  }

  if (orderPlaced) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10 text-slate-800">
        <section className="mx-auto flex max-w-xl flex-col items-center rounded-lg border border-sky-100 bg-white p-8 text-center shadow-[0_20px_60px_rgba(15,23,42,0.1)]">
          <CheckCircle2 className="text-sky-400" size={56} aria-hidden="true" />
          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Order Placed Successfully!
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Thank you for choosing us,{" "}
            <span className="font-semibold">{confirmationName}</span>!! Your
            order for{" "}
            <span className="font-bold">
              {totalItems} item{totalItems === 1 ? "" : "s"}
            </span>{" "}
            has been received and is being processed.
          </p>

          <Link
            className="mt-6 rounded-md bg-sky-400 px-5 py-3 font-semibold text-slate-950 transition-transform duration-150 active:scale-90"
            href="/"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-6 text-slate-800 sm:py-10">
      {/* <div className="mx-auto mb-6 max-w-5xl"></div> */}
      <div className="mx-auto grid max-w-5xl items-start gap-6 lg:grid-cols-[360px_1fr]">
        <aside className="order-1 h-fit rounded-xl border border-sky-100 bg-white p-5 shadow-sm lg:sticky lg:top-6">
          <Link
            href="/"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-600"
          >
            <ArrowLeft size={17} />
            Back
          </Link>

          <div className="space-y-4">
            {checkoutItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-4 rounded-xl border border-slate-200 p-4"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-20 w-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>

                  {buyNowId ? (
                    <div className="mt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          setBuyNowQuantity((q) => Math.max(1, q - 1))
                        }
                        className="h-8 w-8 rounded-lg border border-slate-300 transition-transform duration-150 active:scale-90 hover:bg-slate-100"
                      >
                        -
                      </button>

                      <span className="w-8 text-center font-semibold">
                        {buyNowQuantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => setBuyNowQuantity((q) => q + 1)}
                        className="h-8 w-8 rounded-lg border border-slate-300 transition-transform duration-150 active:scale-90 hover:bg-slate-100"
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <p className="text-slate-500">Qty: {item.quantity}</p>
                  )}
                </div>

                <p className="font-bold">
                  Rs. {(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-sky-50 p-4">
            <p className="text-sm text-slate-600">Products</p>

            <p className="text-2xl font-bold">{totalItems}</p>
          </div>
          <hr className="my-6 border-slate-200" />
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
              Order Summary
            </h3>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Items</span>

                <span>{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span>Subtotal</span>

                <span>{formatPrice(totalPrice)}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span className="text-green-600">Free</span>
              </div>

              <hr className="text-slate-200" />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>

                <span className="text-sky-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
          </div>
        </aside>

        <section className="order-2 rounded-lg border  border-sky-100 bg-white p-5 shadow-sm sm:p-7 lg:order-2">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-xl font-bold text-slate-900">
              Choose payment method
            </h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {/* esewa */}
              <button
                type="button"
                onClick={() => choosePayment("esewa")}
                className={`rounded-xl border-2 p-4 text-left transition-all duration-300 hover:shadow-lg ${paymentMethod === "esewa"
                    ? "border-sky-400 bg-sky-50"
                    : "border-slate-200 bg-white hover:border-sky-300"
                  }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src="/esewa-v2.png"
                      alt="eSewa"
                      className="h-10 w-10 object-contain"
                    />

                    <div>
                      <h3 className="font-semibold text-slate-900">eSewa</h3>
                      <p className="text-sm text-slate-500">
                        Instant online payment
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-semibold text-emerald-700">
                    Recommended
                  </span>
                </div>
              </button>

              {/* Cash on Delivery */}

              <button
                type="button"
                onClick={() => choosePayment("cod")}
                className={`rounded-xl border-2 p-4 text-left transition-all duration-300 hover:shadow-lg ${paymentMethod === "cod"
                    ? "border-sky-400 bg-sky-50"
                    : "border-slate-200 bg-whit hover:border-sky-300"
                  }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="text-sky-500" size={34} />
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      Cash on Delivery
                    </h3>

                    <p className="text-sm text-slate-500">
                      Pay after receiving your order
                    </p>
                  </div>
                </div>
              </button>
            </div>

            {paymentMethod === "esewa" ? (
              <div className="mt-6 rounded-lg border border-sky-100 bg-white p-4">
                <div className="mx-auto flex aspect-square max-w-64 items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                  <Image
                    src="/esewaQR.jpg"
                    alt="eSewa QR code placeholder"
                    width={220}
                    height={220}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="mt-4 text-center text-sm font-semibold text-slate-900">
                  eSewa ID: {brand.esewaId}
                </p>
                <p className="mt-3 text-center text-sm leading-6 text-slate-600">
                  Please scan the QR code and complete the payment. After
                  payment, send the payment screenshot on WhatsApp for
                  verification.
                </p>
                <div className="mt-5 flex justify-center">
                  <a
                    className="inline-flex min-h-12 w-full max-w-xs items-center justify-center gap-2 rounded-md border border-emerald-500 bg-[#25D366] px-4 text-base font-medium text-white transition hover:bg-[#1ebe5d]"
                    href={whatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src="/whatsapp.png"
                      alt="WhatsApp"
                      width={22}
                      height={22}
                    />
                    WhatsApp
                  </a>
                </div>
              </div>
            ) : null}
          </motion.div>
          <hr className="my-8 border-slate-200" />
          <motion.form
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
            onSubmit={handleSubmit(submitOrder)}
          >
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Delivery details
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Your order is submitted only after the database confirms it.
              </p>
            </div>
            <input
              type="hidden"
              value={paymentMethod ?? "cod"}
              {...register("paymentMethod")}
            />
            {cartProducts.map((p, idx) => (
              <div key={p.id + idx} className="hidden">
                <input
                  type="hidden"
                  value={p.id}
                  {...register(`products.${idx}.id` as const)}
                />
                <input
                  type="hidden"
                  value={p.name}
                  {...register(`products.${idx}.name` as const)}
                />
                <input
                  type="hidden"
                  value={p.price}
                  {...register(`products.${idx}.price` as const, {
                    valueAsNumber: true,
                  })}
                />
                <input
                  type="hidden"
                  value={p.quantity}
                  {...register(`products.${idx}.quantity` as const, {
                    valueAsNumber: true,
                  })}
                />
              </div>
            ))}

            <FormField label="Full Name" error={errors.customerName?.message}>
              <input
                className="field"
                autoComplete="name"
                {...register("customerName")}
              />
            </FormField>
            <FormField label="Phone Number" error={errors.phone?.message}>
              <input
                className="field"
                inputMode="tel"
                autoComplete="tel"
                {...register("phone")}
              />
            </FormField>
            <FormField label="Email Address" error={errors.email?.message}>
              <input
                className="field"
                type="email"
                autoComplete="email"
                {...register("email")}
              />
            </FormField>
            <FormField label="Delivery Address" error={errors.address?.message}>
              <textarea
                className="field min-h-28 resize-y"
                autoComplete="street-address"
                {...register("address")}
              />
            </FormField>
            {serverMessage ? (
              <p className="rounded-md bg-sky-50 p-3 text-sm font-medium text-slate-700">
                {serverMessage}
              </p>
            ) : null}
            <button
              disabled={isSubmitting}
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-sky-400 px-5 text-base font-medium text-slate-900 disabled:cursor-not-allowed disabled:opacity-70 transition-transform duration-150 active:scale-90"
              type="submit"
            >
              {isSubmitting ? (
                <Loader2
                  className="animate-spin"
                  size={19}
                  aria-hidden="true"
                />
              ) : null}
              {isSubmitting ? "Saving order" : "Place order"}
            </button>
          </motion.form>
        </section>
      </div>
    </main>
  );
}

function FormField({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold text-slate-700">{label}</span>
      <span className="mt-1 block">{children}</span>
      {error ? (
        <span className="mt-1 block text-sm font-medium text-red-600">
          {error}
        </span>
      ) : null}
    </label>
  );
}
