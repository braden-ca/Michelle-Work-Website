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
        <h1 className="text-2xl font-bold text-slate-900">Submitted Applications</h1>
        <AdminLogoutButton />
      </div>

      {loadError && <p className="mt-6 text-sm text-red-600">{loadError}</p>}

      {!loadError && submissions.length === 0 && (
        <p className="mt-6 text-sm text-slate-500">No submissions yet.</p>
      )}

      <div className="mt-8 space-y-6">
        {submissions.map((sub) => (
          <details
            key={sub.submissionId}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <summary className="flex cursor-pointer flex-wrap items-center justify-between gap-2">
              <span className="font-semibold text-slate-900">
                {sub.borrower?.firstName} {sub.borrower?.lastName}
              </span>
              <span className="text-xs text-slate-500">
                {new Date(sub.submittedAt).toLocaleString()}
              </span>
            </summary>

            <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
              <div>
                <p className="text-slate-500">Email</p>
                <p className="text-slate-900">{sub.borrower?.email}</p>
              </div>
              <div>
                <p className="text-slate-500">Phone</p>
                <p className="text-slate-900">{sub.borrower?.phone}</p>
              </div>
              <div>
                <p className="text-slate-500">Property Address</p>
                <p className="text-slate-900">
                  {[sub.property?.address, sub.property?.city, sub.property?.state, sub.property?.zip]
                    .filter(Boolean)
                    .join(", ") || "—"}
                </p>
              </div>
              <div>
                <p className="text-slate-500">Loan</p>
                <p className="text-slate-900">
                  {sub.loan?.transactionType || "—"} · {sub.loan?.propertyType || "—"}
                  {sub.loan?.amount ? ` · $${sub.loan.amount}` : ""}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-slate-500 text-sm">Signature</p>
              <p className="font-serif italic text-slate-900">{sub.signature}</p>
            </div>

            <div className="mt-6">
              <p className="text-sm font-semibold text-slate-900">Uploaded Documents</p>
              <div className="mt-2 space-y-2">
                {Object.entries(sub.files || {}).map(([categoryId, files]) =>
                  files.length > 0 ? (
                    <div key={categoryId} className="text-sm">
                      <span className="font-medium text-slate-700">{categoryId}: </span>
                      {files.map((f, i) => (
                        <a
                          key={f.url}
                          href={f.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-amber-600 hover:underline"
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
