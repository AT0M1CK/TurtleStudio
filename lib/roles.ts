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
