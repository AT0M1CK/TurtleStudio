import Link from "next/link";
import { Logo } from "@/components/logo";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-6xl px-5 py-5 sm:px-8">
        <Logo />
      </header>

      <main className="flex flex-1 items-center justify-center px-5 pb-24 pt-6">
        <div className="animate-reveal w-full max-w-sm">
          <p className="label-mono text-accent">Join the crew</p>
          <h1 className="mt-3 font-display text-4xl font-black uppercase tracking-tight text-foreground">
            Create account
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            One account for every project you run or join.
          </p>

          <div className="mt-8">
            <SignupForm />
          </div>

          <p className="mt-6 text-sm text-foreground/70">
            Already have one?{" "}
            <Link
              href="/login"
              className="font-medium text-accent hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
