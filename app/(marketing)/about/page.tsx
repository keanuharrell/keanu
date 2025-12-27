import { Download01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";

import { Container } from "@/components/layout";
import { SectionHeading } from "@/components/section-heading";
import { Timeline } from "@/components/timeline";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getAllExperiences, getAllSkills, getProfile } from "@/lib/db";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about me, my experience, and skills.",
};

export default async function AboutPage() {
  const [profile, experiences, skills] = await Promise.all([
    getProfile(),
    getAllExperiences(),
    getAllSkills(),
  ]);

  // Group skills by category
  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    },
    {} as Record<string, typeof skills>,
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
            {profile?.longBio && (
              <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
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

        {/* Skills */}
        {Object.keys(skillsByCategory).length > 0 && (
          <section className="mt-16">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-6">
              {Object.entries(skillsByCategory).map(
                ([category, categorySkills]) => (
                  <div key={category}>
                    <h3 className="mb-3 font-medium text-muted-foreground text-sm uppercase tracking-wider">
                      {category}
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

        {/* Experience Timeline */}
        {experiences.length > 0 && (
          <section className="mt-16">
            <SectionHeading>Experience</SectionHeading>
            <Timeline experiences={experiences} />
          </section>
        )}

        {/* Empty state */}
        {!profile && experiences.length === 0 && skills.length === 0 && (
          <p className="mt-8 text-muted-foreground">
            No profile information yet. Add your details to see them here.
          </p>
        )}
      </Container>
    </div>
  );
}
