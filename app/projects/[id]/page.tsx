import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";
import { DeleteProjectButton } from "../delete-project-button";

export default async function ProjectPage({
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
    .select("id, name, description, status, owner_id, created_at")
    .eq("id", params.id)
    .single();

  if (!project) notFound();

  const { data: viewerProfile } = await supabase
    .from("profiles")
    .select("full_name, role")
    .eq("id", user.id)
    .single();

  const { data: owner } = await supabase
    .from("profiles")
    .select("full_name, role, email")
    .eq("id", project.owner_id)
    .single();

  const isOwner = project.owner_id === user.id;
  const created = new Date(project.created_at).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="min-h-screen">
      <AppHeader
        fullName={viewerProfile?.full_name ?? null}
        role={viewerProfile?.role ?? null}
        email={user.email!}
      />

      <main className="mx-auto w-full max-w-3xl px-5 py-10 sm:px-8 sm:py-14">
        <Link
          href="/dashboard"
          className="label-mono text-muted transition-colors duration-200 hover:text-foreground"
        >
          ← Dashboard
        </Link>

        <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <StatusBadge status={project.status} />
            <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
              {project.name}
            </h1>
          </div>

          {isOwner && (
            <div className="flex items-center gap-2">
              <Link
                href={`/projects/${project.id}/edit`}
                className="inline-flex h-10 items-center rounded-[5px] border border-foreground/20 px-4 text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground"
              >
                Edit
              </Link>
              <DeleteProjectButton id={project.id} />
            </div>
          )}
        </div>

        {project.description && (
          <p className="mt-6 max-w-prose text-base leading-relaxed text-foreground/80">
            {project.description}
          </p>
        )}

        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[6px] border border-foreground/10 bg-foreground/10 sm:grid-cols-3">
          <div className="bg-background p-4">
            <dt className="label-mono text-muted">Created</dt>
            <dd className="mt-1.5 font-mono text-sm text-foreground">{created}</dd>
          </div>
          <div className="bg-background p-4">
            <dt className="label-mono text-muted">Owner</dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {owner?.full_name ?? owner?.email ?? "—"}
              {isOwner && <span className="text-muted"> (you)</span>}
            </dd>
          </div>
          <div className="bg-background p-4">
            <dt className="label-mono text-muted">Your role</dt>
            <dd className="mt-1.5 text-sm text-foreground">
              {isOwner ? "Owner" : (viewerProfile?.role ?? "Member")}
            </dd>
          </div>
        </dl>

        {/* Team (Step 4) */}
        <Section label="Team">
          <div className="flex items-center gap-3 rounded-[6px] border border-foreground/10 bg-surface/50 p-4">
            <span
              aria-hidden
              className="flex h-9 w-9 flex-none items-center justify-center rounded-[5px] bg-foreground font-mono text-xs font-medium text-background"
            >
              {(owner?.full_name ?? owner?.email ?? "?").slice(0, 2).toUpperCase()}
            </span>
            <div className="leading-tight">
              <p className="text-sm font-medium text-foreground">
                {owner?.full_name ?? owner?.email}
              </p>
              <p className="label-mono text-muted">{owner?.role ?? "Owner"}</p>
            </div>
          </div>
          <p className="mt-3 text-sm text-foreground/60">
            Inviting crew by email lands in Step 4.
          </p>
        </Section>

        {/* Shoot days (Step 5) */}
        <Section label="Shoot days">
          <div className="rounded-[6px] border border-dashed border-foreground/20 bg-surface/40 px-6 py-10 text-center">
            <p className="font-display text-lg font-black uppercase tracking-tight text-foreground">
              No shoot days yet
            </p>
            <span className="label-mono mt-3 inline-block text-muted">
              Coming next · Step 05
            </span>
          </div>
        </Section>
      </main>
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center gap-3">
        <span className="label-mono text-muted">{label}</span>
        <span className="h-px flex-1 bg-foreground/10" aria-hidden />
      </div>
      {children}
    </section>
  );
}
