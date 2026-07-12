import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-neutral-800 bg-neutral-950 text-neutral-400">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={siteConfig.logo}
            alt={siteConfig.company}
            className="h-8 w-auto brightness-0 invert"
          />
          <p className="mt-4 text-base font-semibold text-white">{siteConfig.name}</p>
          <p className="mt-3 text-sm">
            <a href={siteConfig.phoneHref} className="transition-colors hover:text-white">
              {siteConfig.phone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-white">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Navigate
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link href="/about" className="transition-colors hover:text-white">About</Link></li>
            <li><Link href="/document-upload" className="transition-colors hover:text-white">Document Upload</Link></li>
            <li><Link href="/mortgage-tools" className="transition-colors hover:text-white">Mortgage Tools</Link></li>
            <li><Link href="/forms" className="transition-colors hover:text-white">Forms</Link></li>
          </ul>
        </div>

        {socialLinks.length > 0 && (
          <div>
            <h3 className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
              Social
            </h3>
            <ul className="mt-4 space-y-2 text-sm capitalize">
              {socialLinks.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} className="transition-colors hover:text-white" target="_blank" rel="noopener noreferrer">
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-neutral-800 px-6 py-6 text-center text-xs text-neutral-500">
        {(siteConfig.nmls || siteConfig.dre) && (
          <span className="mb-1 block">
            {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" | ")}
          </span>
        )}
        &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
      </div>
    </footer>
  );
}
