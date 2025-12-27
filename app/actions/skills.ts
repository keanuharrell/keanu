"use server";

import { revalidatePath } from "next/cache";

import type { NewSkill } from "@/db/schemas";
import { createSkill, deleteSkill, updateSkill } from "@/lib/db";

export async function createSkillAction(data: NewSkill) {
  const skill = await createSkill(data);
  revalidatePath("/studio/skills");
  revalidatePath("/about");
  revalidatePath("/api/resume");
  return skill;
}

export async function updateSkillAction(
  id: number,
  data: Partial<Omit<NewSkill, "id">>,
) {
  const skill = await updateSkill(id, data);
  revalidatePath("/studio/skills");
  revalidatePath("/about");
  revalidatePath("/api/resume");
  return skill;
}

export async function deleteSkillAction(id: number) {
  await deleteSkill(id);
  revalidatePath("/studio/skills");
  revalidatePath("/about");
  revalidatePath("/api/resume");
}
