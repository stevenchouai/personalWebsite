"use client";

import { Container } from "@/components/Container";
import { commits } from "@/lib/github";
import { useState } from "react";

export default function CommitsPage() {
  const [expandedCommit, setExpandedCommit] = useState<string | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      full: date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      relative: getRelativeTime(date),
    };
  };

  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffInSeconds < 60) return "刚刚";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} 分钟前`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} 小时前`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} 天前`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)} 周前`;
    return `${Math.floor(diffInSeconds / 2592000)} 个月前`;
  };

  const toggleExpand = (sha: string) => {
    setExpandedCommit(expandedCommit === sha ? null : sha);
  };

  return (
    <div className="py-14 sm:py-20">
      <Container>
        {/* Header */}
        <section className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Commit History
          </h1>
          <p className="muted mt-4 max-w-2xl text-base leading-7 sm:text-lg">
            Detailed development history with explanations for each commit. Learn why each change was made and what problems were solved.
          </p>
          <div className="mt-6 flex items-center gap-2">
            <span className="kbd">{commits.length} commits</span>
            <span className="text-sm text-[var(--muted)]">by {commits[0].author}</span>
          </div>
        </section>

        {/* Timeline */}
        <section className="relative">
          {/* Timeline line */}
          <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-[var(--border)] hidden sm:block"></div>

          <div className="space-y-6">
            {commits.map((commit, index) => {
              const dates = formatDate(commit.date);
              const isExpanded = expandedCommit === commit.sha;

              return (
                <div key={commit.sha} className="relative">
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 size-10 rounded-full bg-[var(--accent)] border-4 border-[var(--background)] hidden sm:flex items-center justify-center z-10">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Commit card */}
                  <div className="sm:ml-20">
                    <button
                      onClick={() => toggleExpand(commit.sha)}
                      className="w-full text-left card card-hover p-6 transition-all"
                    >
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="kbd font-mono text-xs">
                              {commit.sha}
                            </span>
                            <span className="text-xs text-[var(--muted)]">
                              {dates.relative}
                            </span>
                          </div>
                          <h3 className="text-lg font-semibold mb-2 leading-snug">
                            {commit.message}
                          </h3>
                          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                            <span>@{commit.author}</span>
                            <span>·</span>
                            <span>{dates.full}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {commit.explanation && (
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-3 py-1 text-xs font-medium text-[var(--accent-2)]">
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              详细说明
                            </span>
                          )}
                          <svg
                            className={`w-5 h-5 text-[var(--muted)] transition-transform ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>

                      {/* Expanded explanation */}
                      {isExpanded && commit.explanation && (
                        <div className="mt-6 pt-6 border-t border-[var(--border)]">
                          <div className="flex items-start gap-3">
                            <div className="size-8 rounded-full bg-[var(--accent)]/10 flex items-center justify-center flex-shrink-0 mt-1">
                              <svg className="w-4 h-4 text-[var(--accent)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold mb-2 text-[var(--accent-2)]">
                                为什么做这个提交？
                              </h4>
                              <p className="text-sm leading-relaxed text-[var(--foreground)]">
                                {commit.explanation}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Footer CTA */}
        <section className="mt-12">
          <div className="card p-8 text-center bg-gradient-to-br from-[var(--card)] to-[var(--card-2)]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent)]/10 px-4 py-2 text-sm font-medium text-[var(--accent-2)] mb-4">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
              透明的开发过程
            </div>
            <h2 className="text-2xl font-semibold tracking-tight mb-3">
              每个改动都有原因
            </h2>
            <p className="muted text-base mb-6 max-w-2xl mx-auto">
              这个页面展示了项目的完整开发历史。每个commit都包含详细的说明，解释为什么做这个改动、解决了什么问题、以及技术决策的考量。
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href="https://github.com/stevenchouai/personalWebsite/commits/main"
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
      </Container>
    </div>
  );
}
