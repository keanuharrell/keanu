import { StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";

import type { Post } from "@/db/schemas";
import { calculateReadingTime, formatReadingTime } from "@/lib/blog";

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
  const readingTime = calculateReadingTime(post.content);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block py-4 transition-colors"
    >
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="flex items-center gap-2 font-medium text-foreground transition-colors group-hover:text-primary">
          {post.isFeatured && (
            <HugeiconsIcon
              icon={StarIcon}
              className="size-4 fill-yellow-500 text-yellow-500"
            />
          )}
          {post.title}
        </h3>
        <div className="flex items-center gap-2 text-muted-foreground text-sm">
          <time dateTime={post.publishedAt?.toISOString()}>
            {formatDate(post.publishedAt)}
          </time>
          <span>·</span>
          <span>{formatReadingTime(readingTime)}</span>
        </div>
      </div>
      <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
        {post.excerpt}
      </p>
    </Link>
  );
}
