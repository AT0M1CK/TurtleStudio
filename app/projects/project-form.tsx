"use client";

import { useFormState } from "react-dom";
import { inputClass, SubmitButton, FormNotice } from "@/components/form";
import { PROJECT_STATUSES } from "@/lib/projects";
import type { ProjectState } from "./actions";

const initial: ProjectState = {};

export function ProjectForm({
  action,
  defaultValues,
  submitLabel,
}: {
  action: (prev: ProjectState, formData: FormData) => Promise<ProjectState>;
  defaultValues?: { name?: string; description?: string; status?: string };
  submitLabel: string;
}) {
  const [state, formAction] = useFormState(action, initial);

  return (
    <form action={formAction} className="space-y-4">
      <FormNotice error={state.error} />

      <label className="block">
        <span className="label-mono text-muted">Project name</span>
        <input
          className={inputClass}
          type="text"
          name="name"
          required
          defaultValue={defaultValues?.name}
          placeholder="Untitled feature"
        />
      </label>

      <label className="block">
        <span className="label-mono text-muted">Description</span>
        <textarea
          name="description"
          rows={4}
          defaultValue={defaultValues?.description}
          placeholder="Logline, notes, anything your crew should know."
          className="mt-2 w-full rounded-[5px] border border-foreground/30 bg-background px-3 py-2.5 text-base text-foreground placeholder:text-muted/70 transition-colors duration-200 focus:border-accent focus:outline-none"
        />
      </label>

      <label className="block">
        <span className="label-mono text-muted">Status</span>
        <div className="relative">
          <select
            className={`${inputClass} cursor-pointer appearance-none pr-10`}
            name="status"
            required
            defaultValue={defaultValues?.status ?? "pre-production"}
          >
            {PROJECT_STATUSES.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          <svg
            viewBox="0 0 24 24"
            className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            aria-hidden
          >
            <path
              d="m6 9 6 6 6-6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </label>

      <SubmitButton pendingLabel="Saving…">{submitLabel}</SubmitButton>
    </form>
  );
}
