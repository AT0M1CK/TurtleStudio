import Link from "next/link";

/* ============================================================
   Turtle Studio — landing page
   Precision / industrial spec-sheet aesthetic.
   ============================================================ */

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* ---------------- HERO ---------------- */}
        <section className="mx-auto w-full max-w-6xl px-5 pb-16 pt-6 sm:px-8 sm:pb-20 lg:pt-16">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
            {/* Left — manifesto */}
            <div>
              <p
                className="label-mono animate-reveal text-accent"
                style={{ animationDelay: "0ms" }}
              >
                Production companion · Built in Kerala
              </p>

              <h1
                className="stretch-expanded animate-reveal mt-5 font-display text-[2.6rem] font-black uppercase leading-[0.92] tracking-[-0.02em] text-foreground sm:text-6xl lg:text-7xl"
                style={{ animationDelay: "60ms" }}
              >
                Every shot,
                <br />
                every call time,
                <br />
                <span className="text-accent">in order.</span>
              </h1>

              <p
                className="animate-reveal mt-6 max-w-md text-base leading-relaxed text-foreground/80"
                style={{ animationDelay: "120ms" }}
              >
                Turtle Studio keeps pre-production, shoot-day execution, and your
                project&apos;s creative history in one precise, mobile-first place —
                no clutter, no onboarding.
              </p>

              <div
                className="animate-reveal mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
                style={{ animationDelay: "180ms" }}
              >
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-[5px] bg-accent px-6 text-sm font-medium tracking-wide text-background transition-opacity duration-200 hover:opacity-90"
                >
                  Start a project
                </Link>
                <Link
                  href="/login"
                  className="group inline-flex h-12 items-center gap-2 text-sm font-medium text-foreground transition-colors duration-200 hover:text-accent"
                >
                  I already have an account
                  <span
                    aria-hidden
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>
              </div>
            </div>

            {/* Right — annotated phone mockup */}
            <div
              className="animate-reveal flex justify-start lg:justify-center"
              style={{ animationDelay: "240ms" }}
            >
              <PhoneMockup />
            </div>
          </div>
        </section>

        {/* ---------------- FEATURE BADGES ---------------- */}
        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8 sm:pb-28">
          <div className="mb-6 flex items-center gap-3">
            <span className="label-mono text-muted">The core loop</span>
            <span className="h-px flex-1 bg-foreground/10" aria-hidden />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <FeatureBadge key={f.index} {...f} />
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- Header ---------------- */
function SiteHeader() {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
      <Link href="/" className="label-mono text-foreground" aria-label="Turtle Studio home">
        Turtle Studio
      </Link>
      <nav className="flex items-center gap-2 sm:gap-4">
        <Link
          href="/login"
          className="label-mono inline-flex h-11 items-center px-2 text-muted transition-colors duration-200 hover:text-foreground"
        >
          Log in
        </Link>
        <Link
          href="/signup"
          className="inline-flex h-11 items-center justify-center rounded-[5px] bg-foreground px-4 text-sm font-medium text-background transition-opacity duration-200 hover:opacity-90"
        >
          Sign up
        </Link>
      </nav>
    </header>
  );
}

/* ---------------- Footer ---------------- */
function SiteFooter() {
  return (
    <footer className="mx-auto flex w-full max-w-6xl flex-col gap-2 border-t border-foreground/10 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
      <span className="label-mono text-foreground">Turtle Studio</span>
      <span className="label-mono text-muted">
        Turtle Theory · Kerala, India · MMXXVI
      </span>
    </footer>
  );
}

/* ---------------- Phone mockup w/ spec annotations ---------------- */
function PhoneMockup() {
  return (
    <div className="relative">
      {/* device */}
      <div className="relative w-[210px] rounded-[22px] border border-foreground/15 bg-foreground p-[6px] shadow-card sm:w-[230px]">
        {/* screen */}
        <div className="overflow-hidden rounded-[16px] bg-background">
          {/* status strip */}
          <div className="flex items-center justify-between px-4 pt-3">
            <span className="label-mono text-muted">Day 03</span>
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
              <span className="label-mono text-accent">Shooting</span>
            </span>
          </div>

          {/* title */}
          <div className="px-4 pt-3">
            <h2 className="font-display text-xl font-black uppercase leading-none tracking-tight text-foreground">
              Fort Kochi
            </h2>
          </div>

          {/* call time + location block */}
          <div className="mx-4 mt-4 rounded-[6px] border border-foreground/10 bg-surface/60">
            <div className="flex items-baseline justify-between px-3 py-2.5">
              <span className="label-mono text-muted">Call time</span>
              <span className="font-mono text-sm font-medium text-foreground">
                05:30
              </span>
            </div>
            <div className="flex items-baseline justify-between border-t border-foreground/10 px-3 py-2.5">
              <span className="label-mono text-muted">Location</span>
              <span className="font-mono text-[11px] font-medium text-foreground">
                Beach Rd
              </span>
            </div>
          </div>

          {/* shot list */}
          <div className="px-4 pb-5 pt-4">
            <span className="label-mono text-muted">Shot list</span>
            <div className="mt-2.5 space-y-2">
              <ShotRow scene="12A" done />
              <ShotRow scene="12B" />
              <ShotRow scene="13" />
              <ShotRow scene="14C" />
            </div>
          </div>
        </div>
      </div>

      {/* leader-line annotations — anchored to the device's right edge,
          tuned to line up with the call-time row, location row, and shot list */}
      <Annotation top="33%" label="Call time" />
      <Annotation top="45%" label="Location" />
      <Annotation top="72%" label="Shot list" />
    </div>
  );
}

function ShotRow({ scene, done = false }: { scene: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <span
        aria-hidden
        className={`flex h-3.5 w-3.5 flex-none items-center justify-center rounded-[3px] border ${
          done ? "border-accent bg-accent" : "border-foreground/30 bg-transparent"
        }`}
      >
        {done && (
          <svg viewBox="0 0 12 12" className="h-2 w-2 text-background" fill="none">
            <path
              d="M2.5 6.5L5 9L9.5 3.5"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className="font-mono text-[11px] font-medium text-foreground">
        {scene}
      </span>
      <span
        aria-hidden
        className={`h-1 flex-1 rounded-full ${
          done ? "bg-foreground/15" : "bg-foreground/10"
        }`}
      />
    </div>
  );
}

/* A single spec-sheet leader line + mono label pinned to the phone's right edge. */
function Annotation({ top, label }: { top: string; label: string }) {
  return (
    <div
      className="absolute left-full flex -translate-y-1/2 items-center"
      style={{ top }}
      aria-hidden
    >
      <span className="-ml-[3px] h-[7px] w-[7px] flex-none rounded-full border border-background bg-accent" />
      <span className="h-px w-7 flex-none bg-accent sm:w-10" />
      <span className="label-mono whitespace-nowrap pl-2 text-foreground">
        {label}
      </span>
    </div>
  );
}

/* ---------------- Feature badges ---------------- */
type Feature = {
  index: string;
  label: string;
  desc: string;
  icon: React.ReactNode;
};

const features: Feature[] = [
  {
    index: "01",
    label: "Pre-production",
    desc: "Projects, team, and roles organized from day one.",
    icon: <IconClipboard />,
  },
  {
    index: "02",
    label: "Shoot day",
    desc: "Call times, locations, and shot lists, ready on set.",
    icon: <IconClapper />,
  },
  {
    index: "03",
    label: "WhatsApp share",
    desc: "Send the day's plan to your crew in one tap.",
    icon: <IconSend />,
  },
  {
    index: "04",
    label: "History",
    desc: "Every project's creative record, kept together.",
    icon: <IconArchive />,
  },
];

function FeatureBadge({ index, label, desc, icon }: Feature) {
  return (
    <div className="rounded-[6px] border border-foreground/10 bg-surface p-5 shadow-card transition-colors duration-200 hover:border-foreground/25">
      <div className="flex items-center justify-between">
        <span className="label-mono text-accent">{label}</span>
        <span className="font-mono text-[10px] text-muted">{index}</span>
      </div>
      <div className="mt-6 text-foreground">{icon}</div>
      <p className="mt-3 text-sm leading-snug text-foreground/80">{desc}</p>
    </div>
  );
}

/* ---------------- Icons (inline SVG, 24x24, 1.5 stroke) ---------------- */
function IconClipboard() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <rect x="5" y="4" width="14" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 4.5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1V6H9V4.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8.5 11h7M8.5 14.5h7M8.5 18h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconClapper() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <rect x="3.5" y="9" width="17" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M3.8 9 5.6 4.7l16.2 1.9-.5 2.4" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m8 5 1.6 3.6M13 5.6 14.6 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <path d="M20 4 3.5 11.2c-.7.3-.6 1.3.1 1.5l6.4 1.9 1.9 6.4c.2.7 1.2.8 1.5.1L20 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="m20 4-9.9 10.6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
function IconArchive() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <rect x="3.5" y="4.5" width="17" height="4" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 8.5V18a1.5 1.5 0 0 0 1.5 1.5h11A1.5 1.5 0 0 0 19 18V8.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 12h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
