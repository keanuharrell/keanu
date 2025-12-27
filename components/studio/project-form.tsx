"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  createProjectAction,
  updateProjectAction,
} from "@/app/actions/projects";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Project } from "@/db/schemas";

interface ProjectFormProps {
  project?: Project;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!project;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const techStackRaw = formData.get("techStack") as string;
    const techStack = techStackRaw
      ? techStackRaw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : [];

    const data = {
      slug: formData.get("slug") as string,
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      techStack,
      githubUrl: (formData.get("githubUrl") as string) || null,
      liveUrl: (formData.get("liveUrl") as string) || null,
      imageUrl: (formData.get("imageUrl") as string) || null,
      featured: formData.get("featured") === "on",
      sortOrder: Number(formData.get("sortOrder")) || 0,
    };

    startTransition(async () => {
      if (isEditing) {
        await updateProjectAction(project.id, data);
      } else {
        await createProjectAction(data);
      }
      router.push("/studio/projects");
    });
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isEditing) {
      const slugInput = document.getElementById("slug") as HTMLInputElement;
      if (slugInput) {
        slugInput.value = slugify(e.target.value);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
          <CardDescription>
            Basic information about your project.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={project?.title ?? ""}
                onChange={handleTitleChange}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="slug">Slug</Label>
              <Input
                id="slug"
                name="slug"
                defaultValue={project?.slug ?? ""}
                required
              />
            </Field>
          </div>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={project?.description ?? ""}
              placeholder="A brief description of your project..."
              rows={3}
              required
            />
          </Field>
          <Field>
            <Label htmlFor="techStack">Tech Stack</Label>
            <Input
              id="techStack"
              name="techStack"
              defaultValue={project?.techStack?.join(", ") ?? ""}
              placeholder="React, TypeScript, Tailwind CSS..."
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of technologies
            </p>
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links</CardTitle>
          <CardDescription>Project URLs and resources.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={project?.githubUrl ?? ""}
                placeholder="https://github.com/..."
              />
            </Field>
            <Field>
              <Label htmlFor="liveUrl">Live URL</Label>
              <Input
                id="liveUrl"
                name="liveUrl"
                type="url"
                defaultValue={project?.liveUrl ?? ""}
                placeholder="https://..."
              />
            </Field>
          </div>
          <Field>
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              name="imageUrl"
              type="url"
              defaultValue={project?.imageUrl ?? ""}
              placeholder="https://..."
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>Control how the project appears.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={project?.sortOrder ?? 0}
              />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="featured"
              name="featured"
              defaultChecked={project?.featured ?? false}
            />
            <Label htmlFor="featured">Feature this project</Label>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/studio/projects")}
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
              : "Create Project"}
        </Button>
      </div>
    </form>
  );
}
