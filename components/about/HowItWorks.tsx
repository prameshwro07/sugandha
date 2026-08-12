import {
  Search,
  ShoppingBag,
  CreditCard,
  Package,
  Truck,
  Sparkles,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Browse",
    description:
      "Explore our collection and discover fragrances that match your personality and style.",
  },
  {
    icon: ShoppingBag,
    title: "Choose",
    description:
      "Select your favorite fragrance, choose the quantity, and add it to your cart.",
  },
  {
    icon: CreditCard,
    title: "Checkout",
    description:
      "Place your order securely using Cash on Delivery or your preferred online payment method.",
  },
  {
    icon: Package,
    title: "We Prepare",
    description:
      "Every order is carefully packed to ensure it arrives safely and in excellent condition.",
  },
  {
    icon: Truck,
    title: "Delivery",
    description:
      "Your order is delivered to your doorstep anywhere in Nepal. Instant delivery in Kathmandu Valley is coming soon.",
  },
  {
    icon: Sparkles,
    title: "Enjoy",
    description:
      "Wear your fragrance with confidence and leave a lasting impression wherever you go.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            How It Works
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Finding your next favorite fragrance is simple.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            We've made the shopping experience easy from the moment you start
            browsing to the moment your fragrance reaches your doorstep.
          </p>
        </div>

        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div
                key={step.title}
                className="relative rounded-3xl border border-slate-200 bg-slate-50 p-8 transition duration-300 hover:-translate-y-2 hover:shadow-lg"
              >
                <div className="absolute right-6 top-6 text-5xl font-bold text-slate-200">
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                  <Icon className="h-7 w-7 text-sky-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}