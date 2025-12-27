"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { createSkillAction, updateSkillAction } from "@/app/actions/skills";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Skill } from "@/db/schemas";

interface SkillFormProps {
  skill?: Skill;
}

export function SkillForm({ skill }: SkillFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!skill;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const data = {
      name: formData.get("name") as string,
      category: formData.get("category") as string,
      level: Number(formData.get("level")) || 0,
      sortOrder: Number(formData.get("sortOrder")) || 0,
    };

    startTransition(async () => {
      if (isEditing) {
        await updateSkillAction(skill.id, data);
      } else {
        await createSkillAction(data);
      }
      router.push("/studio/skills");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Skill Details</CardTitle>
          <CardDescription>Information about this skill.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={skill?.name ?? ""}
                placeholder="React"
                required
              />
            </Field>
            <Field>
              <Label htmlFor="category">Category</Label>
              <Select
                name="category"
                defaultValue={skill?.category ?? "language"}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="language">Language</SelectItem>
                  <SelectItem value="framework">Framework</SelectItem>
                  <SelectItem value="tool">Tool</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="level">Level (0-100)</Label>
              <Input
                id="level"
                name="level"
                type="number"
                min={0}
                max={100}
                defaultValue={skill?.level ?? 50}
              />
            </Field>
            <Field>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={skill?.sortOrder ?? 0}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/studio/skills")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
              ? "Save Changes"
              : "Create Skill"}
        </Button>
      </div>
    </form>
  );
}
