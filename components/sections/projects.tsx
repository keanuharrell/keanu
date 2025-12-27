import { Container } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import type { Project } from "@/db/schemas";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-16">
      <Container>
        <SectionHeading>Projects</SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </Container>
    </section>
  );
}
