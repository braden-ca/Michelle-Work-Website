import MortgageCalculator from "@/components/MortgageCalculator";
import { siteConfig } from "@/lib/site-config";

export const metadata = {
  title: `Mortgage Tools | ${siteConfig.name}`,
};

export default function MortgageToolsPage() {
  return (
    <div className="mx-auto w-full max-w-4xl px-6 py-16">
      <h1 className="text-3xl font-bold text-slate-900">Mortgage Tools</h1>
      <p className="mt-3 text-slate-600">
        Use the calculator below to estimate a monthly payment. For a personalized quote, reach
        out to {siteConfig.name} directly.
      </p>

      <div className="mt-10">
        <MortgageCalculator />
      </div>
    </div>
  );
}
