import { Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";

import {
  AboutHeader,
  AnimatedProjectsGrid,
  AnimatedSkills,
} from "@/components/about";
import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
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
        <AboutHeader title="About" bio={profile.longBio}>
          <a
            href="/api/resume"
            download="resume.pdf"
            className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
          >
            <HugeiconsIcon icon={Download01Icon} data-icon="inline-start" />
            Download Resume
          </a>
        </AboutHeader>

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
            <AnimatedProjectsGrid projects={projects} />
          </section>
        )}

        {/* Skills */}
        {Object.keys(skillsByCategory).length > 0 && (
          <section className="mt-16">
            <SectionHeading>Skills</SectionHeading>
            <AnimatedSkills
              skillsByCategory={skillsByCategory}
              categoryLabels={categoryLabels}
            />
          </section>
        )}
      </Container>
    </div>
  );
}
