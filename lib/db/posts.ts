import { and, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { type NewPost, posts } from "@/db/schemas";

export async function getAllPosts(publishedOnly = false) {
  if (publishedOnly) {
    return db
      .select()
      .from(posts)
      .where(eq(posts.isPublished, true))
      .orderBy(desc(posts.publishedAt));
  }
  return db.select().from(posts).orderBy(desc(posts.createdAt));
}

export async function getRecentPosts(limit = 5) {
  return db
    .select()
    .from(posts)
    .where(eq(posts.isPublished, true))
    .orderBy(desc(posts.publishedAt))
    .limit(limit);
}

export async function getFeaturedPosts() {
  return db
    .select()
    .from(posts)
    .where(and(eq(posts.isPublished, true), eq(posts.isFeatured, true)))
    .orderBy(desc(posts.publishedAt));
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

export async function getPostById(id: number) {
  const result = await db.select().from(posts).where(eq(posts.id, id)).limit(1);

  return result[0] ?? null;
}

export async function createPost(data: NewPost) {
  const result = await db.insert(posts).values(data).returning();
  return result[0];
}

export async function updatePost(
  id: number,
  data: Partial<Omit<NewPost, "id">>,
) {
  const result = await db
    .update(posts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(posts.id, id))
    .returning();
  return result[0];
}

export async function deletePost(id: number) {
  await db.delete(posts).where(eq(posts.id, id));
}
