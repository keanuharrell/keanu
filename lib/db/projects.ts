import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { type NewProject, projects } from "@/db/schemas";

export async function getAllProjects() {
  return db.select().from(projects).orderBy(asc(projects.sortOrder));
}

export async function getFeaturedProjects() {
  return db
    .select()
    .from(projects)
    .where(eq(projects.featured, true))
    .orderBy(asc(projects.sortOrder));
}

export async function getProjectBySlug(slug: string) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.slug, slug))
    .limit(1);

  return result[0] ?? null;
}

export async function getProjectById(id: number) {
  const result = await db
    .select()
    .from(projects)
    .where(eq(projects.id, id))
    .limit(1);

  return result[0] ?? null;
}

export async function createProject(data: NewProject) {
  const result = await db.insert(projects).values(data).returning();
  return result[0];
}

export async function updateProject(
  id: number,
  data: Partial<Omit<NewProject, "id">>,
) {
  const result = await db
    .update(projects)
    .set(data)
    .where(eq(projects.id, id))
    .returning();
  return result[0];
}

export async function deleteProject(id: number) {
  await db.delete(projects).where(eq(projects.id, id));
}
