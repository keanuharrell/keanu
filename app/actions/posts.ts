"use server";

import { revalidatePath } from "next/cache";

import type { NewPost } from "@/db/schemas";
import { createPost, deletePost, updatePost } from "@/lib/db";

export async function createPostAction(data: NewPost) {
  const post = await createPost(data);
  revalidatePath("/studio/posts");
  revalidatePath("/blog");
  revalidatePath("/");
  return post;
}

export async function updatePostAction(
  id: number,
  data: Partial<Omit<NewPost, "id">>,
) {
  const post = await updatePost(id, data);
  revalidatePath("/studio/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post?.slug}`);
  revalidatePath("/");
  return post;
}

export async function deletePostAction(id: number) {
  await deletePost(id);
  revalidatePath("/studio/posts");
  revalidatePath("/blog");
  revalidatePath("/");
}

export async function togglePublishAction(id: number, isPublished: boolean) {
  const post = await updatePost(id, {
    isPublished,
    publishedAt: isPublished ? new Date() : null,
  });
  revalidatePath("/studio/posts");
  revalidatePath("/blog");
  revalidatePath(`/blog/${post?.slug}`);
  revalidatePath("/");
  return post;
}
