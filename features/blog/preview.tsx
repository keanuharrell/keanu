import { cacheLife, cacheTag } from "next/cache";
import Link from "next/link";
import { Container } from "@/components/layout";
import { FadeIn, StaggerItem, StaggerList } from "@/components/motion";
import { PostListItem } from "@/components/post-list-item";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getRecentPosts } from "@/lib/db";
import { cn } from "@/lib/utils";

export async function Preview() {
  "use cache";
  cacheTag("blog-preview");
  cacheLife("days");

  const posts = await getRecentPosts(5);
  return (
    <section className="py-16">
      <Container>
        <SectionHeading>Writing</SectionHeading>
        {posts.length > 0 ? (
          <>
            <StaggerList className="divide-y divide-border" staggerDelay={0.1}>
              {posts.map((post) => (
                <StaggerItem key={post.id} direction="left">
                  <PostListItem post={post} />
                </StaggerItem>
              ))}
            </StaggerList>
            <FadeIn delay={0.3} className="mt-8">
              <Link
                href="/blog"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                View all posts
              </Link>
            </FadeIn>
          </>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </Container>
    </section>
  );
}

export function PreviewSkeleton() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading>Writing</SectionHeading>
        <div className="divide-y divide-border">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="py-4">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <Skeleton className="h-5 w-2/3 sm:w-1/2" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
              <Skeleton className="mt-2 h-4 w-full sm:w-3/4" />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
