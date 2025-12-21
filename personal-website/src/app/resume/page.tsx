import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Resume",
  description: `Resume for ${site.name}.`,
};

function Item({
  title,
  right,
  children,
}: {
  title: string;
  right?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="card p-5">
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold tracking-tight">{title}</h3>
        {right ? (
          <div className="text-xs text-[var(--muted-2)]">{right}</div>
        ) : null}
      </div>
      <div className="muted mt-2 text-sm leading-6">{children}</div>
    </div>
  );
}

export default function ResumePage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Resume
            </h1>
            <p className="muted mt-2 max-w-2xl text-base leading-7">
              {site.name} — {site.title}. Focused on reliable systems, pragmatic
              AI tooling, and compounding improvement.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <a className="btn btn-ghost text-sm" href={`mailto:${contact.email}`}>
              Email
            </a>
            <Link className="btn btn-primary text-sm" href="/contact">
              Contact
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-4">
            <Item title="Summary">
              Software engineer with a bias for simple, scalable architectures,
              strong product sense, and measurable outcomes. Interested in FIRE,
              investing systems, and building AI tools that save time.
            </Item>

            <Item title="Experience (template)">
              <ul className="list-disc pl-5">
                <li>
                  <span className="font-medium text-[color:var(--foreground)]">
                    Company A
                  </span>{" "}
                  — Built X, improved Y, reduced Z.
                </li>
                <li>
                  <span className="font-medium text-[color:var(--foreground)]">
                    Company B
                  </span>{" "}
                  — Owned feature area, shipped integrations, improved reliability.
                </li>
              </ul>
              <div className="mt-2">
                <span className="text-xs text-[var(--muted-2)]">
                  Replace these bullets with your real roles and wins.
                </span>
              </div>
            </Item>

            <Item title="Projects (template)">
              <ul className="list-disc pl-5">
                <li>AI Tool: a small agent/workflow that automates a task.</li>
                <li>Investing tracker: dashboards, insights, rebalancing rules.</li>
                <li>Personal OS: notes + automation + review cycles.</li>
              </ul>
            </Item>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <Item title="Skills">
              <div className="flex flex-wrap gap-2">
                {[
                  "TypeScript",
                  "React / Next.js",
                  "Node.js",
                  "APIs",
                  "SQL",
                  "Testing",
                  "Cloud",
                  "LLM tooling",
                ].map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </Item>

            <Item title="Links (template)">
              <ul className="space-y-1">
                <li>
                  <span className="text-[var(--muted-2)]">GitHub:</span>{" "}
                  <span className="text-[var(--muted)]">
                    add-your-github-here
                  </span>
                </li>
                <li>
                  <span className="text-[var(--muted-2)]">LinkedIn:</span>{" "}
                  <span className="text-[var(--muted)]">
                    add-your-linkedin-here
                  </span>
                </li>
              </ul>
            </Item>

            <Item title="Education (template)">
              Degree, School — Year
            </Item>
          </div>
        </div>
      </Container>
    </div>
  );
}


