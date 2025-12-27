"use client";

import { Delete01Icon, Edit01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { useTransition } from "react";

import { deleteSkillAction } from "@/app/actions/skills";
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
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Skill } from "@/db/schemas";
import { cn } from "@/lib/utils";

interface SkillsTableProps {
  skills: Skill[];
}

export function SkillsTable({ skills }: SkillsTableProps) {
  const [, startTransition] = useTransition();

  const handleDelete = (id: number) => {
    startTransition(async () => {
      await deleteSkillAction(id);
    });
  };

  if (skills.length === 0) {
    return (
      <div className="flex h-48 flex-col items-center justify-center rounded-lg border border-dashed">
        <p className="text-muted-foreground">No skills yet.</p>
        <Link
          href="/studio/skills/new"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          Add your first skill
        </Link>
      </div>
    );
  }

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="space-y-6">
      {Object.entries(groupedSkills).map(([category, categorySkills]) => (
        <div key={category} className="space-y-2">
          <h3 className="font-medium text-sm capitalize">{category}</h3>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categorySkills.map((skill) => (
                  <TableRow key={skill.id}>
                    <TableCell className="font-medium">{skill.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-24 rounded-full bg-muted">
                          <div
                            className="h-2 rounded-full bg-primary"
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <span className="text-muted-foreground text-xs">
                          {skill.level}%
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{skill.sortOrder}</TableCell>
                    <TableCell>
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/studio/skills/${skill.id}`}
                          className={cn(
                            buttonVariants({
                              variant: "ghost",
                              size: "icon-sm",
                            }),
                          )}
                        >
                          <HugeiconsIcon icon={Edit01Icon} className="size-4" />
                        </Link>
                        <AlertDialog>
                          <AlertDialogTrigger
                            render={<Button variant="ghost" size="icon-sm" />}
                          >
                            <HugeiconsIcon
                              icon={Delete01Icon}
                              className="size-4"
                            />
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete skill?</AlertDialogTitle>
                              <AlertDialogDescription>
                                This action cannot be undone. This will
                                permanently delete the skill &quot;{skill.name}
                                &quot;.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(skill.id)}
                                className={buttonVariants({
                                  variant: "destructive",
                                })}
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
        </div>
      ))}
    </div>
  );
}
