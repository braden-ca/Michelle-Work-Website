"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Login failed.");
      return;
    }

    router.refresh();
  };

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-6 py-24">
      <div className="w-full rounded-2xl border border-neutral-200 bg-white p-8 text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">
          Restricted
        </p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight text-neutral-900">Admin Login</h1>
        <p className="mt-2 text-sm text-neutral-500">
          Enter the admin password to view submitted applications.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4 text-left">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-neutral-700 disabled:opacity-50"
          >
            {loading ? "Checking…" : "Log In"}
          </button>
        </form>
      </div>
    </div>
  );
}
