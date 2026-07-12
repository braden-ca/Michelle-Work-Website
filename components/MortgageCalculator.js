"use client";

import { useMemo, useState } from "react";

const currency = (n) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(600000);
  const [downPayment, setDownPayment] = useState(120000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(30);
  const [taxesInsurance, setTaxesInsurance] = useState(500);

  const { principal, monthlyPI, monthlyTotal } = useMemo(() => {
    const principal = Math.max(homePrice - downPayment, 0);
    const monthlyRate = rate / 100 / 12;
    const numPayments = termYears * 12;

    const monthlyPI =
      monthlyRate === 0
        ? principal / numPayments
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));

    return {
      principal,
      monthlyPI: Number.isFinite(monthlyPI) ? monthlyPI : 0,
      monthlyTotal: (Number.isFinite(monthlyPI) ? monthlyPI : 0) + Number(taxesInsurance || 0),
    };
  }, [homePrice, downPayment, rate, termYears, taxesInsurance]);

  return (
    <div className="grid gap-px overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-200 md:grid-cols-2">
      <div className="space-y-5 bg-white p-6 sm:p-8">
        <NumberField label="Home Price" value={homePrice} onChange={setHomePrice} prefix="$" />
        <NumberField
          label="Down Payment"
          value={downPayment}
          onChange={setDownPayment}
          prefix="$"
        />
        <NumberField label="Interest Rate" value={rate} onChange={setRate} suffix="%" step={0.01} />
        <label className="block text-sm">
          <span className="mb-1.5 block font-medium text-neutral-700">Loan Term</span>
          <select
            value={termYears}
            onChange={(e) => setTermYears(Number(e.target.value))}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none focus:ring-1 focus:ring-neutral-900"
          >
            <option value={30}>30 years</option>
            <option value={20}>20 years</option>
            <option value={15}>15 years</option>
            <option value={10}>10 years</option>
          </select>
        </label>
        <NumberField
          label="Monthly Taxes & Insurance (est.)"
          value={taxesInsurance}
          onChange={setTaxesInsurance}
          prefix="$"
        />
      </div>

      <div className="relative flex flex-col justify-center overflow-hidden bg-neutral-950 p-8 text-white">
        <div className="tech-grid pointer-events-none absolute inset-0 opacity-60" />
        <div className="relative">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            Loan Amount
          </p>
          <p className="mt-1 text-2xl font-semibold">{currency(principal)}</p>

          <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-neutral-500">
            Estimated Monthly Payment
          </p>
          <p className="mt-1 text-5xl font-semibold tracking-tight">{currency(monthlyTotal)}</p>
          <p className="mt-2 text-xs text-neutral-400">
            Principal &amp; interest {currency(monthlyPI)} + taxes/insurance{" "}
            {currency(Number(taxesInsurance || 0))}
          </p>
          <p className="mt-8 text-xs leading-5 text-neutral-500">
            An estimate for informational purposes only; not an offer of credit. Contact Michelle
            for an accurate, personalized quote.
          </p>
        </div>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, prefix, suffix, step = 1 }) {
  return (
    <label className="block text-sm">
      <span className="mb-1.5 block font-medium text-neutral-700">{label}</span>
      <div className="flex items-center rounded-lg border border-neutral-300 px-3 py-2 focus-within:border-neutral-900 focus-within:ring-1 focus-within:ring-neutral-900">
        {prefix && <span className="mr-1 text-neutral-400">{prefix}</span>}
        <input
          type="number"
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full text-sm text-neutral-900 focus:outline-none"
        />
        {suffix && <span className="ml-1 text-neutral-400">{suffix}</span>}
      </div>
    </label>
  );
}
