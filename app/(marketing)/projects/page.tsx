import type { Metadata } from "next";

import { Container } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllProjects } from "@/lib/db";

export const metadata: Metadata = {
  title: "Projects",
  description: "A collection of projects I've worked on.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading>Projects</SectionHeading>
        {projects.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No projects yet. Check back soon!
          </p>
        )}
      </Container>
    </section>
  );
}
