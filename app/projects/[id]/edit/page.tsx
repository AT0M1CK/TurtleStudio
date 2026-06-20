import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { ProjectForm } from "../../project-form";
import { updateProject } from "../../actions";

export default async function EditProjectPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: project } = await supabase
    .from("projects")
    .select("id, name, description, status, owner_id")
    .eq("id", params.id)
    .single();

  if (!project) notFound();
  // Only the owner can edit.
  if (project.owner_id !== user.id) redirect(`/projects/${project.id}`);

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
          href={`/projects/${project.id}`}
          className="label-mono text-muted transition-colors duration-200 hover:text-foreground"
        >
          ← Back to project
        </Link>

        <p className="label-mono mt-6 text-accent">Edit project</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground">
          {project.name}
        </h1>

        <div className="mt-8">
          <ProjectForm
            action={updateProject.bind(null, project.id)}
            defaultValues={{
              name: project.name,
              description: project.description ?? "",
              status: project.status,
            }}
            submitLabel="Save changes"
          />
        </div>
      </main>
    </div>
  );
}
