"use server";

import { revalidatePath } from "next/cache";

import type { NewProfile } from "@/db/schemas";
import { upsertProfile } from "@/lib/db";

export async function saveProfileAction(data: NewProfile) {
  await upsertProfile(data);
  revalidatePath("/studio/profile");
  revalidatePath("/about");
  revalidatePath("/");
}
