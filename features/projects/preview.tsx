import Link from "next/link";

import { Container } from "@/components/layout";
import { FadeIn, StaggerItem, StaggerList } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getFeaturedProjects } from "@/lib/db";
import { cn } from "@/lib/utils";

export async function Preview() {
  const projects = await getFeaturedProjects();
  return (
    <section id="projects" className="py-16">
      <Container>
        <SectionHeading>Featured Projects</SectionHeading>
        {projects.length > 0 ? (
          <>
            <StaggerList
              className="grid gap-4 md:grid-cols-2"
              staggerDelay={0.15}
            >
              {projects.map((project) => (
                <StaggerItem key={project.id}>
                  <ProjectCard project={project} />
                </StaggerItem>
              ))}
            </StaggerList>
            <FadeIn delay={0.4} className="mt-8">
              <Link
                href="/projects"
                className={cn(
                  buttonVariants({ variant: "outline", size: "sm" }),
                )}
              >
                View all projects
              </Link>
            </FadeIn>
          </>
        ) : (
          <p className="text-muted-foreground">No featured projects yet.</p>
        )}
      </Container>
    </section>
  );
}

export function PreviewSkeleton() {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading>Featured Projects</SectionHeading>
        <div className="grid gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={`${i}`}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <Skeleton className="mb-2 h-6 w-3/4" />
              <Skeleton className="mb-4 h-4 w-full" />
              <Skeleton className="mb-4 h-4 w-2/3" />
              <div className="mt-auto flex gap-2 pt-4">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
