import { PostForm } from "@/components/studio/post-form";

export default function NewPostPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">New Post</h1>
        <p className="text-muted-foreground">Create a new blog post.</p>
      </div>

      <PostForm />
    </div>
  );
}
