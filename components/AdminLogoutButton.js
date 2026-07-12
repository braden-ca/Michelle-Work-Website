"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.refresh();
      }}
      className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-600 hover:border-slate-400"
    >
      Log Out
    </button>
  );
}
