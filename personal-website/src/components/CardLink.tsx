import Link from "next/link";
import type { ReactNode } from "react";

export function CardLink({
  href,
  title,
  description,
  icon,
  meta,
  className,
}: {
  href: string;
  title: string;
  description: string;
  icon?: ReactNode;
  meta?: ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`card card-hover block p-5 focus:outline-none focus-visible:ring-4 focus-visible:ring-[var(--ring)] ${className ?? ""}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            {icon ? <div className="text-[var(--accent-2)]">{icon}</div> : null}
            <h3 className="text-base font-semibold tracking-tight">{title}</h3>
          </div>
          <p className="muted mt-1 text-sm leading-6">{description}</p>
        </div>
        {meta ? (
          <div className="shrink-0 text-xs text-[var(--muted-2)]">{meta}</div>
        ) : null}
      </div>
    </Link>
  );
}


