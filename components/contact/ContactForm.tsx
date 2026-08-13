"use client";

import { useEffect, useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/profile/details");

        if (!res.ok) {
          setLoading(false);
          return;
        }

        const data = await res.json();

        if (data.user) {
          setForm((prev) => ({
            ...prev,
            name: data.user.name ?? "",
            email: data.user.email ?? "",
            phone: data.user.phone ?? "",
          }));
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSending(true);
    setSuccess("");
    setError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to send message.");
        return;
      }

      setSuccess("Your message has been sent successfully!");

      // Keep user's profile information
      // but clear subject and message
      setForm((prev) => ({
        ...prev,
        subject: "",
        message: "",
      }));
    } catch (error) {
      console.error("CONTACT_FORM_ERROR:", error);

      setError("Something went wrong. Please try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section
      id="contact-form"
      className="bg-white py-24"
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

        <form
          onSubmit={handleSubmit}
          className="mt-12 space-y-6"
        >
          {/* Name */}
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            disabled={loading || sending}
            required
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500 disabled:bg-slate-50"
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email Address"
            disabled={loading || sending}
            required
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500 disabled:bg-slate-50"
          />

          {/* Phone */}
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            disabled={loading || sending}
            required
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500 disabled:bg-slate-50"
          />

          {/* Subject */}
          <input
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            disabled={sending}
            required
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          {/* Message */}
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            rows={6}
            placeholder="How can we help you?"
            disabled={sending}
            required
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:border-sky-500"
          />

          {/* Success */}
          {success && (
            <p className="rounded-lg bg-green-50 px-4 py-3 text-sm font-medium text-green-600">
              {success}
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={sending}
            className="
              w-full
              rounded-xl
              bg-sky-500
              py-4
              font-semibold
              text-white
              transition
              hover:bg-sky-600
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

      </div>
    </section>
  );
}