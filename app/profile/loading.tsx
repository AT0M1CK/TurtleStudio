export default function ProfileLoading() {
  return (
    <div className="min-h-screen">
      <div className="border-b border-foreground/10">
        <div className="mx-auto h-[69px] w-full max-w-6xl px-5 sm:px-8" />
      </div>
      <div className="mx-auto w-full max-w-xl animate-pulse px-5 py-10 sm:px-8 sm:py-14">
        <div className="h-3 w-20 rounded bg-foreground/10" />
        <div className="mt-4 h-10 w-48 rounded bg-foreground/10" />
        <div className="mt-8 h-20 w-full rounded-[6px] bg-foreground/5" />
        <div className="mt-8 h-40 w-full rounded-[6px] bg-foreground/5" />
      </div>
    </div>
  );
}
