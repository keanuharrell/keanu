import { desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { posts } from "@/db/schemas";

export async function getAllPosts() {
  return db
    .select()
    .from(posts)
    .where(eq(posts.isPublished, true))
    .orderBy(desc(posts.publishedAt));
}

export async function getRecentPosts(limit = 5) {
  return db
    .select()
    .from(posts)
    .where(eq(posts.isPublished, true))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}

export async function getPostBySlug(slug: string) {
  const result = await db
    .select()
    .from(posts)
    .where(eq(posts.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function incrementViewCount(slug: string) {
  const post = await getPostBySlug(slug);
  if (!post) return;

  await db
    .update(posts)
    .set({ viewCount: post.viewCount + 1 })
    .where(eq(posts.slug, slug));
}
