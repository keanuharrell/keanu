"use server";

import { revalidatePath } from "next/cache";

import type { NewExperience } from "@/db/schemas";
import { createExperience, deleteExperience, updateExperience } from "@/lib/db";

export async function createExperienceAction(data: NewExperience) {
  const experience = await createExperience(data);
  revalidatePath("/studio/experiences");
  revalidatePath("/about");
  revalidatePath("/api/resume");
  return experience;
}

export async function updateExperienceAction(
  id: number,
  data: Partial<Omit<NewExperience, "id">>,
) {
  const experience = await updateExperience(id, data);
  revalidatePath("/studio/experiences");
  revalidatePath("/about");
  revalidatePath("/api/resume");
  return experience;
}

export async function deleteExperienceAction(id: number) {
  await deleteExperience(id);
  revalidatePath("/studio/experiences");
  revalidatePath("/about");
  revalidatePath("/api/resume");
}
