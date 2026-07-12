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
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex flex-col leading-none">
          <span className="text-base font-semibold tracking-tight text-neutral-900">
            {siteConfig.name}
          </span>
          <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.2em] text-neutral-400">
            {siteConfig.title}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            className="rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
          >
            Apply Online
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-sm font-medium text-neutral-700 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t border-neutral-200 px-6 pb-4 md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            onClick={() => setOpen(false)}
            className="mt-2 rounded-full bg-neutral-900 px-5 py-2 text-center text-sm font-semibold text-white"
          >
            Apply Online
          </Link>
        </nav>
      )}
    </header>
  );
}
