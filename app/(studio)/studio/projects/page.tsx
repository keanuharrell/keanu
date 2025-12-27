import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ProjectsTable } from "@/components/studio/projects-table";
import { buttonVariants } from "@/components/ui/button";
import { getAllProjects } from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Projects</h1>
          <p className="text-muted-foreground">
            Showcase your work and projects.
          </p>
        </div>
        <Link
          href="/studio/projects/new"
          className={cn(buttonVariants(), "gap-2")}
        >
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          New Project
        </Link>
      </div>

      <ProjectsTable projects={projects} />
    </div>
  );
}
