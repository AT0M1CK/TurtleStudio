// Curated craft roles for indie film crews. Free text in the DB, so this is
// a suggestion list, not a hard constraint — "Other" keeps it open.
export const FILM_ROLES = [
  "Director",
  "Writer",
  "Director of Photography",
  "Producer",
  "Assistant Director",
  "Sound",
  "Editor",
  "Production Designer",
  "Gaffer",
  "Art",
  "Other",
] as const;

export type FilmRole = (typeof FILM_ROLES)[number];

// Per-project roles allowed to edit the screenplay (lowercased for comparison).
// The project owner can always write, regardless of this list.
export const SCRIPT_WRITING_ROLES = [
  "director",
  "writer",
  "script editor",
  "editor",
] as const;

export function isWritingRole(role: string | null | undefined): boolean {
  return !!role && SCRIPT_WRITING_ROLES.includes(role.toLowerCase() as never);
}
