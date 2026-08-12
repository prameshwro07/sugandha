import PolicyLayout from "@/components/legal/PolicyLayout";

export default function PrivacyPolicyPage() {
  return (
    <PolicyLayout
      title="Privacy Policy"
      description="Your privacy is important to us. This policy explains what information we collect, how we use it, and how we protect it."
    >
      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          1. Information We Collect
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          When you place an order or contact us, we may collect the following
          information:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Full Name</li>
          <li>Phone Number</li>
          <li>Email Address (if provided)</li>
          <li>Delivery Address</li>
          <li>Order Details</li>
          <li>Payment Method</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          2. How We Use Your Information
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          We use your information only to provide our services and improve your
          shopping experience. This includes:
        </p>

        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-600">
          <li>Processing and confirming your orders.</li>
          <li>Delivering your products.</li>
          <li>Providing customer support.</li>
          <li>Sending order updates when necessary.</li>
          <li>Improving our website and services.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          3. Your Privacy Matters
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          We respect your privacy. We do <strong>not sell, rent, or trade</strong>
          your personal information, including your name, phone number, email
          address, or delivery address, to third parties for marketing or
          advertising purposes.
        </p>

        <p className="mt-4 leading-8 text-slate-600">
          We only share the information that is necessary to complete your order,
          such as providing your name, phone number, and delivery address to our
          trusted delivery partners.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          4. Data Security
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          We take reasonable measures to protect your personal information from
          unauthorized access, misuse, or disclosure. While no online system is
          completely secure, we continuously work to keep your information safe.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          5. Cookies
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          Our website may use cookies or similar technologies to improve website
          performance, remember your preferences, and enhance your browsing
          experience.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          6. Your Rights
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          If you believe any of your personal information is incorrect or would
          like it updated or removed, please contact us. We will do our best to
          respond promptly, subject to any legal or business requirements to
          retain certain records.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold text-slate-900">
          7. Contact Us
        </h2>

        <p className="mt-3 leading-8 text-slate-600">
          If you have any questions about this Privacy Policy or how your
          information is handled, please contact us through our Contact page.
        </p>
      </section>

      <div className="border-t border-slate-200 pt-6 text-sm text-slate-500">
        Last Updated: July 2026
      </div>
    </PolicyLayout>
  );
}