import { notFound } from "next/navigation";

import { PostForm } from "@/components/studio/post-form";
import { getPostById } from "@/lib/db";

interface EditPostPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const post = await getPostById(Number(id));

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Edit Post</h1>
        <p className="text-muted-foreground">Update your blog post.</p>
      </div>

      <PostForm post={post} />
    </div>
  );
}
