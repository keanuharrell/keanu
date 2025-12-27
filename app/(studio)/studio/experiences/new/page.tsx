import { ExperienceForm } from "@/components/studio/experience-form";

export default function NewExperiencePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">
          New Experience
        </h1>
        <p className="text-muted-foreground">
          Add a new work or education experience.
        </p>
      </div>

      <ExperienceForm />
    </div>
  );
}
