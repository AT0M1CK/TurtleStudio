import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { isWritingRole } from "@/lib/roles";
import { fountainToDoc, type ScreenplayDoc } from "@/lib/screenplay/serialize";
import { ScreenplayEditor } from "./screenplay-editor";

export default async function ScriptPage({
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
    .select("id, name, owner_id")
    .eq("id", params.id)
    .single();
  if (!project) notFound();

  const { data: viewerProfile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const { data: script } = await supabase
    .from("scripts")
    .select("content, doc")
    .eq("project_id", project.id)
    .maybeSingle();

  // Prefer the structured doc; otherwise hydrate from the Fountain mirror.
  const storedDoc = script?.doc as ScreenplayDoc | undefined;
  const initialDoc =
    storedDoc && Array.isArray(storedDoc.content) && storedDoc.content.length > 0
      ? storedDoc
      : fountainToDoc(script?.content ?? "");

  // Owner can always write; otherwise a member with a writing project role.
  let canWrite = project.owner_id === user.id;
  if (!canWrite) {
    const { data: membership } = await supabase
      .from("project_members")
      .select("role")
      .eq("project_id", project.id)
      .eq("user_id", user.id)
      .maybeSingle();
    canWrite = isWritingRole(membership?.role);
  }

  return (
    <div className="min-h-screen">
      <AppHeader
        fullName={viewerProfile?.full_name ?? null}
        role={viewerProfile?.role ?? null}
        email={user.email!}
      />

      <main className="mx-auto w-full max-w-5xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href={`/projects/${project.id}`}
          className="label-mono text-muted transition-colors duration-200 hover:text-foreground"
        >
          ← {project.name}
        </Link>

        <ScreenplayEditor initialDoc={initialDoc} canWrite={canWrite} />
      </main>
    </div>
  );
}
