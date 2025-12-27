import { notFound } from "next/navigation";

import { ExperienceForm } from "@/components/studio/experience-form";
import { getExperienceById } from "@/lib/db";

interface EditExperiencePageProps {
  params: Promise<{ id: string }>;
}

export default async function EditExperiencePage({
  params,
}: EditExperiencePageProps) {
  const { id } = await params;
  const experience = await getExperienceById(Number(id));

  if (!experience) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">
          Edit Experience
        </h1>
        <p className="text-muted-foreground">Update your experience details.</p>
      </div>

      <ExperienceForm experience={experience} />
    </div>
  );
}
