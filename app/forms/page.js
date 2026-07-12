import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Forms | ${siteConfig.name}`,
};

const forms = [
  {
    title: "Loan Application",
    description: "Complete and sign this form, then upload it in the Secure Document Upload portal.",
    href: siteConfig.forms.loanApplication,
  },
  {
    title: "Borrower Authorization Form",
    description: "Authorizes Michelle to obtain the information needed to process your loan.",
    href: siteConfig.forms.borrowerAuthorization,
  },
];

export default function FormsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">Documents</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900">Forms</h1>
      <p className="mt-3 text-neutral-500">
        Download the forms below, complete and sign them, then upload them through the{" "}
        <a href="/document-upload" className="font-medium text-neutral-900 underline underline-offset-4 hover:text-neutral-500">
          Secure Document Upload
        </a>{" "}
        portal.
      </p>

      <div className="mt-12 space-y-4">
        {forms.map((form) => (
          <div
            key={form.title}
            className="flex flex-col justify-between gap-4 rounded-xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-900 sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-semibold text-neutral-900">{form.title}</h2>
              <p className="mt-1 text-sm text-neutral-500">{form.description}</p>
            </div>
            {form.href ? (
              <a
                href={form.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full bg-neutral-900 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-neutral-700"
              >
                Download
              </a>
            ) : (
              <span className="shrink-0 rounded-full border border-neutral-200 px-5 py-2 font-mono text-xs uppercase tracking-widest text-neutral-400">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
