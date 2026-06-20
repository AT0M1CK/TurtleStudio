import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { ProjectForm } from "../project-form";
import { createProject } from "../actions";

export default async function NewProjectPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  return (
    <div className="min-h-screen">
      <AppHeader
        fullName={profile?.full_name ?? null}
        role={profile?.role ?? null}
        email={user.email!}
      />

      <main className="mx-auto w-full max-w-xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/dashboard"
          className="label-mono text-muted transition-colors duration-200 hover:text-foreground"
        >
          ← Dashboard
        </Link>

        <p className="label-mono mt-6 text-accent">New project</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground">
          Start a project
        </h1>
        <p className="mt-2 text-sm text-foreground/70">
          You&apos;ll be the owner. Add your crew and shoot days once it&apos;s
          created.
        </p>

        <div className="mt-8">
          <ProjectForm action={createProject} submitLabel="Create project" />
        </div>
      </main>
    </div>
  );
}
