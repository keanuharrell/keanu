import Link from "next/link";

import type { Post } from "@/db/schemas";

interface PostListItemProps {
  post: Post;
}

function formatDate(date: Date | null): string {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(date);
}

export function PostListItem({ post }: PostListItemProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-4 transition-colors"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="font-medium text-foreground transition-colors group-hover:text-primary">
          {post.title}
        </h3>
        <time
          className="text-muted-foreground text-sm"
          dateTime={post.publishedAt?.toISOString()}
        >
          {formatDate(post.publishedAt)}
        </time>
      </div>
      <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
        {post.excerpt}
      </p>
    </Link>
  );
}
