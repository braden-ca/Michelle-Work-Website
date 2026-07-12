"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/lib/site-config";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/mortgage-tools", label: "Mortgage Tools" },
  { href: "/forms", label: "Forms" },
  { href: "/document-upload", label: "Document Upload" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white">
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            className="rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
          >
            Apply Online
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-slate-200 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-slate-800 px-6 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-slate-300 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-amber-500 px-5 py-2 text-center text-sm font-semibold text-slate-900"
          >
            Apply Online
          </Link>
        </nav>
      )}
    </header>
  );
}
