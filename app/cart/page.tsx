"use client";

import Link from "next/link";
import { Trash2, ShoppingCart} from "lucide-react";
import { useCart } from "@/src/store/cart";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const [quantity, setQuantity] = useState(1);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const router = useRouter()

  return (
    <main className="mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl flex-col px-4 py-10">
      {/* <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1> */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl py-20">
          <ShoppingCart size={70} className="text-slate-300" />

          <h2 className="mt-4 text-2xl font-bold">Your cart is empty</h2>

          <p className="mt-2 text-slate-500">
            Add your favourite fragrances to get started.
          </p>

          <Link
            href="/"
            className="mt-6 rounded-xl bg-sky-400 px-6 py-3 font-semibold text-slate-900 transition hover:bg-sky-500"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
          {/* Left Side */}
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="h-28 w-28 rounded-xl object-cover"
                />

                <div className="flex flex-1 flex-col justify-center">
                  <h2 className="text-xl font-semibold">{item.name}</h2>

                  <p className="mt-1 text-lg font-bold text-sky-600">
                    Rs. {item.price.toLocaleString()}
                  </p>

                  <div className="mt-5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-slate-600">
                        Quantity
                      </span>

                      <div className="flex items-center overflow-hidden rounded-lg border border-slate-300">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item.id)}
                          className="px-3 py-2 text-lg font-semibold transition hover:bg-slate-100"
                        >
                          −
                        </button>

                        <span className="w-10 text-center font-semibold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item.id)}
                          className="px-3 py-2 text-lg font-semibold transition hover:bg-slate-100"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="rounded-lg p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Side */}
          <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold">Order Summary</h2>

            <div className="mt-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-600">Total Items</span>

                <span className="font-semibold">{totalItems}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>

                <span className="font-semibold">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Delivery</span>

                <span className="font-semibold text-green-600">Free</span>
              </div>

              <hr className="text-slate-200" />

              <div className="flex justify-between text-xl font-bold">
                <span>Total</span>

                <span className="text-sky-600">
                  Rs. {totalPrice.toLocaleString()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-8 block w-full rounded-xl border-slate-200 bg-sky-400 py-3 text-center font-semibold text-slate-900 transition hover:bg-sky-500"
            >
              Proceed to Checkout
            </Link>

            <Link
              href="/"
              className="mt-3 block w-full rounded-xl border border-slate-200 py-3 text-center font-semibold transition hover:bg-slate-50"
            >
              Continue Shopping
            </Link>

            {/* <div className="mt-6 rounded-xl bg-green-50 p-4 text-center text-sm font-medium text-green-700">
              🚚 Free Delivery Inside Kathmandu Valley.
            </div> */}
          </aside>
        </div>
      )}
    </main>
  );
}
