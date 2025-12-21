import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type BlogPostFrontmatter = {
  title: string;
  date: string; // ISO-ish
  description?: string;
};

export type BlogPost = {
  slug: string;
  frontmatter: BlogPostFrontmatter;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

  const posts = files.map((file) => {
    const fullPath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(fullPath, "utf8");
    const { data } = matter(raw);
    const slug = file.replace(/\.(md|mdx)$/, "");
    return {
      slug,
      frontmatter: {
        title: String(data.title ?? slug),
        date: String(data.date ?? ""),
        description: data.description ? String(data.description) : undefined,
      },
    } satisfies BlogPost;
  });

  posts.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
  return posts;
}

export function getPostBySlug(slug: string): {
  frontmatter: BlogPostFrontmatter;
  content: string;
} {
  const mdxPath = path.join(BLOG_DIR, `${slug}.mdx`);
  const mdPath = path.join(BLOG_DIR, `${slug}.md`);
  const fullPath = fs.existsSync(mdxPath) ? mdxPath : mdPath;
  const raw = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  return {
    frontmatter: {
      title: String(data.title ?? slug),
      date: String(data.date ?? ""),
      description: data.description ? String(data.description) : undefined,
    },
    content,
  };
}


