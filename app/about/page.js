import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `About | ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm sm:p-10">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.headshot}
            alt={siteConfig.name}
            className="h-40 w-40 shrink-0 rounded-full object-cover ring-4 ring-slate-100"
          />
          <div>
            <h1 className="text-3xl font-bold text-slate-900">{siteConfig.name}</h1>
            <p className="mt-1 text-lg text-slate-600">
              {siteConfig.title}, {siteConfig.company}
            </p>
            {(siteConfig.nmls || siteConfig.dre) && (
              <p className="mt-2 text-sm font-medium text-slate-500">
                {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" | ")}
              </p>
            )}
          </div>
        </div>

        <hr className="my-8 border-slate-100" />

        <div className="space-y-4 text-base leading-7 text-slate-700">
          {siteConfig.bio.map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        <div className="mt-10 rounded-xl border border-amber-100 bg-amber-50/60 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Contact Information
          </h2>
          <p className="mt-3 text-slate-900">
            <a href={siteConfig.phoneHref} className="font-medium hover:text-amber-700">
              {siteConfig.phone}
            </a>
          </p>
          <p className="mt-1 text-slate-900">
            <a href={`mailto:${siteConfig.email}`} className="font-medium hover:text-amber-700">
              {siteConfig.email}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="/api/vcard"
              className="rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-slate-400"
            >
              Download VCard
            </a>
            <Link
              href="/document-upload"
              className="rounded-full bg-amber-500 px-4 py-2 text-xs font-semibold text-slate-900 transition-colors hover:bg-amber-400"
            >
              Upload Documents
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
