import PolicyLayout from "@/components/legal/PolicyLayout";

export default function ShippingPolicyPage() {
  return (
    <PolicyLayout
      title="Shipping Policy"
      description="We are committed to delivering your favorite fragrances safely and on time. Here's everything you need to know about our shipping process."
    >
      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          1. Delivery Areas
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Sugandha delivers fragrance products across Nepal. We work to ensure
          every order reaches you safely and as quickly as possible.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          2. Order Processing
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Orders are typically processed within <strong>24 hours</strong> after
          they are confirmed. Orders placed on weekends or public holidays may
          be processed on the next business day.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Estimated Delivery Time
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>
            <strong>Kathmandu Valley:</strong> Usually 1–2 business days.
          </li>
          <li>
            <strong>Outside Kathmandu Valley:</strong> Usually 2–5 business
            days, depending on your location.
          </li>
        </ul>

        <p className="mt-4 leading-8 text-slate-600">
          Delivery times are estimates and may vary due to weather, road
          conditions, courier delays, or other unforeseen circumstances.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Instant Delivery (Coming Soon)
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          We're working on introducing an <strong> Instant Delivery </strong>
          service within Kathmandu, Lalitpur, and Bhaktapur. Once available,
          eligible orders may be delivered within just a few hours.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Shipping Charges
        </h2>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Shipping charges are shown during checkout.</li>
          <li>
            Free delivery is available on eligible orders during promotional
            offers.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          6. Delivery Attempts
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Please ensure your delivery address and phone number are accurate.
          If our delivery partner cannot reach you after reasonable attempts,
          your order may be delayed, returned, or cancelled.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          7. Order Tracking
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Once your order has been confirmed, you can check its status through
          our Order Tracking page or contact our customer support team for
          assistance.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          8. Contact Us
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          If you have any questions about shipping or delivery, please visit our
          Contact page. Our team will be happy to assist you.
        </p>
      </section>

      <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Last Updated: July 2026
      </div>
    </PolicyLayout>
  );
}