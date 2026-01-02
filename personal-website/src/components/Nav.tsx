"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { useState } from "react";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Nav() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color:rgba(255,247,237,0.78)] backdrop-blur">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 card px-4 py-2"
      >
        Skip to content
      </a>
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-2xl border border-black/10 bg-white/70 font-semibold">
            SC
          </div>
          <div className="leading-tight">
            <div className="text-sm font-semibold tracking-tight">
              {site.name}
            </div>
            <div className="text-xs text-[var(--muted)]">{site.title}</div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 lg:flex">
          {site.nav
            .filter((l) => l.href !== "/")
            .map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/70 text-[color:var(--foreground)]"
                      : "text-[color:var(--muted)] hover:bg-white/60 hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
        </nav>

        {/* Desktop CTA Buttons */}
        <div className="hidden sm:flex items-center gap-2">
          <Link className="btn btn-ghost text-sm" href="/contact">
            Contact
          </Link>
          <Link className="btn btn-primary text-sm" href="/resume">
            Resume
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/60 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {mobileMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-black/5 bg-[color:rgba(255,247,237,0.95)] backdrop-blur">
          <nav className="container py-4 space-y-1">
            {site.nav.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                    active
                      ? "bg-white/70 text-[color:var(--foreground)]"
                      : "text-[color:var(--muted)] hover:bg-white/60 hover:text-[color:var(--foreground)]"
                  }`}
                >
                  {l.label}
                </Link>
              );
            })}
            <div className="pt-3 flex gap-2">
              <Link
                href="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 btn btn-ghost text-sm justify-center"
              >
                Contact
              </Link>
              <Link
                href="/resume"
                onClick={() => setMobileMenuOpen(false)}
                className="flex-1 btn btn-primary text-sm justify-center"
              >
                Resume
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
