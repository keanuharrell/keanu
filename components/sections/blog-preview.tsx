import Link from "next/link";

import { Container } from "@/components/layout";
import { PostListItem } from "@/components/post-list-item";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { Post } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface BlogPreviewProps {
  posts: Post[];
}

export function BlogPreview({ posts }: BlogPreviewProps) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading>Writing</SectionHeading>
        {posts.length > 0 ? (
          <>
            <div className="divide-y divide-border">
              {posts.map((post) => (
                <PostListItem key={post.id} post={post} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                View all posts
              </Link>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </Container>
    </section>
  );
}
