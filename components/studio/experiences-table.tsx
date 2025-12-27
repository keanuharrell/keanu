"use client";

import { Delete01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTransition } from "react";

import { deleteExperienceAction } from "@/app/actions/experiences";
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
import type { Experience } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface ExperiencesTableProps {
  experiences: Experience[];
}

function formatDate(date: Date | null) {
  if (!date) return "Present";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
  }).format(date);
}

export function ExperiencesTable({ experiences }: ExperiencesTableProps) {
  const [, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteExperienceAction(id);
    });
  };

  if (experiences.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No experiences yet.</p>
        <Link
          href="/studio/experiences/new"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Add your first experience
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Period</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {experiences.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{exp.title}</p>
                  {exp.company && (
                    <p className="text-muted-foreground text-sm">
                      {exp.company}
                    </p>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="capitalize">
                  {exp.type}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
              </TableCell>
              <TableCell>
                {exp.isCurrent && (
                  <Badge className="bg-green-500/10 text-green-500">
                    Current
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                <div className="flex justify-end gap-1">
                  <Link
                    href={`/studio/experiences/${exp.id}`}
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
                        <AlertDialogTitle>Delete experience?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete &quot;{exp.title}&quot;
                          {exp.company && ` at ${exp.company}`}.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(exp.id)}
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
