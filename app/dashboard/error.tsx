"use client";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="label-mono text-accent">Something broke</p>
      <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-foreground">
        Couldn&apos;t load the dashboard
      </h1>
      <p className="mt-2 max-w-sm text-sm text-foreground/70">
        An unexpected error occurred. Try again — if it persists, sign out and
        back in.
      </p>
      <button
        onClick={reset}
        className="mt-6 inline-flex h-11 items-center rounded-[5px] bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
      >
        Try again
      </button>
    </div>
  );
}
