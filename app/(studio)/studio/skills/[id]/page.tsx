import { notFound } from "next/navigation";

import { SkillForm } from "@/components/studio/skill-form";
import { getSkillById } from "@/lib/db";

interface EditSkillPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditSkillPage({ params }: EditSkillPageProps) {
  const { id } = await params;
  const skill = await getSkillById(Number(id));

  if (!skill) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Edit Skill</h1>
        <p className="text-muted-foreground">Update your skill details.</p>
      </div>

      <SkillForm skill={skill} />
    </div>
  );
}
