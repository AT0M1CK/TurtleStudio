// Project lifecycle statuses — mirror the `project_status` enum in Postgres.
export const PROJECT_STATUSES = [
  { value: "pre-production", label: "Pre-production" },
  { value: "shooting", label: "Shooting" },
  { value: "post-production", label: "Post-production" },
  { value: "done", label: "Done" },
] as const;

export type ProjectStatus = (typeof PROJECT_STATUSES)[number]["value"];

export const PROJECT_STATUS_VALUES = PROJECT_STATUSES.map((s) => s.value);

export function statusLabel(value: string): string {
  return PROJECT_STATUSES.find((s) => s.value === value)?.label ?? value;
}
