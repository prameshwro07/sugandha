import PolicyLayout from "@/components/legal/PolicyLayout";

export default function ReturnPolicyPage() {
  return (
    <PolicyLayout
      title="Return & Refund Policy"
      description="We want you to shop with confidence. This policy explains when returns, replacements, and refunds are available."
    >
      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          1. Our Commitment
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          At Sugandha, customer satisfaction is our priority. If something goes
          wrong with your order, we're here to help and will work with you to
          find the best solution.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          2. Eligible for Return or Replacement
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          You may be eligible for a replacement or refund if:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>The product arrives damaged during delivery.</li>
          <li>You receive the wrong product.</li>
          <li>The product is missing from your order.</li>
          <li>The product has a manufacturing defect.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Not Eligible for Return
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Due to the personal nature of fragrances, we cannot accept returns or
          refunds in the following situations:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>The product has been opened or used.</li>
          <li>You changed your mind after receiving the product.</li>
          <li>You do not like the fragrance or scent.</li>
          <li>The product is damaged due to improper handling after delivery.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Reporting an Issue
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          If your order arrives damaged or incorrect, please contact us within
          <strong> 48 hours </strong>
          of receiving your order.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          To help us resolve your issue quickly, please provide:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Your Order ID.</li>
          <li>Photos of the product and packaging.</li>
          <li>A brief description of the issue.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Refund Process
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Once your request has been reviewed and approved, we will process your
          refund or replacement as quickly as possible. Refunds will be issued
          using an appropriate method depending on your original payment method.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          6. Contact Us
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          If you have any questions about returns or refunds, please contact our
          customer support team through our Contact page. We'll be happy to
          assist you.
        </p>
      </section>

      <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Last Updated: July 2026
      </div>
    </PolicyLayout>
  );
}