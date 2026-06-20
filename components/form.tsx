"use client";

import { useFormStatus } from "react-dom";

// Shared input styling — thin border, sharp corners, accent focus.
export const inputClass =
  "mt-2 h-12 w-full rounded-[5px] border border-foreground/30 bg-background px-3 text-base text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-accent focus:outline-none";

export function SubmitButton({
  children,
  pendingLabel = "Working…",
  className = "",
}: {
  children: React.ReactNode;
  pendingLabel?: string;
  className?: string;
}) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-busy={pending}
      className={`inline-flex h-12 items-center justify-center rounded-[5px] bg-accent px-6 text-sm font-medium tracking-wide text-background transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {pending ? pendingLabel : children}
    </button>
  );
}

export function FormNotice({
  error,
  message,
}: {
  error?: string;
  message?: string;
}) {
  if (!error && !message) return null;
  return (
    <p
      role={error ? "alert" : "status"}
      className={`rounded-[5px] border px-3 py-2.5 text-sm ${
        error
          ? "border-accent/40 bg-accent/5 text-accent"
          : "border-foreground/20 bg-surface text-foreground"
      }`}
    >
      {error ?? message}
    </p>
  );
}
