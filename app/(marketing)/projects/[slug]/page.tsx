import { ArrowUpRight01Icon, Github01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/layout";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { getProjectBySlug } from "@/lib/db";
import { cn } from "@/lib/utils";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <article className="py-24">
      <Container>
        <Link
          href="/projects"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "mb-8 -ml-3",
          )}
        >
          ← Back to projects
        </Link>

        <header className="mb-12">
          <h1 className="font-medium text-3xl tracking-tight md:text-4xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Tech Stack */}
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-8 flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "outline" }))}
              >
                <HugeiconsIcon icon={Github01Icon} data-icon="inline-start" />
                View Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ variant: "default" }))}
              >
                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  data-icon="inline-start"
                />
                Live Demo
              </a>
            )}
          </div>
        </header>

        {/* Project Image */}
        {project.imageUrl && (
          <div className="overflow-hidden rounded-lg border border-border">
            <Image
              src={project.imageUrl}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full object-cover"
            />
          </div>
        )}
      </Container>
    </article>
  );
}
