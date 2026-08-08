export default function ContactForm() {
  return (
    <section
      id="contact-form"
      className="bg-slate-50 py-24"
    >
      <div className="mx-auto max-w-3xl px-6">

        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.25em] text-sky-600">
            Contact Form
          </span>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            Need Help?
          </h2>

          <p className="mt-6 text-lg text-slate-600">
            Send us a message and we'll get back to you as soon as
            possible.
          </p>
        </div>

        <form className="mt-12 space-y-6">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          <input
            type="text"
            placeholder="Subject"
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          <textarea
            rows={6}
            placeholder="How can we help you?"
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          <button
            className="w-full rounded-xl bg-sky-500 py-4 font-semibold text-white transition hover:bg-sky-600"
          >
            Send Message
          </button>
        </form>

      </div>
    </section>
  );
}