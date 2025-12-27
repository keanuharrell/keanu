"use client";

import { useTransition } from "react";
import { saveProfileAction } from "@/app/actions/profile";
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
import { Textarea } from "@/components/ui/textarea";
import type { Profile } from "@/db/schemas";

interface ProfileFormProps {
  profile: Profile | null;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      await saveProfileAction({
        name: formData.get("name") as string,
        title: formData.get("title") as string,
        email: (formData.get("email") as string) || null,
        location: (formData.get("location") as string) || null,
        bio: formData.get("bio") as string,
        longBio: (formData.get("longBio") as string) || null,
        avatarUrl: (formData.get("avatarUrl") as string) || null,
        resumeUrl: (formData.get("resumeUrl") as string) || null,
        githubUrl: (formData.get("githubUrl") as string) || null,
        twitterUrl: (formData.get("twitterUrl") as string) || null,
        linkedinUrl: (formData.get("linkedinUrl") as string) || null,
        websiteUrl: (formData.get("websiteUrl") as string) || null,
      });
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Your name, title, and bio.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={profile?.name ?? ""}
                required
              />
            </Field>
            <Field>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                defaultValue={profile?.title ?? ""}
                placeholder="Software Developer"
                required
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={profile?.email ?? ""}
              />
            </Field>
            <Field>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                defaultValue={profile?.location ?? ""}
                placeholder="San Francisco, CA"
              />
            </Field>
          </div>
          <Field>
            <Label htmlFor="bio">Short Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={profile?.bio ?? ""}
              placeholder="A short description about yourself..."
              required
            />
          </Field>
          <Field>
            <Label htmlFor="longBio">Long Bio</Label>
            <Textarea
              id="longBio"
              name="longBio"
              defaultValue={profile?.longBio ?? ""}
              placeholder="A longer description for the About page..."
              rows={6}
            />
          </Field>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>
            Your social media and professional links.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                type="url"
                defaultValue={profile?.githubUrl ?? ""}
                placeholder="https://github.com/username"
              />
            </Field>
            <Field>
              <Label htmlFor="twitterUrl">Twitter URL</Label>
              <Input
                id="twitterUrl"
                name="twitterUrl"
                type="url"
                defaultValue={profile?.twitterUrl ?? ""}
                placeholder="https://twitter.com/username"
              />
            </Field>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                type="url"
                defaultValue={profile?.linkedinUrl ?? ""}
                placeholder="https://linkedin.com/in/username"
              />
            </Field>
            <Field>
              <Label htmlFor="websiteUrl">Website URL</Label>
              <Input
                id="websiteUrl"
                name="websiteUrl"
                type="url"
                defaultValue={profile?.websiteUrl ?? ""}
                placeholder="https://yourwebsite.com"
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Media</CardTitle>
          <CardDescription>Avatar and resume links.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field>
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                defaultValue={profile?.avatarUrl ?? ""}
                placeholder="https://..."
              />
            </Field>
            <Field>
              <Label htmlFor="resumeUrl">Resume URL</Label>
              <Input
                id="resumeUrl"
                name="resumeUrl"
                type="url"
                defaultValue={profile?.resumeUrl ?? ""}
                placeholder="https://..."
              />
            </Field>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
