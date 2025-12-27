import { Add01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Link from "next/link";
import { ExperiencesTable } from "@/components/studio/experiences-table";
import { buttonVariants } from "@/components/ui/button";
import { getAllExperiences } from "@/lib/db";
import { cn } from "@/lib/utils";

export default async function ExperiencesPage() {
  const experiences = await getAllExperiences();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-semibold text-2xl tracking-tight">Experiences</h1>
          <p className="text-muted-foreground">
            Manage your work and education history.
          </p>
        </div>
        <Link
          href="/studio/experiences/new"
          className={cn(buttonVariants(), "gap-2")}
        >
          <HugeiconsIcon icon={Add01Icon} className="size-4" />
          New Experience
        </Link>
      </div>

      <ExperiencesTable experiences={experiences} />
    </div>
  );
}
