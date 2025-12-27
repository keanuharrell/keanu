import { asc, eq } from "drizzle-orm";

import { db } from "@/db";
import { projects } from "@/db/schemas";

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
