export default function ScriptLoading() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-foreground/10">
        <div className="mx-auto h-[69px] w-full max-w-6xl px-5 sm:px-8" />
      </div>
      <div className="mx-auto w-full max-w-3xl animate-pulse px-5 py-10 sm:px-8 sm:py-14">
        <div className="h-3 w-32 rounded bg-foreground/10" />
        <div className="mt-6 h-3 w-24 rounded bg-foreground/10" />
        <div className="mt-8 space-y-3">
          <div className="h-3 w-40 rounded bg-foreground/10" />
          <div className="h-3 w-full rounded bg-foreground/5" />
          <div className="h-3 w-5/6 rounded bg-foreground/5" />
        </div>
      </div>
    </div>
  );
}
