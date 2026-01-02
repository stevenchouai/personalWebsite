import { Container } from "@/components/Container";
import {
  repositoryInfo,
  languages,
  projectStats,
  techStack,
} from "@/lib/github";
import Link from "next/link";

export const metadata = {
  title: "Projects",
  description: "Explore my projects, repository statistics, and technology stack",
};

export default function ProjectsPage() {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Projects
          </h1>
          <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            A showcase of my work, including repository statistics, technology stack, and development insights.
          </p>
        </section>

        {/* Repository Overview */}
        <section className="mb-12">
          <div className="card p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <h2 className="text-2xl font-semibold tracking-tight">
                    {repositoryInfo.owner}/{repositoryInfo.name}
                  </h2>
                </div>
                <p className="muted text-sm mb-4">{repositoryInfo.description}</p>
                <div className="flex flex-wrap gap-3 text-sm">
                  <span className="flex items-center gap-1.5">
                    <span className="size-3 rounded-full bg-[var(--accent)]"></span>
                    <span className="muted">Created {formatDate(repositoryInfo.createdAt)}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="muted">Updated {formatDate(repositoryInfo.updatedAt)}</span>
                  </span>
                </div>
              </div>
              <a
                href={repositoryInfo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View on GitHub
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </section>

        {/* Statistics Grid */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Project Statistics
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card p-6">
              <div className="text-3xl font-bold font-mono mb-2">
                {projectStats.totalCommits}
              </div>
              <div className="text-sm text-[var(--muted)] uppercase tracking-wider">
                Total Commits
              </div>
            </div>
            <div className="card p-6">
              <div className="text-3xl font-bold font-mono mb-2">
                {projectStats.totalFiles}
              </div>
              <div className="text-sm text-[var(--muted)] uppercase tracking-wider">
                Source Files
              </div>
            </div>
            <div className="card p-6">
              <div className="text-3xl font-bold font-mono mb-2">
                {(projectStats.linesOfCode / 1000).toFixed(1)}K
              </div>
              <div className="text-sm text-[var(--muted)] uppercase tracking-wider">
                Lines of Code
              </div>
            </div>
            <div className="card p-6">
              <div className="text-3xl font-bold font-mono mb-2">
                {projectStats.contributors}
              </div>
              <div className="text-sm text-[var(--muted)] uppercase tracking-wider">
                Contributors
              </div>
            </div>
          </div>
        </section>

        {/* Language Distribution */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Language Distribution
          </h2>
          <div className="card p-6 sm:p-8">
            <div className="space-y-5">
              {languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-3 rounded-full"
                        style={{ backgroundColor: lang.color }}
                      ></span>
                      <span className="font-medium">{lang.name}</span>
                    </div>
                    <span className="text-sm text-[var(--muted)]">
                      {lang.percentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="h-2 bg-[var(--card-2)] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: lang.color,
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Stack */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold tracking-tight mb-6">
            Technology Stack
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {techStack.map((tech) => (
              <div key={tech.name} className="card card-hover p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base mb-1">{tech.name}</h3>
                    <p className="text-sm text-[var(--muted)]">{tech.category}</p>
                  </div>
                  <span className="kbd text-xs">{tech.version}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section>
          <div className="card p-8 text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              Explore Development History
            </h2>
            <p className="muted text-base mb-6 max-w-2xl mx-auto">
              View detailed commit history with explanations for each change, including why decisions were made and what problems were solved.
            </p>
            <Link href="/commits" className="btn btn-primary">
              View Commit History
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </Container>
    </div>
  );
}
