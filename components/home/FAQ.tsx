"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your location. We aim to deliver as quickly as possible across Nepal.",
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
];


export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-0">

          <h2 className="mt-2 text-xl font-medium text-slate-900">
            Frequently Asked Questions
          </h2>

        <div className="mt-6 space-y-2">
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-lg border border-slate-200 bg-white"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? null : index)
                }
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`shrink-0 transition ${open === index ? "rotate-180" : ""
                    }`}
                />
              </button>

              {open === index && (
                <div className="px-5 pb-4 text-sm leading-5 text-slate-600">
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
