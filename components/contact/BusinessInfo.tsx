import {
  Clock3,
  Truck,
  CreditCard,
  MessageCircle,
} from "lucide-react";

const info = [
  {
    icon: Clock3,
    title: "Business Hours",
    content: (
      <>
        <p>Sunday – Friday</p>
        <p className="font-medium">10:00 AM – 7:00 PM</p>

        {/* <p className="mt-4">Saturday</p>
        <p className="font-medium">10:00 AM – 5:00 PM</p> */}

        <p className="mt-4">Saturday</p>
        <p className="font-medium text-red-500">Closed</p>
      </>
    ),
  },
  {
    icon: Truck,
    title: "Delivery",
    content: (
      <>
        <p className="font-medium">
          Delivering Across Nepal 🇳🇵
        </p>

        <p className="mt-3">
          Standard delivery available nationwide.
        </p>

        <p className="mt-4 rounded-xl bg-sky-100 px-3 py-2 text-sky-700 font-medium inline-block">
          ⚡ Instant Delivery Coming Soon
        </p>

        <p className="mt-3 text-sm">
          Kathmandu • Lalitpur • Bhaktapur
        </p>
      </>
    ),
  },
  {
    icon: CreditCard,
    title: "Payment Methods",
    content: (
      <>
        <p>✔ Cash on Delivery</p>
        <p>✔ eSewa</p>

        <p className="mt-4 text-sm text-slate-500">
          More payment methods will be added in the future.
        </p>
      </>
    ),
  },
  {
    icon: MessageCircle,
    title: "Response Time",
    content: (
      <>
        <p className="font-medium">
          We usually reply within 30 minutes
        </p>

        <p className="mt-3">
          Whether it's a product recommendation,
          an order update, or a general question,
          we'll do our best to respond quickly during
          business hours.
        </p>
      </>
    ),
  },
];

export default function BusinessInfo() {
  return (
    <section
      id="business-info"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-7xl ">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Business Information
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Everything You Need Before Ordering
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Here's some helpful information about
            our services, delivery, payments, and
            support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {info.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-slate-200 bg-slate-50 p-8 transition hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                  <Icon className="h-7 w-7 text-sky-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <div className="mt-4 space-y-1 leading-7 text-slate-600">
                  {item.content}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}