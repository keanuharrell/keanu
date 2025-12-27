CREATE TABLE "experiences" (
	"id" serial PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"title" text NOT NULL,
	"company" text,
	"location" text,
	"description" text,
	"start_date" timestamp NOT NULL,
	"end_date" timestamp,
	"is_current" boolean DEFAULT false NOT NULL,
	"skills" text[],
	"url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "profile" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"email" text,
	"location" text,
	"bio" text NOT NULL,
	"long_bio" text,
	"avatar_url" text,
	"resume_url" text,
	"github_url" text,
	"twitter_url" text,
	"linkedin_url" text,
	"website_url" text,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "skills" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"level" integer DEFAULT 0,
	"sort_order" integer DEFAULT 0 NOT NULL
);
