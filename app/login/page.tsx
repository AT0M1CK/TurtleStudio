import Link from "next/link";
import { Logo } from "@/components/logo";
import { FormNotice } from "@/components/form";
import { LoginForm } from "./login-form";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  const confirmError =
    searchParams.error === "confirm"
      ? "That confirmation link was invalid or expired. Try logging in."
      : undefined;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center px-5 pb-24 pt-6">
        <div className="animate-reveal w-full max-w-sm">
          <p className="label-mono text-accent">Welcome back</p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            Pick up where your crew left off.
          </p>

          {confirmError && (
            <div className="mt-6">
              <FormNotice error={confirmError} />
            </div>
          )}

          <div className="mt-8">
            <LoginForm />
          </div>

          <p className="mt-6 text-sm text-foreground/70">
            New here?{" "}
            <Link
              href="/signup"
              className="font-medium text-accent hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
