"use client";

import { Delete01Icon, Edit01Icon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTransition } from "react";

import {
  deleteProjectAction,
  toggleFeaturedAction,
} from "@/app/actions/projects";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Project } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface ProjectsTableProps {
  projects: Project[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggleFeatured = (id: number, featured: boolean) => {
    startTransition(async () => {
      await toggleFeaturedAction(id, featured);
    });
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteProjectAction(id);
    });
  };

  if (projects.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No projects yet.</p>
        <Link
          href="/studio/projects/new"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Add your first project
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project</TableHead>
            <TableHead>Tech Stack</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="line-clamp-1 text-muted-foreground text-sm">
                    {project.description}
                  </p>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {project.techStack?.slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {(project.techStack?.length ?? 0) > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{(project.techStack?.length ?? 0) - 3}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() =>
                    handleToggleFeatured(project.id, !project.featured)
                  }
                  disabled={isPending}
                >
                  <HugeiconsIcon
                    icon={StarIcon}
                    className={cn(
                      "size-4",
                      project.featured
                        ? "fill-yellow-500 text-yellow-500"
                        : "text-muted-foreground",
                    )}
                  />
                </Button>
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/studio/projects/${project.id}`}
                    className={cn(
                      buttonVariants({ variant: "ghost", size: "icon-sm" }),
                    )}
                  >
                    <HugeiconsIcon icon={Edit01Icon} className="size-4" />
                  </Link>
                  <AlertDialog>
                    <AlertDialogTrigger
                      render={<Button variant="ghost" size="icon-sm" />}
                    >
                      <HugeiconsIcon icon={Delete01Icon} className="size-4" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete project?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the project &quot;{project.title}&quot;.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(project.id)}
                          className={buttonVariants({ variant: "destructive" })}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
