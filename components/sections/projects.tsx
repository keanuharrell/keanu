import Link from "next/link";

import { Container } from "@/components/layout";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import type { Project } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface ProjectsPreviewProps {
  projects: Project[];
}

export function ProjectsPreview({ projects }: ProjectsPreviewProps) {
  return (
    <section id="projects" className="py-16">
      <Container>
        <SectionHeading>Featured Projects</SectionHeading>
        {projects.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                View all projects
              </Link>
            </div>
          </>
        ) : (
          <p className="text-muted-foreground">No featured projects yet.</p>
        )}
      </Container>
    </section>
  );
}
