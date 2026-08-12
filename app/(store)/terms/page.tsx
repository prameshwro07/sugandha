import PolicyLayout from "@/components/legal/PolicyLayout";

export default function TermsPage() {
  return (
    <PolicyLayout
      title="Terms & Conditions"
      description="Please read these terms carefully before using Sugandha. By accessing our website or placing an order, you agree to these terms."
    >
      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          1. General
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          Welcome to Sugandha. By using our website, you agree to comply with
          these Terms & Conditions. If you do not agree with any part of these
          terms, please do not use our website or services.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          2. Products
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>We strive to display accurate product information.</li>
          <li>Product images may slightly differ due to lighting or screen settings.</li>
          <li>Availability may change without prior notice.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Pricing
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          All prices are listed in Nepalese Rupees (NPR). Sugandha reserves the
          right to update prices, promotions, or product availability without
          prior notice.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Orders
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Orders are confirmed only after successful verification.</li>
          <li>We reserve the right to cancel fraudulent or suspicious orders.</li>
          <li>Customers must provide accurate delivery information.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Shipping
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          Delivery times may vary depending on your location, weather conditions,
          courier services, and other unforeseen circumstances.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          6. Returns & Refunds
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          Please refer to our Return Policy for complete details regarding
          returns, replacements, and refunds.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          7. Intellectual Property
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          All website content, including logos, product images, graphics, and
          text, belongs to Sugandha and may not be copied or reproduced without
          permission.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          8. Contact
        </h2>

        <p className="mt-3 text-slate-600 leading-8">
          If you have any questions regarding these Terms & Conditions, please
          contact us through our Contact page.
        </p>
      </section>

      <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Last Updated: July 2026
      </div>
    </PolicyLayout>
  );
}