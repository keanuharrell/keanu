import { cacheLife, cacheTag } from "next/cache";

import { StaggerItem, StaggerList } from "@/components/motion";
import { ProjectCard } from "@/components/project-card";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjects } from "@/lib/db";

export async function List() {
  "use cache";
  cacheTag("projects-list");
  cacheLife("days");

  const projects = await getAllProjects();

  if (projects.length === 0) {
    return (
      <p className="text-muted-foreground">No projects yet. Check back soon!</p>
    );
  }

  return (
    <StaggerList className="grid gap-4 md:grid-cols-2" staggerDelay={0.1}>
      {projects.map((project) => (
        <StaggerItem key={project.id}>
          <ProjectCard project={project} />
        </StaggerItem>
      ))}
    </StaggerList>
  );
}

export function ListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
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
  );
}
