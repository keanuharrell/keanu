import { Clock01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TableOfContents } from "@/components/blog";
import { BlogPostingJsonLd } from "@/components/json-ld";
import { buttonVariants } from "@/components/ui/button";
import {
  calculateReadingTime,
  extractTableOfContents,
  formatReadingTime,
  processMarkdown,
} from "@/lib/blog";
import { getPostBySlug } from "@/lib/db";
import { cn } from "@/lib/utils";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://keanuharrell.com";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug, true);

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
  const post = await getPostBySlug(slug, true);

  if (!post) {
    notFound();
  }

  const readingTime = calculateReadingTime(post.content);
  const toc = extractTableOfContents(post.content);
  const htmlContent = await processMarkdown(post.content);

  return (
    <>
      <BlogPostingJsonLd
        title={post.title}
        description={post.excerpt ?? undefined}
        publishedAt={post.publishedAt}
        updatedAt={post.updatedAt}
        slug={slug}
        url={siteUrl}
      />
      <article>
        <div className="mx-auto w-full max-w-3xl px-6 md:px-8 xl:max-w-6xl">
          <div className="xl:grid xl:grid-cols-[1fr_280px] xl:gap-16">
            <div className="mx-auto max-w-3xl xl:mx-0">
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
                <div className="mt-4 flex items-center gap-4 text-muted-foreground text-sm">
                  <time dateTime={post.publishedAt?.toISOString()}>
                    {formatDate(post.publishedAt)}
                  </time>
                  <span className="flex items-center gap-1.5">
                    <HugeiconsIcon icon={Clock01Icon} className="size-4" />
                    {formatReadingTime(readingTime)}
                  </span>
                </div>
              </header>

              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-code:rounded prose-pre:border prose-pre:border-border prose-code:bg-muted prose-pre:bg-transparent prose-pre:p-0 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-normal prose-headings:font-medium prose-a:text-primary prose-headings:tracking-tight prose-a:no-underline prose-code:before:content-none prose-code:after:content-none hover:prose-a:underline [&_figure]:my-0 [&_figure_pre]:overflow-x-auto [&_figure_pre]:rounded-lg [&_figure_pre]:border [&_figure_pre]:border-border [&_figure_pre]:p-4"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
            </div>

            <TableOfContents items={toc} />
          </div>
        </div>
      </article>
    </>
  );
}
