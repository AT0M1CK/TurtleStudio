import Link from "next/link";
import { Logo } from "@/components/logo";
import { signOut } from "@/app/auth/actions";

function initials(name: string | null, email: string) {
  const src = name?.trim() || email;
  const parts = src.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return src.slice(0, 2).toUpperCase();
}

export function AppHeader({
  fullName,
  role,
  email,
}: {
  fullName: string | null;
  role: string | null;
  email: string;
}) {
  return (
    <header className="border-b border-foreground/10">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo href="/dashboard" />

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/profile"
            className="group flex items-center gap-2.5 rounded-[5px] px-1.5 py-1 transition-colors duration-200 hover:bg-surface"
          >
            <span
              aria-hidden
              className="flex h-9 w-9 flex-none items-center justify-center rounded-[5px] bg-foreground font-mono text-xs font-medium text-background"
            >
              {initials(fullName, email)}
            </span>
            <span className="hidden flex-col leading-tight sm:flex">
              <span className="text-sm font-medium text-foreground">
                {fullName || "Set up profile"}
              </span>
              {role && (
                <span className="label-mono text-muted">{role}</span>
              )}
            </span>
          </Link>

          <form action={signOut}>
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center gap-1.5 rounded-[5px] border border-foreground/20 px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                aria-hidden
              >
                <path
                  d="M15 12H4m0 0 3.5-3.5M4 12l3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 7V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-1"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="hidden sm:inline">Log out</span>
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
