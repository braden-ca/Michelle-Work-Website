import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

export default function Footer() {
  const socialLinks = Object.entries(siteConfig.social).filter(([, url]) => url);

  return (
    <footer className="border-t border-slate-800 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 sm:grid-cols-3">
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Contact
          </h3>
          <p className="mt-3 text-sm">
            Phone:{" "}
            <a href={siteConfig.phoneHref} className="hover:text-white">
              {siteConfig.phone}
            </a>
          </p>
          <p className="mt-1 text-sm">
            Email:{" "}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Navigate
          </h3>
          <ul className="mt-3 space-y-1 text-sm">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/document-upload" className="hover:text-white">Document Upload</Link></li>
            <li><Link href="/mortgage-tools" className="hover:text-white">Mortgage Tools</Link></li>
            <li><Link href="/forms" className="hover:text-white">Forms</Link></li>
          </ul>
        </div>

        {socialLinks.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
              Social
            </h3>
            <ul className="mt-3 space-y-1 text-sm capitalize">
              {socialLinks.map(([platform, url]) => (
                <li key={platform}>
                  <a href={url} className="hover:text-white" target="_blank" rel="noopener noreferrer">
                    {platform}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="border-t border-slate-800 px-6 py-6 text-center text-xs text-slate-500">
        <p>
          {(siteConfig.nmls || siteConfig.dre) && (
            <span className="block mb-1">
              {[siteConfig.nmls, siteConfig.dre].filter(Boolean).join(" | ")}
            </span>
          )}
          &copy; {new Date().getFullYear()} {siteConfig.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
