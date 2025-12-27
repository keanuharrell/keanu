import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import { experiences, profile, skills } from "@/db/schemas";

export async function getProfile() {
  const result = await db.select().from(profile).limit(1);
  return result[0] ?? null;
}

export async function getAllExperiences() {
  return db.select().from(experiences).orderBy(desc(experiences.startDate));
}

export async function getExperiencesByType(
  type: "work" | "education" | "project",
) {
  return db
    .select()
    .from(experiences)
    .where(eq(experiences.type, type))
    .orderBy(desc(experiences.startDate));
}

export async function getAllSkills() {
  return db.select().from(skills).orderBy(asc(skills.sortOrder));
}

export async function getSkillsByCategory(category: string) {
  return db
    .select()
    .from(skills)
    .where(eq(skills.category, category))
    .orderBy(asc(skills.sortOrder));
}
