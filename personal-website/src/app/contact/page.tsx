import type { Metadata } from "next";
import { Container } from "@/components/Container";
import { contact, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Contact
            </h1>
            <p className="muted mt-3 max-w-xl text-base leading-7">
              The fastest way to reach me is email. If you include context and a
              clear ask, I’ll respond quicker.
            </p>

            <div className="mt-6 card p-5">
              <div className="text-xs font-semibold text-[var(--muted)]">
                Email
              </div>
              <a
                className="mt-2 block text-base font-semibold link-accent"
                href={`mailto:${contact.email}`}
              >
                {contact.email}
              </a>
              <div className="muted mt-2 text-sm leading-6">
                Tip: add a subject like <span className="kbd">Website</span> so
                I see it quickly.
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card p-5">
              <h2 className="text-base font-semibold tracking-tight">
                Quick message
              </h2>
              <p className="muted mt-1 text-sm leading-6">
                This opens your email client with a pre-filled draft.
              </p>

              <form
                className="mt-5 grid gap-4"
                action={`mailto:${contact.email}`}
                method="post"
                encType="text/plain"
              >
                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="name">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    className="h-11 rounded-2xl border border-black/10 bg-white/70 px-4 outline-none focus:ring-4 focus:ring-[var(--ring)]"
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="h-11 rounded-2xl border border-black/10 bg-white/70 px-4 outline-none focus:ring-4 focus:ring-[var(--ring)]"
                    placeholder="you@example.com"
                    autoComplete="email"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-sm font-medium" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="resize-none rounded-2xl border border-black/10 bg-white/70 px-4 py-3 outline-none focus:ring-4 focus:ring-[var(--ring)]"
                    placeholder={`Hi Steven,\n\nI'm reaching out about...`}
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button type="submit" className="btn btn-primary">
                    Compose email
                  </button>
                  <div className="text-xs text-[var(--muted-2)]">
                    Prefer direct email? Use{" "}
                    <a className="link-accent" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}


