import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/Container";
import { getAllPosts } from "@/lib/blog";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: `Writing by ${site.name}.`,
};

export default function BlogIndexPage() {
  const posts = getAllPosts();

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Blog
            </h1>
            <p className="muted mt-2 max-w-2xl text-base leading-7">
              Short notes on software engineering, AI tooling, and investing
              systems that compound.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4">
          {posts.length === 0 ? (
            <div className="card p-5">
              <div className="text-sm font-semibold">No posts yet</div>
              <p className="muted mt-2 text-sm leading-6">
                Add MDX files under <span className="kbd">content/blog</span>.
              </p>
            </div>
          ) : (
            posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card card-hover block p-5"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="text-base font-semibold tracking-tight">
                      {p.frontmatter.title}
                    </div>
                    {p.frontmatter.description ? (
                      <p className="muted mt-1 text-sm leading-6">
                        {p.frontmatter.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="shrink-0 text-xs text-[var(--muted-2)]">
                    {p.frontmatter.date}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </Container>
    </div>
  );
}


