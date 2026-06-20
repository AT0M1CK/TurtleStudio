"use client";

import { useFormState } from "react-dom";
import { signup, type AuthState } from "@/app/auth/actions";
import { inputClass, SubmitButton, FormNotice } from "@/components/form";
import { FILM_ROLES } from "@/lib/roles";

const initial: AuthState = {};

export function SignupForm() {
  const [state, formAction] = useFormState(signup, initial);

  return (
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
          placeholder="Ravi Menon"
        />
      </label>

      <label className="block">
        <span className="label-mono text-muted">Email</span>
        <input
          className={inputClass}
          type="email"
          name="email"
          autoComplete="email"
          required
          placeholder="you@studio.com"
        />
      </label>

      <label className="block">
        <span className="label-mono text-muted">Your role</span>
        <div className="relative">
          <select
            className={`${inputClass} cursor-pointer appearance-none pr-10`}
            name="role"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select a role…
            </option>
            {FILM_ROLES.map((role) => (
              <option key={role} value={role}>
                {role}
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

      <label className="block">
        <span className="label-mono text-muted">Password</span>
        <input
          className={inputClass}
          type="password"
          name="password"
          autoComplete="new-password"
          required
          minLength={6}
          placeholder="At least 6 characters"
        />
      </label>

      <SubmitButton pendingLabel="Creating account…" className="w-full">
        Create account
      </SubmitButton>
    </form>
  );
}
