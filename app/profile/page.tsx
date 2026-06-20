import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { ProfileForm } from "./profile-form";

export default async function ProfilePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, email, created_at")
    .eq("id", user.id)
    .single();

  const memberSince = profile?.created_at
    ? new Date(profile.created_at).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="min-h-screen">
      <AppHeader
        fullName={profile?.full_name ?? null}
        role={profile?.role ?? null}
        email={user.email!}
      />

      <main className="mx-auto w-full max-w-xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="label-mono text-accent">Account</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground">
          Profile
        </h1>

        {/* Read-only account facts */}
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-foreground/10 bg-foreground/10">
          <div className="bg-background p-4">
            <dt className="label-mono text-muted">Email</dt>
            <dd className="mt-1.5 break-all text-sm text-foreground">
              {user.email}
            </dd>
          </div>
          <div className="bg-background p-4">
            <dt className="label-mono text-muted">Member since</dt>
            <dd className="mt-1.5 font-mono text-sm text-foreground">
              {memberSince}
            </dd>
          </div>
        </dl>

        {/* Editable fields */}
        <div className="mt-8">
          <ProfileForm
            fullName={profile?.full_name ?? ""}
            role={profile?.role ?? ""}
          />
        </div>
      </main>
    </div>
  );
}
