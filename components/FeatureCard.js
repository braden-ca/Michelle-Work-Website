import Link from "next/link";

export default function FeatureCard({ href, step, title, description, cta, external }) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-neutral-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.25)]"
    >
      <div>
        {step && (
          <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-neutral-400">
            {step}
          </span>
        )}
        <h3 className="mt-3 text-lg font-semibold tracking-tight text-neutral-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-neutral-500">{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-900 transition-all group-hover:gap-3">
        {cta} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
