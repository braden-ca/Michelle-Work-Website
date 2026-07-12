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
    <div className="mx-auto w-full max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Forms</h1>
      <p className="mt-3 text-slate-600">
        Download the forms below, complete and sign them, then upload them through the{" "}
        <a href="/document-upload" className="font-medium text-amber-600 hover:underline">
          Secure Document Upload
        </a>{" "}
        portal.
      </p>

      <div className="mt-10 space-y-4">
        {forms.map((form) => (
          <div
            key={form.title}
            className="flex flex-col justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center"
          >
            <div>
              <h2 className="font-semibold text-slate-900">{form.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{form.description}</p>
            </div>
            {form.href ? (
              <a
                href={form.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 rounded-full bg-amber-500 px-5 py-2 text-sm font-semibold text-slate-900 hover:bg-amber-400"
              >
                Download
              </a>
            ) : (
              <span className="shrink-0 rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-400">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
