import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { SkillsTable } from "@/components/studio/skills-table";
import { buttonVariants } from "@/components/ui/button";
import { getAllSkills } from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function SkillsPage() {
  const skills = await getAllSkills();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Skills</h1>
          <p className="text-muted-foreground">
            Manage your technical skills and proficiencies.
          </p>
        </div>
        <Link
          href="/studio/skills/new"
          className={cn(buttonVariants(), "gap-2")}
        >
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          New Skill
        </Link>
      </div>

      <SkillsTable skills={skills} />
    </div>
  );
}
