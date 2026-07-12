import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(circle at 15% 20%, rgba(245,158,11,0.15), transparent 45%), radial-gradient(circle at 85% 0%, rgba(148,163,184,0.15), transparent 40%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 sm:py-28 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-amber-400">
              {siteConfig.company}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mt-3 text-xl text-slate-300">{siteConfig.title}</p>
            {(siteConfig.nmls || siteConfig.dre) && (
              <p className="mt-3 text-sm text-slate-400">
                {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" | ")}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={siteConfig.applyOnlineUrl || "/document-upload"}
                className="rounded-full bg-amber-500 px-7 py-3.5 text-sm font-semibold text-slate-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-slate-600 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-slate-400 hover:bg-white/5"
              >
                About Michelle
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/80 p-7 text-center shadow-xl backdrop-blur">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-full ring-4 ring-slate-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.headshot}
                alt={siteConfig.name}
                className="h-full w-full object-cover"
              />
            </div>
            <h2 className="mt-5 text-xs font-semibold uppercase tracking-widest text-slate-400">
              Contact Information
            </h2>
            <p className="mt-3 text-base">
              <a href={siteConfig.phoneHref} className="text-white transition-colors hover:text-amber-400">
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1 text-base">
              <a href={`mailto:${siteConfig.email}`} className="break-all text-white transition-colors hover:text-amber-400">
                {siteConfig.email}
              </a>
            </p>
            <a
              href="/api/vcard"
              className="mt-5 inline-block rounded-full border border-slate-600 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors hover:border-amber-400 hover:text-amber-400"
            >
              Download VCard
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">How Can We Help?</h2>
          <p className="mt-3 text-slate-600">
            Everything you need to start and complete your loan, in one place.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            href={siteConfig.applyOnlineUrl || "/document-upload"}
            external={Boolean(siteConfig.applyOnlineUrl)}
            step="01"
            title="Apply Online"
            description="Begin your loan application process now."
            cta="Apply Now"
          />
          <FeatureCard
            href="/document-upload"
            step="02"
            title="Secure Document Upload"
            description="Upload documents for your application process with our secure online portal."
            cta="Upload Documents"
          />
          <FeatureCard
            href="/mortgage-tools"
            step="03"
            title="Mortgage Tools"
            description="Use our mortgage calculator and other tools to help with your loan process."
            cta="Resources"
          />
          <FeatureCard
            href="/forms"
            step="04"
            title="Forms"
            description="Download forms, including the loan application, borrower authorization form, and more."
            cta="Forms"
          />
        </div>
      </section>
    </div>
  );
}
