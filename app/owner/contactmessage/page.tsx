"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type ContactMessage = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  createdAt: string;
};

export default function ContactMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/contact/messages");

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || "Failed to load messages.");
          return;
        }

        setMessages(data.messages || []);
      } catch (error) {
        console.error(error);
        setError("Failed to load contact messages.");
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-sky-600">
              Owner
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Contact Messages
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Messages received from your customers.
            </p>
          </div>

          {/* Dashboard Button */}
          <Link
            href="/owner/dashboard"
            className="
              inline-flex
              items-center
              justify-center
              border
              border-slate-300
              bg-white
              px-5
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              transition
              hover:border-sky-500
              hover:text-sky-600
            "
          >
            ← Dashboard
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
            Loading messages...
          </div>
        )}

        {/* Empty */}
        {!loading && !error && messages.length === 0 && (
          <div className="border border-slate-200 bg-white p-12 text-center">
            <h2 className="text-lg font-semibold text-slate-900">
              No contact messages
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Customer messages will appear here.
            </p>
          </div>
        )}

        {/* Messages */}
        {!loading && messages.length > 0 && (
          <div className="space-y-5">
            {messages.map((message) => (
              <div
                key={message._id}
                className="border border-slate-200 bg-white p-5 sm:p-6"
              >
                {/* Top row */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-lg font-bold text-slate-900">
                        {message.name}
                      </h2>

                      <span
                        className={`px-2 py-1 text-[11px] font-semibold ${
                          message.status === "New"
                            ? "bg-sky-50 text-sky-600"
                            : message.status === "Read"
                              ? "bg-slate-100 text-slate-600"
                              : "bg-green-50 text-green-600"
                        }`}
                      >
                        {message.status}
                      </span>
                    </div>

                    <p className="mt-1 text-sm text-slate-500">
                      {message.subject}
                    </p>
                  </div>

                  <p className="text-xs text-slate-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Customer details */}
                <div className="mt-5 grid gap-2 border-y border-slate-100 py-4 text-sm sm:grid-cols-2">
                  <p>
                    <span className="font-semibold text-slate-700">
                      Email:
                    </span>{" "}
                    <span className="text-slate-500">
                      {message.email}
                    </span>
                  </p>

                  <p>
                    <span className="font-semibold text-slate-700">
                      Phone:
                    </span>{" "}
                    <span className="text-slate-500">
                      {message.phone}
                    </span>
                  </p>
                </div>

                {/* Message */}
                <div className="mt-5">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Message
                  </p>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">
                    {message.message}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}