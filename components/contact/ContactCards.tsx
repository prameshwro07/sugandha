import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const contacts = [
  {
    title: "Call Us",
    value: "+977 9818849093",
    description: "Speak directly with our team.",
    href: "tel:+9779818849093",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    value: "Chat with us",
    description: "Usually replies within 30 minutes.",
    href: "https://wa.me/9779744589112",
    icon: MessageCircle,
  },
  {
    title: "Email",
    value: "support@sugandha.com",
    description: "We'll get back to you as soon as possible.",
    href: "mailto:support@shopsugandha.com",
    icon: Mail,
  },
  {
    title: "Delivery Area",
    value: "All Across Nepal",
    description: "Instant delivery coming soon inside Kathmandu Valley.",
    href: "#business-info",
    icon: MapPin,
  },
];

export default function ContactCards() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="mx-auto max-w-7xl">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Get In Touch
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            We're Always Happy to Help
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Choose the contact method that's most convenient for you.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {contacts.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-3xl border border-slate-200 bg-slate-50 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-sky-200 hover:bg-white hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-100">
                    <Icon className="h-7 w-7 text-sky-600" />
                  </div>

                  <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-sky-600" />
                </div>

                <h3 className="mt-6 text-xl font-semibold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-2 font-medium text-sky-600">
                  {item.value}
                </p>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}