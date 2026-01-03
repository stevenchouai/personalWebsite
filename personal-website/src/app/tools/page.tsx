import { Container } from "@/components/Container";
import { CardLink } from "@/components/CardLink";
import Link from "next/link";

export const metadata = {
  title: "Tools",
  description: "Free investment and financial planning tools to help you build wealth",
};

export default function ToolsPage() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Investment Tools
            <span className="text-[color:var(--muted)]"> — Free calculators</span>
          </h1>
          <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            Practical tools to help you plan your investment strategy and build
            long-term wealth. All calculators are free to use and require no
            sign-up.
          </p>
        </section>

        {/* Tools Grid */}
        <section className="mb-12">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <CardLink
              href="/tools/dca-calculator"
              title="DCA Calculator"
              description="Calculate your S&P 500 investment growth with dollar-cost averaging strategy."
              meta="Most popular"
              className="h-full"
            />

            {/* Placeholder for future tools */}
            <div className="card card-hover p-5 opacity-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    FIRE Calculator
                  </h3>
                  <p className="muted mt-1 text-sm leading-6">
                    Calculate when you can achieve financial independence and
                    retire early.
                  </p>
                </div>
                <div className="text-xs text-[var(--muted-2)]">Coming soon</div>
              </div>
            </div>

            <div className="card card-hover p-5 opacity-50">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-base font-semibold tracking-tight">
                    Compound Interest
                  </h3>
                  <p className="muted mt-1 text-sm leading-6">
                    See how your money grows over time with compound interest.
                  </p>
                </div>
                <div className="text-xs text-[var(--muted-2)]">Coming soon</div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section */}
        <section>
          <div className="card p-8">
            <h2 className="text-2xl font-semibold tracking-tight mb-4">
              Why These Tools?
            </h2>
            <div className="space-y-4 text-sm leading-relaxed text-[var(--muted)]">
              <p>
                These calculators are built to help you make informed investment
                decisions. They're based on historical data and proven investment
                strategies, but remember: past performance doesn't guarantee
                future results.
              </p>
              <p>
                All tools are free, open-source, and require no sign-up. Your
                data stays in your browser and is never sent to any server.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href="/" className="btn btn-ghost">
                  ← Back to home
                </Link>
                <Link href="/blog" className="btn btn-ghost">
                  Read the blog
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

