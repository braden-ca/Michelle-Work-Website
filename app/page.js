import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:py-24 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-400">
              {siteConfig.company}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mt-2 text-lg text-slate-300">{siteConfig.title}</p>
            {(siteConfig.nmls || siteConfig.dre) && (
              <p className="mt-2 text-sm text-slate-400">
                {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" | ")}
              </p>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={siteConfig.applyOnlineUrl || "/document-upload"}
                className="rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-slate-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-slate-400"
              >
                About Michelle
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-800 p-6 text-center">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-full bg-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.headshot}
                alt={siteConfig.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-4 text-sm font-semibold uppercase tracking-wide text-slate-400">
              Contact Information
            </h2>
            <p className="mt-3">
              <a href={siteConfig.phoneHref} className="text-white hover:text-amber-400">
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1">
              <a href={`mailto:${siteConfig.email}`} className="break-all text-white hover:text-amber-400">
                {siteConfig.email}
              </a>
            </p>
            <a
              href="/api/vcard"
              className="mt-4 inline-block rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-200 hover:border-slate-400"
            >
              Download VCard
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            external={Boolean(siteConfig.applyOnlineUrl)}
            title="Apply Online"
            description="Begin your loan application process now."
            cta="Apply Now"
          />
          <FeatureCard
            href="/document-upload"
            title="Secure Document Upload"
            description="Upload documents for your application process with our secure online portal."
            cta="Upload Documents"
          />
          <FeatureCard
            href="/mortgage-tools"
            title="Mortgage Tools"
            description="Use our mortgage calculator and other tools to help with your loan process."
            cta="Resources"
          />
          <FeatureCard
            href="/forms"
            title="Forms"
            description="Download forms, including the loan application, borrower authorization form, and more."
            cta="Forms"
          />
        </div>
      </section>
    </div>
  );
}
