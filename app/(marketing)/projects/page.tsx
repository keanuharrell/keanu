import type { Metadata } from "next";
import { Suspense } from "react";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";
import { ProjectsList, ProjectsListSkeleton } from "@/features/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've worked on.",
};

export default function ProjectsPage() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading>Projects</SectionHeading>
        <Suspense fallback={<ProjectsListSkeleton />}>
          <ProjectsList />
        </Suspense>
      </Container>
    </section>
  );
}
