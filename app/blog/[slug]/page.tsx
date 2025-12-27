import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Container } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import { getPostBySlug } from "@/lib/db";
import { cn } from "@/lib/utils";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Keanu Harrell",
    };
  }

  return {
    title: `${post.title} | Keanu Harrell`,
    description: post.excerpt,
  };
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="py-24">
      <Container>
        <Link
          href="/blog"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 -ml-3",
          )}
        >
          ← Back to blog
        </Link>

        <header className="mb-12">
          <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
            {post.title}
          </h1>
          <time
            className="mt-4 block text-muted-foreground text-sm"
            dateTime={post.publishedAt?.toISOString()}
          >
            {formatDate(post.publishedAt)}
          </time>
        </header>

        <div className="prose prose-invert prose-lg max-w-none prose-code:rounded prose-pre:border prose-pre:border-border prose-code:bg-muted prose-pre:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-headings:font-medium prose-a:text-primary prose-headings:tracking-tight prose-a:no-underline prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline">
          <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>
        </div>
      </Container>
    </article>
  );
}
