"use client";

import Link from "next/link";

export default function ScriptError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="label-mono text-accent">Something broke</p>
      <h1 className="mt-3 font-display text-3xl font-black uppercase tracking-tight text-foreground">
        Couldn&apos;t load the screenplay
      </h1>
      <div className="mt-6 flex items-center gap-3">
        <button
          onClick={reset}
          className="inline-flex h-11 items-center rounded-[5px] bg-foreground px-5 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          Try again
        </button>
        <Link
          href="/dashboard"
          className="inline-flex h-11 items-center rounded-[5px] border border-foreground/20 px-5 text-sm font-medium text-foreground transition-colors duration-200 hover:border-foreground"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
