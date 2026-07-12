import { cookies } from "next/headers";
import { list } from "@vercel/blob";
import AdminLogin from "@/components/AdminLogin";
import AdminLogoutButton from "@/components/AdminLogoutButton";

export const dynamic = "force-dynamic";

async function getSubmissions() {
  const { blobs } = await list({ prefix: "submissions/" });
  const submissions = await Promise.all(
    blobs.map(async (blob) => {
      const res = await fetch(blob.url, { cache: "no-store" });
      return res.json();
    })
  );
  return submissions.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime()
  );
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  const isAuthed = process.env.ADMIN_PASSWORD && session === process.env.ADMIN_PASSWORD;

  if (!isAuthed) {
    return <AdminLogin />;
  }

  let submissions = [];
  let loadError = "";
  try {
    submissions = await getSubmissions();
  } catch {
    loadError =
      "Could not load submissions. Make sure BLOB_READ_WRITE_TOKEN is configured for this environment.";
  }

  return (
    <div className="mx-auto w-full max-w-5xl px-6 py-12">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-400">Admin</p>
          <h1 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900">Submitted Applications</h1>
        </div>
        <AdminLogoutButton />
      </div>

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loadError && submissions.length === 0 && (
        <p className="mt-6 text-sm text-neutral-500">No submissions yet.</p>
      )}

      <div className="mt-8 space-y-4">
        {submissions.map((sub) => (
          <details
            key={sub.submissionId}
            className="rounded-2xl border border-neutral-200 bg-white p-6 transition-colors hover:border-neutral-300"
          >
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-neutral-900">
                {sub.borrower?.firstName} {sub.borrower?.lastName}
              </span>
              <span className="font-mono text-xs text-neutral-400">
                {new Date(sub.submittedAt).toLocaleString()}
              </span>
            </summary>

            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Email</p>
                <p className="text-neutral-900">{sub.borrower?.email}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Phone</p>
                <p className="text-neutral-900">{sub.borrower?.phone}</p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Property Address</p>
                <p className="text-neutral-900">
                  {[sub.property?.address, sub.property?.city, sub.property?.state, sub.property?.zip]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Loan</p>
                <p className="text-neutral-900">
                  {sub.loan?.transactionType || "—"} · {sub.loan?.propertyType || "—"}
                  {sub.loan?.amount ? ` · $${sub.loan.amount}` : ""}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-400">Signature</p>
              <p className="font-serif italic text-neutral-900">{sub.signature}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900">Uploaded Documents</p>
              <div className="mt-2 space-y-2">
                {Object.entries(sub.files || {}).map(([categoryId, files]) =>
                  files.length > 0 ? (
                    <div key={categoryId} className="text-sm">
                      <span className="font-medium text-neutral-700">{categoryId}: </span>
                      {files.map((f, i) => (
                        <a
                          key={f.url}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-neutral-900 underline underline-offset-2 hover:text-neutral-500"
                        >
                          {f.name}
                          {i < files.length - 1 ? ", " : ""}
                        </a>
                      ))}
                    </div>
                  ) : null
                )}
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
