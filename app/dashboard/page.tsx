import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AppHeader } from "@/components/app-header";
import { StatusBadge } from "@/components/status-badge";

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, email")
    .eq("id", user.id)
    .single();

  // RLS returns only projects the user owns or is a member of.
  const { data: projects } = await supabase
    .from("projects")
    .select("id, name, status, owner_id, updated_at")
    .order("updated_at", { ascending: false });

  const fullName = profile?.full_name ?? null;
  const role = profile?.role ?? null;
  const firstName = fullName?.split(/\s+/)[0] ?? "there";
  const profileIncomplete = !fullName || !role;
  const hasProjects = (projects?.length ?? 0) > 0;

  return (
    <div className="min-h-screen">
      <AppHeader fullName={fullName} role={role} email={user.email!} />

      <main className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
        <p className="label-mono text-accent">Dashboard</p>
        <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground sm:text-5xl">
          Welcome, {firstName}
        </h1>

        {profileIncomplete && (
          <Link
            href="/profile"
            className="mt-6 flex items-center justify-between gap-4 rounded-[6px] border border-accent/30 bg-accent/5 px-4 py-3 transition-colors duration-200 hover:border-accent"
          >
            <span className="text-sm text-foreground">
              Finish setting up your profile so your crew knows who you are.
            </span>
            <span className="label-mono flex-none text-accent">Complete →</span>
          </Link>
        )}

        {/* Projects */}
        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="flex flex-1 items-center gap-3">
              <span className="label-mono text-muted">Your projects</span>
              <span className="h-px flex-1 bg-foreground/10" aria-hidden />
            </div>
            <Link
              href="/projects/new"
              className="inline-flex h-10 flex-none items-center justify-center gap-1.5 rounded-[5px] bg-accent px-4 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
                <path
                  d="M12 5v14M5 12h14"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
              New project
            </Link>
          </div>

          {hasProjects ? (
            <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {projects!.map((p) => {
                const updated = new Date(p.updated_at).toLocaleDateString(
                  "en-GB",
                  { day: "2-digit", month: "short", year: "numeric" },
                );
                return (
                  <li key={p.id}>
                    <Link
                      href={`/projects/${p.id}`}
                      className="flex h-full flex-col justify-between gap-6 rounded-[6px] border border-foreground/10 bg-surface p-5 shadow-card transition-colors duration-200 hover:border-foreground/30"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <h2 className="font-display text-xl font-semibold uppercase leading-tight tracking-tight text-foreground">
                          {p.name}
                        </h2>
                        {p.owner_id === user.id && (
                          <span className="label-mono flex-none text-muted">
                            Owner
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <StatusBadge status={p.status} />
                        <span className="font-mono text-[11px] text-muted">
                          {updated}
                        </span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-[6px] border border-dashed border-foreground/20 bg-surface/40 px-6 py-14 text-center">
              <p className="font-display text-xl font-black uppercase tracking-tight text-foreground">
                No projects yet
              </p>
              <p className="mx-auto mt-2 max-w-sm text-sm text-foreground/70">
                Start your first project to line up shoot days, crew, and shots.
              </p>
              <Link
                href="/projects/new"
                className="mt-6 inline-flex h-11 items-center justify-center rounded-[5px] bg-accent px-6 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
              >
                Create your first project
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
