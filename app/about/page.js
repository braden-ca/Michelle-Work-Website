import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `About | ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-20">
      <div className="rounded-2xl border border-neutral-200 bg-white p-8 sm:p-12">
        <div className="flex flex-col items-center gap-8 text-center sm:flex-row sm:items-center sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.headshot}
            alt={siteConfig.name}
            className="h-40 w-40 shrink-0 rounded-full object-cover grayscale ring-1 ring-neutral-200"
          />
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-neutral-400">
              {siteConfig.company}
            </p>
            <h1 className="mt-3 text-4xl font-semibold tracking-tight text-neutral-900">
              {siteConfig.name}
            </h1>
            <p className="mt-2 text-lg text-neutral-500">{siteConfig.title}</p>
            {(siteConfig.nmls || siteConfig.dre) && (
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-400">
                {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" · ")}
              </p>
            )}
          </div>
        </div>

        <hr className="my-10 border-neutral-100" />

        <div className="space-y-4 text-base leading-7 text-neutral-600">
          {siteConfig.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-6">
          <h2 className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-400">
            Contact
          </h2>
          <p className="mt-3 text-neutral-900">
            <a href={siteConfig.phoneHref} className="font-medium transition-colors hover:text-neutral-500">
              {siteConfig.phone}
            </a>
          </p>
          <p className="mt-1 text-neutral-900">
            <a href={`mailto:${siteConfig.email}`} className="font-medium transition-colors hover:text-neutral-500">
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/api/vcard"
              className="rounded-full border border-neutral-300 bg-white px-4 py-2 text-xs font-semibold text-neutral-700 transition-colors hover:border-neutral-900"
            >
              Download VCard
            </a>
            <Link
              href="/document-upload"
              className="rounded-full bg-neutral-900 px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-neutral-700"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
