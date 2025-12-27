"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import {
  createExperienceAction,
  updateExperienceAction,
} from "@/app/actions/experiences";
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
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import type { Experience } from "@/db/schemas";

interface ExperienceFormProps {
  experience?: Experience;
}

function formatDateForInput(date: Date | null) {
  if (!date) return "";
  return date.toISOString().split("T")[0];
}

export function ExperienceForm({ experience }: ExperienceFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isEditing = !!experience;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const skillsRaw = formData.get("skills") as string;
    const skills = skillsRaw
      ? skillsRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    const endDateStr = formData.get("endDate") as string;
    const isCurrent = formData.get("isCurrent") === "on";

    const data = {
      type: formData.get("type") as string,
      title: formData.get("title") as string,
      company: (formData.get("company") as string) || null,
      location: (formData.get("location") as string) || null,
      description: (formData.get("description") as string) || null,
      startDate: new Date(formData.get("startDate") as string),
      endDate: isCurrent || !endDateStr ? null : new Date(endDateStr),
      isCurrent,
      skills,
      url: (formData.get("url") as string) || null,
      sortOrder: Number(formData.get("sortOrder")) || 0,
    };

    startTransition(async () => {
      if (isEditing) {
        await updateExperienceAction(experience.id, data);
      } else {
        await createExperienceAction(data);
      }
      router.push("/studio/experiences");
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Experience Details</CardTitle>
          <CardDescription>
            Basic information about this experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="type">Type</Label>
              <Select name="type" defaultValue={experience?.type ?? "work"}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="education">Education</SelectItem>
                  <SelectItem value="project">Project</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={experience?.title ?? ""}
                placeholder="Software Engineer"
                required
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="company">Company / Institution</Label>
              <Input
                id="company"
                name="company"
                defaultValue={experience?.company ?? ""}
                placeholder="Acme Inc."
              />
            </Field>
            <Field>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={experience?.location ?? ""}
                placeholder="San Francisco, CA"
              />
            </Field>
          </div>
          <Field>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={experience?.description ?? ""}
              placeholder="Describe your role and responsibilities..."
              rows={4}
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>When did this experience occur?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="startDate">Start Date</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                defaultValue={formatDateForInput(experience?.startDate ?? null)}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="endDate">End Date</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                defaultValue={formatDateForInput(experience?.endDate ?? null)}
              />
            </Field>
          </div>
          <div className="flex items-center gap-3">
            <Switch
              id="isCurrent"
              name="isCurrent"
              defaultChecked={experience?.isCurrent ?? false}
            />
            <Label htmlFor="isCurrent">This is my current position</Label>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Additional Info</CardTitle>
          <CardDescription>Skills and links.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Field>
            <Label htmlFor="skills">Skills</Label>
            <Input
              id="skills"
              name="skills"
              defaultValue={experience?.skills?.join(", ") ?? ""}
              placeholder="React, TypeScript, Node.js..."
            />
            <p className="text-muted-foreground text-xs">
              Comma-separated list of skills
            </p>
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="url">URL</Label>
              <Input
                id="url"
                name="url"
                type="url"
                defaultValue={experience?.url ?? ""}
                placeholder="https://..."
              />
            </Field>
            <Field>
              <Label htmlFor="sortOrder">Sort Order</Label>
              <Input
                id="sortOrder"
                name="sortOrder"
                type="number"
                defaultValue={experience?.sortOrder ?? 0}
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/studio/experiences")}
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
              : "Create Experience"}
        </Button>
      </div>
    </form>
  );
}
