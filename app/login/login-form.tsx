"use client";

import { useFormState } from "react-dom";
import { login, type AuthState } from "@/app/auth/actions";
import { inputClass, SubmitButton, FormNotice } from "@/components/form";

const initial: AuthState = {};

export function LoginForm() {
  const [state, formAction] = useFormState(login, initial);

  return (
    <form action={formAction} className="space-y-4">
      <FormNotice error={state.error} message={state.message} />

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
        <span className="label-mono text-muted">Password</span>
        <input
          className={inputClass}
          type="password"
          name="password"
          autoComplete="current-password"
          required
          placeholder="••••••••"
        />
      </label>

      <SubmitButton pendingLabel="Signing in…" className="w-full">
        Sign in
      </SubmitButton>
    </form>
  );
}
