"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Loader2 } from "lucide-react";

export function LoginClient() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/owner/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const result = await response.json();
    setLoading(false);

    if (!response.ok) {
      setMessage(result.message ?? "Login failed.");
      return;
    }

    router.replace("/owner/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-800">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-lg border border-sky-100 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.1)]"
      >
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-md bg-sky-100 text-sky-500">
            <LockKeyhole size={22} aria-hidden="true" />
          </span>
          <h1 className="text-xl font-bold text-slate-900">Owner access</h1>
        </div>
        <label className="block">
          <span className="text-sm font-semibold">Username</span>
          <input
            className="field mt-1"
            autoComplete="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label className="mt-4 block">
          <span className="text-sm font-semibold">Password</span>
          <input
            className="field mt-1"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {message ? <p className="mt-4 rounded-md bg-sky-50 p-3 text-sm font-medium">{message}</p> : null}
        <button
          disabled={loading}
          className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-sky-400 px-5 font-bold text-slate-950 disabled:opacity-70"
          type="submit"
        >
          {loading ? <Loader2 className="animate-spin" size={19} aria-hidden="true" /> : null}
          Sign in
        </button>
      </form>
    </main>
  );
}
