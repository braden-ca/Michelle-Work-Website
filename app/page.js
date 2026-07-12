import Link from "next/link";
import FeatureCard from "@/components/FeatureCard";
import { siteConfig } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-neutral-950 text-white">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-70" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 20% 15%, rgba(255,255,255,0.08), transparent 40%), radial-gradient(circle at 90% 90%, rgba(255,255,255,0.05), transparent 45%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-24 sm:py-32 md:grid-cols-[1fr_320px] md:items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
              {siteConfig.company}
            </p>
            <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">
              {siteConfig.name}
            </h1>
            <p className="mt-4 text-xl text-neutral-300">{siteConfig.title}</p>
            {(siteConfig.nmls || siteConfig.dre) && (
              <p className="mt-3 font-mono text-xs uppercase tracking-widest text-neutral-500">
                {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" · ")}
              </p>
            )}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href={siteConfig.applyOnlineUrl || "/document-upload"}
                className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-neutral-200"
              >
                Apply Now
              </Link>
              <Link
                href="/about"
                className="rounded-full border border-neutral-700 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:border-neutral-400 hover:bg-white/5"
              >
                About Michelle
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/80 p-7 text-center backdrop-blur">
            <div className="mx-auto h-36 w-36 overflow-hidden rounded-full ring-1 ring-neutral-700">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={siteConfig.headshot}
                alt={siteConfig.name}
                className="h-full w-full object-cover grayscale"
              />
            </div>
            <h2 className="mt-6 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-neutral-500">
              Contact
            </h2>
            <p className="mt-3 text-base">
              <a href={siteConfig.phoneHref} className="text-white transition-colors hover:text-neutral-300">
                {siteConfig.phone}
              </a>
            </p>
            <p className="mt-1 text-base">
              <a href={`mailto:${siteConfig.email}`} className="break-all text-white transition-colors hover:text-neutral-300">
                {siteConfig.email}
              </a>
            </p>
            <a
              href="/api/vcard"
              className="mt-6 inline-block rounded-full border border-neutral-700 px-4 py-2 text-xs font-semibold text-neutral-200 transition-colors hover:border-white hover:text-white"
            >
              Download VCard
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-24">
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">
            What we offer
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
            Everything you need, in one place.
          </h2>
          <p className="mt-3 text-neutral-500">
            A streamlined path to start and complete your loan — from application to closing.
          </p>
        </div>
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
            description="Upload documents for your application through our secure online portal."
            cta="Upload Documents"
          />
          <FeatureCard
            href="/mortgage-tools"
            step="03"
            title="Mortgage Tools"
            description="Use our mortgage calculator and other tools to guide your loan process."
            cta="Resources"
          />
          <FeatureCard
            href="/forms"
            step="04"
            title="Forms"
            description="Download the loan application, borrower authorization form, and more."
            cta="Forms"
          />
        </div>
      </section>
    </div>
  );
}
