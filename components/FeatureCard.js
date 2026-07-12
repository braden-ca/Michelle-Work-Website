import Link from "next/link";

export default function FeatureCard({ href, step, title, description, cta, external }) {
  const linkProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Link
      href={href}
      {...linkProps}
      className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-amber-200 hover:shadow-lg"
    >
      <div>
        {step && (
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
            {step}
          </span>
        )}
        <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-amber-600 group-hover:gap-2 transition-all">
        {cta} <span aria-hidden>→</span>
      </span>
    </Link>
  );
}
