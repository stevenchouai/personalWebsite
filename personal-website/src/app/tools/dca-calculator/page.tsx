import { Container } from "@/components/Container";
import { DCACalculator } from "@/components/DCACalculator";
import Link from "next/link";

export const metadata = {
  title: "DCA Calculator - Dollar-Cost Averaging for S&P 500",
  description:
    "Calculate your potential returns from dollar-cost averaging into the S&P 500. Plan your investment strategy with daily, weekly, or monthly contributions.",
};

export default function DCACalculatorPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <section className="mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-[var(--muted)] mb-4">
            <span className="size-2 rounded-full bg-[var(--accent)]" />
            Investment Tool
            <span className="kbd ml-1">Free</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            DCA Calculator
            <span className="text-[color:var(--muted)]">
              {" "}
              — Dollar-Cost Averaging
            </span>
          </h1>

          <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            Calculate the potential growth of your investments using dollar-cost
            averaging into the S&P 500. See how regular, consistent investing can
            build wealth over time through the power of compound returns.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/" className="btn btn-ghost">
              ← Back to home
            </Link>
            <a
              href="https://www.investopedia.com/terms/d/dollarcostaveraging.asp"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              Learn more about DCA
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </section>

        {/* Calculator Component */}
        <DCACalculator />

        {/* Additional Resources */}
        <section className="mt-12">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-semibold tracking-tight mb-4">
              Getting Started with DCA
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-lg border border-black/10 bg-[var(--card-2)] p-4">
                <div className="text-2xl mb-2">📊</div>
                <h3 className="font-semibold mb-2">Choose Your Platform</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Popular options include Vanguard (VOO), Fidelity (IVV), or
                  Schwab (SPLG) for S&P 500 index funds with low expense ratios.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-[var(--card-2)] p-4">
                <div className="text-2xl mb-2">⚡</div>
                <h3 className="font-semibold mb-2">Automate Everything</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  Set up automatic transfers from your bank account. Most
                  brokerages allow scheduled purchases so you never miss an
                  investment.
                </p>
              </div>

              <div className="rounded-lg border border-black/10 bg-[var(--card-2)] p-4">
                <div className="text-2xl mb-2">🎯</div>
                <h3 className="font-semibold mb-2">Stay Consistent</h3>
                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  The key to DCA is consistency. Invest the same amount
                  regularly, regardless of market ups and downs. Time in the
                  market beats timing the market.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mt-8">
          <div className="rounded-2xl border border-black/10 bg-gradient-to-br from-blue-50 to-green-50 p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Ready to Start Your Investment Journey?
            </h2>
            <p className="muted text-base mb-6 max-w-2xl mx-auto">
              This calculator shows the potential of consistent investing. The
              best time to start was yesterday, the second best time is today.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link href="/blog" className="btn btn-primary">
                Read Investment Blog
              </Link>
              <Link href="/contact" className="btn btn-ghost">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

