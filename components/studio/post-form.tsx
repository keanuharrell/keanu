"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { createPostAction, updatePostAction } from "@/app/actions/posts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Post } from "@/db/schemas";

interface PostFormProps {
  post?: Post;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!post;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const isPublished = formData.get("isPublished") === "on";

    const data = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      excerpt: formData.get("excerpt") as string,
      content: formData.get("content") as string,
      isPublished,
      publishedAt: isPublished ? new Date() : null,
    };

    startTransition(async () => {
      if (isEditing) {
        await updatePostAction(post.id, data);
      } else {
        await createPostAction(data);
      }
      router.push("/studio/posts");
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const slugInput = document.getElementById("slug") as HTMLInputElement;
      if (slugInput) {
        slugInput.value = slugify(e.target.value);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Post Details</CardTitle>
          <CardDescription>Basic information about your post.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={post?.title ?? ""}
                onChange={handleTitleChange}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={post?.slug ?? ""}
                required
              />
            </Field>
          </div>
          <Field>
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              defaultValue={post?.excerpt ?? ""}
              placeholder="A short summary of your post..."
              rows={2}
              required
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
          <CardDescription>
            Write your post content in Markdown.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Field>
            <Textarea
              id="content"
              name="content"
              defaultValue={post?.content ?? ""}
              placeholder="Write your post content here..."
              rows={20}
              className="font-mono"
              required
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Publishing</CardTitle>
          <CardDescription>
            Control the visibility of your post.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Switch
              id="isPublished"
              name="isPublished"
              defaultChecked={post?.isPublished ?? false}
            />
            <Label htmlFor="isPublished">Publish this post</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/studio/posts")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
              ? "Save Changes"
              : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
