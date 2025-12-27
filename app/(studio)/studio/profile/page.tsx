import { ProfileForm } from "@/components/studio/profile-form";
import { getProfile } from "@/lib/db";

export default async function ProfilePage() {
  const profile = await getProfile();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-semibold text-2xl tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Manage your personal information and social links.
        </p>
      </div>

      <ProfileForm profile={profile} />
    </div>
  );
}
