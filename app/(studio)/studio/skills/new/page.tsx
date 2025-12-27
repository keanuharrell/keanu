import { SkillForm } from "@/components/studio/skill-form";

export default function NewSkillPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">New Skill</h1>
        <p className="text-muted-foreground">
          Add a new skill to your profile.
        </p>
      </div>

      <SkillForm />
    </div>
  );
}
