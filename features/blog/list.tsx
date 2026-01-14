import { cacheLife, cacheTag } from "next/cache";

import { StaggerItem, StaggerList } from "@/components/motion";
import { PostListItem } from "@/components/post-list-item";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPosts } from "@/lib/db";

export async function List() {
  "use cache";
  cacheTag("blog-list");
  cacheLife("days");

  const posts = await getAllPosts({ publishedOnly: true });

  if (posts.length === 0) {
    return (
      <p className="text-muted-foreground">No posts yet. Check back soon!</p>
    );
  }

  return (
    <StaggerList className="divide-y divide-border" staggerDelay={0.08}>
      {posts.map((post) => (
        <StaggerItem key={post.id} direction="left">
          <PostListItem post={post} />
        </StaggerItem>
      ))}
    </StaggerList>
  );
}

export function ListSkeleton() {
  return (
    <div className="divide-y divide-border">
      {Array.from({ length: 8 }).map((_, i) => (
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
  );
}
