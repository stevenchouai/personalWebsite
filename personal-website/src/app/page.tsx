import Link from "next/link";
import { Container } from "@/components/Container";
import { CardLink } from "@/components/CardLink";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <div className="py-14 sm:py-20">
      <Container>
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs text-[var(--muted)]">
              <span className="size-2 rounded-full bg-[var(--accent)]" />
              Building: AI tools · FIRE · investing
              <span className="kbd ml-1">2025</span>
            </div>

            <h1 className="mt-5 text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl">
              {site.name}
              <span className="text-[color:var(--muted)]"> — {site.title}</span>
            </h1>

            <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
              I build practical software and write about systems that compound:
              engineering leverage, AI tooling, and long-term wealth building.
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link className="btn btn-primary" href="/resume">
                View resume
              </Link>
              <Link className="btn btn-ghost" href="/blog">
                Read the blog
              </Link>
              <Link className="btn btn-ghost" href="/contact">
                Get in touch
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-2 text-sm text-[var(--muted)]">
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">
                Software engineering
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">
                AI tooling
              </span>
              <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1">
                FIRE & investing
              </span>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="text-sm font-semibold tracking-tight">
              What you’ll find here
            </h2>
            <ul className="muted mt-3 space-y-2 text-sm leading-6">
              <li>
                <span className="font-medium text-[color:var(--foreground)]">
                  Resume:
                </span>{" "}
                impact-driven experience & skills
              </li>
              <li>
                <span className="font-medium text-[color:var(--foreground)]">
                  Blog:
                </span>{" "}
                short, practical notes
              </li>
              <li>
                <span className="font-medium text-[color:var(--foreground)]">
                  Contact:
                </span>{" "}
                reach out for roles or collaboration
              </li>
            </ul>
            <div className="mt-4 rounded-2xl border border-black/10 bg-[color:var(--card-2)] p-4">
              <div className="text-xs font-semibold text-[color:var(--muted)]">
                Philosophy
              </div>
              <div className="mt-2 text-sm leading-6">
                Focus on compounding wins: automate, document, and invest in
                systems.
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10 sm:mt-14">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-lg font-semibold tracking-tight">Explore</h2>
            <p className="muted text-sm">Bento-style quick access.</p>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <CardLink
                href="/resume"
                title="Resume"
                description="A clean, skimmable overview of experience, skills, and highlights."
                meta="Updated regularly"
                className="h-full"
              />
            </div>
            <div className="lg:col-span-5">
              <CardLink
                href="/blog"
                title="Blog"
                description="Notes on software, AI tooling, and investing systems that compound."
                meta="MDX posts"
                className="h-full"
              />
            </div>
            <div className="lg:col-span-6">
              <CardLink
                href="/projects"
                title="Projects"
                description="Repository statistics, technology stack, and development insights."
                meta="GitHub integration"
                className="h-full"
              />
            </div>
            <div className="lg:col-span-6">
              <CardLink
                href="/commits"
                title="Commits"
                description="Detailed commit history with explanations for each change."
                meta="Development timeline"
                className="h-full"
              />
            </div>
            <div className="lg:col-span-6">
              <CardLink
                href="/contact"
                title="Contact"
                description="Quick way to reach out for roles, consulting, or collaboration."
                meta="Email form"
                className="h-full"
              />
            </div>
            <div className="lg:col-span-6">
              <div className="card card-hover p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-base font-semibold tracking-tight">
                      Featured interests
                    </h3>
                    <p className="muted mt-1 text-sm leading-6">
                      FIRE, investing, and AI tools—practical, measurable, and
                      repeatable.
                    </p>
                  </div>
                  <div className="text-xs text-[var(--muted-2)]">
                    personal OS
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs">
                    Long-term mindset
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs">
                    Automation
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs">
                    Simplicity
                  </span>
                  <span className="rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs">
                    Leverage
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
