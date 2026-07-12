import MortgageCalculator from "@/components/MortgageCalculator";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Mortgage Tools | ${siteConfig.name}`,
};

export default function MortgageToolsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-20">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-neutral-400">Tools</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-neutral-900">Mortgage Tools</h1>
      <p className="mt-3 max-w-2xl text-neutral-500">
        Estimate a monthly payment below. For a personalized quote, reach out to {siteConfig.name}{" "}
        directly.
      </p>

      <div className="mt-12">
        <MortgageCalculator />
      </div>
    </div>
  );
}
