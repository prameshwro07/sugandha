// "use client";

// import { useState } from "react";
// import { ChevronDown } from "lucide-react";

// const faqs = [
//   {
//     question: "How long does delivery take?",
//     answer:
//       "Delivery time depends on your location. We aim to deliver as quickly as possible across Nepal.",
//   },
//   {
//     question: "What payment methods do you accept?",
//     answer:
//       "We currently accept Cash on Delivery (COD) and eSewa.",
//   },
//   {
//     question: "How can I track my order?",
//     answer:
//       "Once your order is confirmed, we'll keep you updated about its status. Order tracking will also be available on our website.",
//   },
// ];


// export default function FAQ() {
//   const [open, setOpen] = useState<number | null>(0);

//   return (
//     <section className="bg-slate-50 pb-8">
//       <div className="w-full px-4 sm:px-6 lg:px-0">

//           <h2 className="mt-2 text-xl font-medium text-slate-900">
//             Frequently Asked Questions
//           </h2>

//         <div className="mt-6 space-y-2">
//           {faqs.map((faq, index) => (
//             <div
//               key={faq.question}
//               className="rounded-lg border border-slate-200 bg-white"
//             >
//               <button
//                 onClick={() =>
//                   setOpen(open === index ? null : index)
//                 }
//                 className="flex w-full items-center justify-between px-5 py-4 text-left"
//               >
//                 <span className="text-sm font-semibold text-slate-900">
//                   {faq.question}
//                 </span>

//                 <ChevronDown
//                   size={18}
//                   className={`shrink-0 transition ${open === index ? "rotate-180" : ""
//                     }`}
//                 />
//               </button>

//               {open === index && (
//                 <div className="px-5 pb-4 text-sm leading-5 text-slate-600">
//                   {faq.answer}
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//       </div>
//     </section>
//   );
// }


"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Do you deliver perfumes and attars across Nepal?",
    answer:
      "Yes. Sugandha delivers perfumes and alcohol-free attars across Nepal. Delivery time depends on your location, and we provide order updates after your order is confirmed.",
  },
  {
    question: "What payment methods does Sugandha accept?",
    answer:
      "Sugandha currently accepts Cash on Delivery (COD) and eSewa for online orders.",
  },
  {
    question: "Are Sugandha attars alcohol-free?",
    answer:
      "Our attar collection is presented as alcohol-free fragrances. Please check the individual product description for product-specific details before ordering.",
  },
  {
    question: "How long does delivery take in Nepal?",
    answer:
      "Delivery time varies depending on your location in Nepal. We aim to process and deliver orders as quickly as possible and provide updates after your order is confirmed.",
  },
  {
    question: "How can I track my Sugandha order?",
    answer:
      "After your order is confirmed, we provide updates about its status. You can also contact Sugandha using the available contact options if you need help with an order.",
  },
  {
    question: "Can I order perfumes and attars online from Sugandha?",
    answer:
      "Yes. You can browse the Sugandha collection online, choose your preferred perfume or attar, add it to your cart, and place an order using the available payment options.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      aria-labelledby="faq-heading"
      className="bg-slate-50 pb-8"
    >
      <div className="w-full px-4 sm:px-6 lg:px-0">

        <h2
          id="faq-heading"
          className="mt-2 text-xl font-medium text-slate-900"
        >
          Frequently Asked Questions
        </h2>

        <div className="mt-6 space-y-2">
          {faqs.map((faq, index) => {
            const isOpen = open === index;

            return (
              <div
                key={faq.question}
                className="rounded-lg border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpen(isOpen ? null : index)
                  }
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    size={18}
                    aria-hidden="true"
                    className={`shrink-0 transition ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 text-sm leading-6 text-slate-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}