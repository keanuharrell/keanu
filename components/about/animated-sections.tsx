"use client";

import { motion, useInView } from "motion/react";
import type { Route } from "next";
import Link from "next/link";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/db/schemas";
import type { Skill } from "@/lib/data";

// Animated header section
interface AboutHeaderProps {
  title: string;
  bio?: string;
  children?: React.ReactNode;
}

export function AboutHeader({ title, bio, children }: AboutHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="font-medium text-4xl tracking-tight md:text-5xl"
        >
          {title}
        </motion.h1>
        {bio && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="mt-6 max-w-xl whitespace-pre-line text-lg text-muted-foreground leading-relaxed"
          >
            {bio}
          </motion.p>
        )}
      </div>
      {children && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </div>
  );
}

// Animated projects grid
interface AnimatedProjectsGridProps {
  projects: Project[];
}

export function AnimatedProjectsGrid({ projects }: AnimatedProjectsGridProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="grid gap-6 sm:grid-cols-2"
    >
      {projects.map((project) => (
        <motion.div
          key={project.id}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            },
          }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-lg border bg-card p-6 transition-colors hover:bg-muted/50"
        >
          <h3 className="font-medium">{project.title}</h3>
          <p className="mt-2 text-muted-foreground text-sm">
            {project.description}
          </p>
          {project.techStack && project.techStack.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <Badge key={tech} variant="secondary" className="text-xs">
                  {tech}
                </Badge>
              ))}
            </div>
          )}
          <div className="mt-4 flex gap-3">
            {project.githubUrl && (
              <Link
                href={project.githubUrl as Route}
                target="_blank"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                GitHub
              </Link>
            )}
            {project.liveUrl && (
              <Link
                href={project.liveUrl as Route}
                target="_blank"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Live Demo
              </Link>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Animated skills section
interface AnimatedSkillsProps {
  skillsByCategory: Record<string, Skill[]>;
  categoryLabels: Record<string, string>;
}

export function AnimatedSkills({
  skillsByCategory,
  categoryLabels,
}: AnimatedSkillsProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1 },
        },
      }}
      className="space-y-6"
    >
      {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
        <motion.div
          key={category}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
            },
          }}
        >
          <h3 className="mb-3 font-medium text-muted-foreground text-sm uppercase tracking-wider">
            {categoryLabels[category] || category}
          </h3>
          <motion.div
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.03 },
              },
            }}
            className="flex flex-wrap gap-2"
          >
            {categorySkills.map((skill) => (
              <motion.div
                key={skill.id}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { duration: 0.2 },
                  },
                }}
              >
                <Badge variant="secondary">{skill.name}</Badge>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  );
}
