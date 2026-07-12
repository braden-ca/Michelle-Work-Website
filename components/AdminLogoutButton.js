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
      className="rounded-full border border-neutral-300 px-4 py-2 text-xs font-semibold text-neutral-600 transition-colors hover:border-neutral-900 hover:text-neutral-900"
    >
      Log Out
    </button>
  );
}
