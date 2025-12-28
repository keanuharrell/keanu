import {
  Briefcase01Icon,
  GraduationScrollIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

import { Badge } from "@/components/ui/badge";
import type { Experience } from "@/lib/data";
import { cn } from "@/lib/utils";

interface TimelineProps {
  experiences: Experience[];
}

function formatDate(date: Date | null | undefined): string {
  if (!date) return "Present";
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
  }).format(date);
}

function getIcon(type: string) {
  switch (type) {
    case "education":
      return GraduationScrollIcon;
    default:
      return Briefcase01Icon;
  }
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative space-y-8">
      {/* Timeline line */}
      <div className="absolute top-0 left-4 h-full w-px bg-border" />

      {experiences.map((exp) => {
        const Icon = getIcon(exp.type);
        return (
          <div key={exp.id} className="relative flex gap-6 pl-12">
            {/* Icon */}
            <div
              className={cn(
                "absolute left-0 flex size-8 items-center justify-center rounded-full border bg-background",
                exp.isCurrent && "border-primary bg-primary/10",
              )}
            >
              <HugeiconsIcon
                icon={Icon}
                className={cn(
                  "size-4 text-muted-foreground",
                  exp.isCurrent && "text-primary",
                )}
              />
            </div>

            {/* Content */}
            <div className="flex-1 pb-8">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="font-medium">{exp.title}</h3>
                <span className="text-muted-foreground text-sm">
                  {formatDate(exp.startDate)} — {formatDate(exp.endDate)}
                </span>
              </div>

              {exp.company && (
                <p className="mt-1 text-muted-foreground text-sm">
                  {exp.company}
                  {exp.location && ` · ${exp.location}`}
                </p>
              )}

              {exp.description && (
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
                  {exp.description}
                </p>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {exp.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
