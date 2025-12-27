import type { Metadata } from "next";

import { Container } from "@/components/layout";
import { PostListItem } from "@/components/post-list-item";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/db";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, design, and more.",
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading>Blog</SectionHeading>
        {posts.length > 0 ? (
          <div className="divide-y divide-border">
            {posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No posts yet. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}
