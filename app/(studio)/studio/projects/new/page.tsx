import { ProjectForm } from "@/components/studio/project-form";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">New Project</h1>
        <p className="text-muted-foreground">Add a new project to showcase.</p>
      </div>

      <ProjectForm />
    </div>
  );
}
