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
      <h1 className="text-2xl font-bold text-slate-900">Admin Login</h1>
      <p className="mt-2 text-center text-sm text-slate-600">
        Enter the admin password to view submitted applications.
      </p>
      <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400 disabled:opacity-50"
        >
          {loading ? "Checking…" : "Log In"}
        </button>
      </form>
    </div>
  );
}
