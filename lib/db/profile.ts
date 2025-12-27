import { asc, desc, eq } from "drizzle-orm";

import { db } from "@/db";
import {
  experiences,
  type NewExperience,
  type NewProfile,
  type NewSkill,
  profile,
  skills,
} from "@/db/schemas";

// Profile functions
export async function getProfile() {
  const result = await db.select().from(profile).limit(1);
  return result[0] ?? null;
}

export async function upsertProfile(data: NewProfile) {
  const existing = await getProfile();
  if (existing) {
    const result = await db
      .update(profile)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(profile.id, existing.id))
      .returning();
    return result[0];
  }
  const result = await db.insert(profile).values(data).returning();
  return result[0];
}

// Experience functions
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

export async function getExperienceById(id: number) {
  const result = await db
    .select()
    .from(experiences)
    .where(eq(experiences.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function createExperience(data: NewExperience) {
  const result = await db.insert(experiences).values(data).returning();
  return result[0];
}

export async function updateExperience(
  id: number,
  data: Partial<Omit<NewExperience, "id">>,
) {
  const result = await db
    .update(experiences)
    .set(data)
    .where(eq(experiences.id, id))
    .returning();
  return result[0];
}

export async function deleteExperience(id: number) {
  await db.delete(experiences).where(eq(experiences.id, id));
}

// Skills functions
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

export async function getSkillById(id: number) {
  const result = await db
    .select()
    .from(skills)
    .where(eq(skills.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function createSkill(data: NewSkill) {
  const result = await db.insert(skills).values(data).returning();
  return result[0];
}

export async function updateSkill(
  id: number,
  data: Partial<Omit<NewSkill, "id">>,
) {
  const result = await db
    .update(skills)
    .set(data)
    .where(eq(skills.id, id))
    .returning();
  return result[0];
}

export async function deleteSkill(id: number) {
  await db.delete(skills).where(eq(skills.id, id));
}
