import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";
import { BlogList, BlogListSkeleton } from "@/features/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Thoughts on software development, design, and more.",
};

export default function BlogPage() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading>Blog</SectionHeading>
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogList />
        </Suspense>
      </Container>
    </section>
  );
}
