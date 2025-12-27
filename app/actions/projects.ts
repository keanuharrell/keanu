"use server";

import { revalidatePath } from "next/cache";

import type { NewProject } from "@/db/schemas";
import { createProject, deleteProject, updateProject } from "@/lib/db";

export async function createProjectAction(data: NewProject) {
  const project = await createProject(data);
  revalidatePath("/studio/projects");
  revalidatePath("/");
  return project;
}

export async function updateProjectAction(
  id: number,
  data: Partial<Omit<NewProject, "id">>,
) {
  const project = await updateProject(id, data);
  revalidatePath("/studio/projects");
  revalidatePath("/");
  return project;
}

export async function deleteProjectAction(id: number) {
  await deleteProject(id);
  revalidatePath("/studio/projects");
  revalidatePath("/");
}

export async function toggleFeaturedAction(id: number, featured: boolean) {
  const project = await updateProject(id, { featured });
  revalidatePath("/studio/projects");
  revalidatePath("/");
  return project;
}
