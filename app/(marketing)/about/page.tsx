import { Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Link from "next/link";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { experiences, profile, type Skill, skills } from "@/lib/data";
import { getAllProjects } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me, my experience, and skills.",
};

const categoryLabels: Record<string, string> = {
  language: "Languages",
  framework: "Frameworks",
  cloud: "Cloud & Infrastructure",
  devops: "DevOps & CI/CD",
  ai: "AI Tooling",
  tool: "Observability & Tools",
};

export default async function AboutPage() {
  const projects = await getAllProjects();

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, Skill[]>,
  );

  return (
    <div className="py-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="font-medium text-4xl tracking-tight md:text-5xl">
              About
            </h1>
            {profile.longBio && (
              <p className="mt-6 max-w-xl whitespace-pre-line text-lg text-muted-foreground leading-relaxed">
                {profile.longBio}
              </p>
            )}
          </div>

          {/* Download Resume Button */}
          <a
            href="/api/resume"
            download="resume.pdf"
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
          >
            <HugeiconsIcon icon={Download01Icon} data-icon="inline-start" />
            Download Resume
          </a>
        </div>

        {/* Experience Timeline */}
        {experiences.length > 0 && (
          <section className="mt-16">
            <SectionHeading>Experience</SectionHeading>
            <Timeline experiences={experiences} />
          </section>
        )}

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mt-16">
            <SectionHeading>Projects</SectionHeading>
            <div className="grid gap-6 sm:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
                >
                  <h3 className="font-medium">{project.title}</h3>
                  <p className="mt-2 text-muted-foreground text-sm">
                    {project.description}
                  </p>
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.techStack.map((tech) => (
                        <Badge
                          key={tech}
                          variant="secondary"
                          className="text-xs"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  )}
                  <div className="mt-4 flex gap-3">
                    {project.githubUrl && (
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        className="text-muted-foreground text-sm hover:text-foreground"
                      >
                        GitHub
                      </Link>
                    )}
                    {project.liveUrl && (
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        className="text-muted-foreground text-sm hover:text-foreground"
                      >
                        Live Demo
                      </Link>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {Object.keys(skillsByCategory).length > 0 && (
          <section className="mt-16">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-6">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="mb-3 font-medium text-muted-foreground text-sm uppercase tracking-wider">
                      {categoryLabels[category] || category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {categorySkills.map((skill) => (
                        <Badge key={skill.id} variant="secondary">
                          {skill.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ),
              )}
            </div>
          </section>
        )}
      </Container>
    </div>
  );
}
