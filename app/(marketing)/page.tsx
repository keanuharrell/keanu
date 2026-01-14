import { Suspense } from "react";
import { Hero } from "@/components/sections";
import { BlogPreview, BlogPreviewSkeleton } from "@/features/blog";
import { ProjectsPreview, ProjectsPreviewSkeleton } from "@/features/projects";

export default function Page() {
  return (
    <>
      <Hero />
      <Suspense fallback={<ProjectsPreviewSkeleton />}>
        <ProjectsPreview />
      </Suspense>
      <Suspense fallback={<BlogPreviewSkeleton />}>
        <BlogPreview />
      </Suspense>
    </>
  );
}
