import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { PostsTable } from "@/components/studio/posts-table";
import { buttonVariants } from "@/components/ui/button";
import { getAllPosts } from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function PostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Posts</h1>
          <p className="text-muted-foreground">
            Create and manage your blog posts.
          </p>
        </div>
        <Link
          href="/studio/posts/new"
          className={cn(buttonVariants(), "gap-2")}
        >
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          New Post
        </Link>
      </div>

      <PostsTable posts={posts} />
    </div>
  );
}
