import {
  PackageCheck,
  Truck,
  Zap,
  ShieldCheck,
  MessageCircle,
  HeartHandshake,
} from "lucide-react";

const features = [
  {
    icon: PackageCheck,
    title: "Carefully Selected Fragrances",
    description:
      "Every fragrance in our collection is chosen for its quality, lasting impression, and overall customer satisfaction.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    description:
      "We carefully pack every order and work to deliver it safely and on time across Nepal.",
  },
  {
    icon: Zap,
    title: "Instant Delivery (Coming Soon)",
    description:
      "We're preparing instant delivery within Kathmandu, Lalitpur, and Bhaktapur for those moments when you need your fragrance without the wait.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description:
      "From browsing to checkout, we focus on making your shopping experience smooth, simple, and secure.",
  },
  {
    icon: MessageCircle,
    title: "Friendly Support",
    description:
      "Need help choosing a fragrance or have questions about your order? We're here to help before and after your purchase.",
  },
  {
    icon: HeartHandshake,
    title: "Customer First",
    description:
      "Every decision we make is guided by one goal—providing an experience that earns your trust and keeps you coming back.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Why Choose Sugandha
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            More than just fragrances.
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            We're committed to providing quality products, dependable service,
            and a shopping experience you can trust.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                  <Icon className="h-7 w-7 text-sky-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}