"use client";

import { useMemo, useState } from "react";
import UploadSlot from "@/components/UploadSlot";
import { uploadSections, transactionTypes, propertyTypes, usStates } from "@/lib/upload-categories";
import { siteConfig } from "@/lib/site-config";

const initialBorrower = { firstName: "", lastName: "", email: "", phone: "" };
const initialProperty = { address: "", city: "", state: "", zip: "" };
const initialLoan = { amount: "", value: "", transactionType: "", propertyType: "" };

export default function DocumentUploadPage() {
  const submissionId = useMemo(() => crypto.randomUUID(), []);

  const [borrower, setBorrower] = useState(initialBorrower);
  const [property, setProperty] = useState(initialProperty);
  const [loan, setLoan] = useState(initialLoan);
  const [filesByCategory, setFilesByCategory] = useState({});
  const [signature, setSignature] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const handleFilesChange = (categoryId, files) => {
    setFilesByCategory((prev) => ({ ...prev, [categoryId]: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!borrower.firstName || !borrower.lastName || !borrower.email || !borrower.phone) {
      setErrorMessage("Please complete all required borrower information fields.");
      return;
    }
    if (!signature || !agreedToTerms) {
      setErrorMessage('Please sign and check "I Accept" before submitting.');
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          borrower,
          property,
          loan,
          files: filesByCategory,
          signature,
          agreedToTerms,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Submission failed");
      }

      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Thank You!</h1>
        <p className="mt-3 text-slate-600">
          Your documents have been received. {siteConfig.name} will review your application and
          be in touch shortly.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-bold text-slate-900">Secure Document Form</h1>
      <p className="mt-3 text-slate-600">
        Thank you for your interest in applying for financing with {siteConfig.company} using our
        secure online portal.
      </p>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-slate-700">
        <h2 className="font-semibold text-slate-900">Begin Your Application in Three Easy Steps</h2>
        <ol className="mt-3 list-decimal space-y-2 pl-5">
          <li>Complete the Loan Application PDF (see the Forms page) and upload it below.</li>
          <li>Download and complete the Borrower Authorization Form, then upload it below.</li>
          <li>
            Upload all financial documents required for the loan process, check &ldquo;I
            Accept,&rdquo; sign, and press Submit.
          </li>
        </ol>
        <p className="mt-3">
          All pages of all documents are required, without redactions. Need help? Contact{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-medium underline">
            {siteConfig.email}
          </a>{" "}
          or{" "}
          <a href={siteConfig.phoneHref} className="font-medium underline">
            {siteConfig.phone}
          </a>
          .
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-10 space-y-12">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">Borrower Information</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="First Name" required>
              <input
                type="text"
                required
                value={borrower.firstName}
                onChange={(e) => setBorrower({ ...borrower, firstName: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Last Name" required>
              <input
                type="text"
                required
                value={borrower.lastName}
                onChange={(e) => setBorrower({ ...borrower, lastName: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Email" required>
              <input
                type="email"
                required
                value={borrower.email}
                onChange={(e) => setBorrower({ ...borrower, email: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Phone Number" required>
              <input
                type="tel"
                required
                value={borrower.phone}
                onChange={(e) => setBorrower({ ...borrower, phone: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Property Address</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Address Line 1" className="sm:col-span-2">
              <input
                type="text"
                value={property.address}
                onChange={(e) => setProperty({ ...property, address: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="City">
              <input
                type="text"
                value={property.city}
                onChange={(e) => setProperty({ ...property, city: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="State">
              <select
                value={property.state}
                onChange={(e) => setProperty({ ...property, state: e.target.value })}
                className={inputClass}
              >
                <option value="">Select State</option>
                {usStates.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Zip Code">
              <input
                type="text"
                value={property.zip}
                onChange={(e) => setProperty({ ...property, zip: e.target.value })}
                className={inputClass}
              />
            </Field>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">Loan &amp; Transaction Details</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <Field label="Loan Amount">
              <input
                type="text"
                value={loan.amount}
                onChange={(e) => setLoan({ ...loan, amount: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Value / Sales Price">
              <input
                type="text"
                value={loan.value}
                onChange={(e) => setLoan({ ...loan, value: e.target.value })}
                className={inputClass}
              />
            </Field>
            <Field label="Type of Transaction">
              <select
                value={loan.transactionType}
                onChange={(e) => setLoan({ ...loan, transactionType: e.target.value })}
                className={inputClass}
              >
                <option value="">Select Type of Transaction</option>
                {transactionTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Property Type">
              <select
                value={loan.propertyType}
                onChange={(e) => setLoan({ ...loan, propertyType: e.target.value })}
                className={inputClass}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        </section>

        {uploadSections.map((group) => (
          <section key={group.section}>
            <h2 className="text-lg font-semibold text-slate-900">{group.section}</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.categories.map((category) => (
                <UploadSlot
                  key={category.id}
                  category={category}
                  submissionId={submissionId}
                  onFilesChange={handleFilesChange}
                />
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">Agreement to Terms</h2>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-600">
            <li>Do not make any significant financial purchases during the loan process.</li>
            <li>
              A final credit check will be performed prior to close; no new debt or credit
              purchases previously undisclosed.
            </li>
            <li>Please avoid changes in employment or movement of assets during the loan process.</li>
          </ul>

          <div className="mt-6">
            <Field label="Please sign below (type your full legal name)" required>
              <input
                type="text"
                required
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Full legal name"
                className={`${inputClass} font-serif italic`}
              />
            </Field>
          </div>

          <label className="mt-4 flex items-start gap-2 text-sm text-slate-700">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5"
            />
            I Accept the terms above and certify the information provided is accurate.
          </label>
        </section>

        {errorMessage && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="w-full rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-amber-400 disabled:opacity-50"
        >
          {status === "submitting" ? "Submitting…" : "Submit Form"}
        </button>
        <p className="text-center text-xs text-slate-500">
          Please wait for the confirmation message after submitting. All information submitted is
          stored securely.
        </p>
      </form>
    </div>
  );
}

const inputClass =
  "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500";

function Field({ label, required, children, className = "" }) {
  return (
    <label className={`block text-sm ${className}`}>
      <span className="mb-1 block font-medium text-slate-700">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      {children}
    </label>
  );
}
