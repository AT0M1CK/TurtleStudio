import { statusLabel } from "@/lib/projects";

// Color-coded per the design brief:
// pre-production → muted gray · shooting → accent red ·
// post-production → black · done → calm green.
const STYLES: Record<string, string> = {
  "pre-production": "text-muted border-muted/40 bg-muted/10",
  shooting: "text-accent border-accent/40 bg-accent/10",
  "post-production": "text-foreground border-foreground/30 bg-foreground/[0.06]",
  done: "text-[#3f7a59] border-[#3f7a59]/40 bg-[#3f7a59]/10",
};

export function StatusBadge({ status }: { status: string }) {
  const cls = STYLES[status] ?? STYLES["pre-production"];
  return (
    <span
      className={`label-mono inline-flex items-center rounded-[4px] border px-2 py-1 ${cls}`}
    >
      {statusLabel(status)}
    </span>
  );
}
