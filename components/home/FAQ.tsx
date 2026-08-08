"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location. We aim to deliver as quickly as possible across Nepal. Instant delivery within Kathmandu Valley is coming soon.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We currently accept Cash on Delivery (COD) and eSewa.",
  },
  {
    question: "How can I track my order?",
    answer:
      "Once your order is confirmed, we'll keep you updated about its status. Order tracking will also be available on our website.",
  },
  // {
  //   question: "Can you recommend a fragrance for me?",
  //   answer:
  //     "Absolutely! Use our fragrance recommendation section or message us on WhatsApp, and we'll help you find a scent that suits your preferences.",
  // },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        <div className="">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            FAQ
          </span>

          <h2 className="mt-4 text-2xl font-medium text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="mt-12 space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-xl border border-slate-200 bg-white"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between p-6 text-left"
              >
                <span className="font-semibold text-slate-900">
                  {faq.question}
                </span>

                <ChevronDown
                  className={`transition ${
                    open === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {open === index && (
                <div className="px-6 pb-6 text-slate-600">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}