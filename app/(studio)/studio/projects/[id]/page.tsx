import { notFound } from "next/navigation";

import { ProjectForm } from "@/components/studio/project-form";
import { getProjectById } from "@/lib/db";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({
  params,
}: EditProjectPageProps) {
  const { id } = await params;
  const project = await getProjectById(Number(id));

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground">Update your project details.</p>
      </div>

      <ProjectForm project={project} />
    </div>
  );
}
