import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Single row table for profile info
export const profile = pgTable("profile", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  title: text("title").notNull(),
  email: text("email"),
  location: text("location"),
  bio: text("bio").notNull(),
  longBio: text("long_bio"),
  avatarUrl: text("avatar_url"),
  resumeUrl: text("resume_url"),
  githubUrl: text("github_url"),
  twitterUrl: text("twitter_url"),
  linkedinUrl: text("linkedin_url"),
  websiteUrl: text("website_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Experience entries for timeline
export const experiences = pgTable("experiences", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "work" | "education" | "project"
  title: text("title").notNull(),
  company: text("company"),
  location: text("location"),
  description: text("description"),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date"), // null = present
  isCurrent: boolean("is_current").default(false).notNull(),
  skills: text("skills").array(),
  url: text("url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Skills for resume
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // "language" | "framework" | "tool" | "other"
  level: integer("level").default(0), // 0-100 proficiency
  sortOrder: integer("sort_order").default(0).notNull(),
});

export type Profile = typeof profile.$inferSelect;
export type NewProfile = typeof profile.$inferInsert;
export type Experience = typeof experiences.$inferSelect;
export type NewExperience = typeof experiences.$inferInsert;
export type Skill = typeof skills.$inferSelect;
export type NewSkill = typeof skills.$inferInsert;
