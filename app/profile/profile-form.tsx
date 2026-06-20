"use client";

import { useFormState } from "react-dom";
import {
  updateProfile,
  deleteAccount,
  type AuthState,
} from "@/app/auth/actions";
import { inputClass, SubmitButton, FormNotice } from "@/components/form";
import { FILM_ROLES } from "@/lib/roles";

const initial: AuthState = {};

export function ProfileForm({
  fullName,
  role,
}: {
  fullName: string;
  role: string;
}) {
  const [state, formAction] = useFormState(updateProfile, initial);
  const [delState, deleteAction] = useFormState(deleteAccount, initial);

  // Allow a role saved in the DB that isn't in the curated list.
  const roleOptions = FILM_ROLES.includes(role as never)
    ? FILM_ROLES
    : role
      ? [role, ...FILM_ROLES]
      : FILM_ROLES;

  return (
    <div className="space-y-12">
      <form action={formAction} className="space-y-4">
        <FormNotice error={state.error} message={state.message} />

        <label className="block">
          <span className="label-mono text-muted">Full name</span>
          <input
            className={inputClass}
            type="text"
            name="full_name"
            autoComplete="name"
            required
            defaultValue={fullName}
            placeholder="Ravi Menon"
          />
        </label>

        <label className="block">
          <span className="label-mono text-muted">Role</span>
          <div className="relative">
            <select
              className={`${inputClass} cursor-pointer appearance-none pr-10`}
              name="role"
              required
              defaultValue={role}
            >
              <option value="" disabled>
                Select a role…
              </option>
              {roleOptions.map((r) => (
                <option key={r} value={r}>
                  {r}
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

        <SubmitButton pendingLabel="Saving…">Save changes</SubmitButton>
      </form>

      {/* Danger zone — delete account */}
      <section className="rounded-[6px] border border-accent/30 p-5">
        <h2 className="label-mono text-accent">Danger zone</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Permanently delete your account and all projects you own. This cannot
          be undone.
        </p>
        <form
          action={deleteAction}
          className="mt-4"
          onSubmit={(e) => {
            if (
              !window.confirm(
                "Delete your account permanently? This cannot be undone.",
              )
            ) {
              e.preventDefault();
            }
          }}
        >
          <FormNotice error={delState.error} message={delState.message} />
          <button
            type="submit"
            className="mt-2 inline-flex h-11 items-center rounded-[5px] border border-accent px-5 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
          >
            Delete account
          </button>
        </form>
      </section>
    </div>
  );
}
