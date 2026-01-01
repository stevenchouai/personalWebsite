import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { Container } from "@/components/Container";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return (
    <div className="py-12 sm:py-16">
      <Container>
        <div className="flex items-center justify-between gap-4">
          <Link className="btn btn-ghost text-sm" href="/blog">
            ← Back
          </Link>
          <div className="text-xs text-[var(--muted-2)]">
            {post.frontmatter.date}
          </div>
        </div>

        <header className="mt-7">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {post.frontmatter.title}
          </h1>
          {post.frontmatter.description ? (
            <p className="muted mt-3 max-w-2xl text-base leading-7">
              {post.frontmatter.description}
            </p>
          ) : null}
        </header>

        <article className="card mt-8 p-6 sm:p-8">
          <div className="prose prose-zinc max-w-none">
            <MDXRemote
              source={post.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>
        </article>
      </Container>
    </div>
  );
}


