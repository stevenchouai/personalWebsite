import Link from "next/link";
import { contact, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-black/5 py-10">
      <div className="container flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--muted)]">
          © {new Date().getFullYear()} {site.name}. Built with Next.js.
        </div>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <Link className="link-accent" href="/blog">
            Blog
          </Link>
          <Link className="link-accent" href="/resume">
            Resume
          </Link>
          <a className="link-accent" href={`mailto:${contact.email}`}>
            {contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}


