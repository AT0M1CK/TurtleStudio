"use server";

import { createClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true } | { error: string };

// Upsert the screenplay for a project. RLS (private.can_write_script) is the
// real gate — owner or a member with a writing role. No .select() so there's
// no RETURNING / SELECT-policy round-trip.
export async function saveScript(
  projectId: string,
  content: string,
): Promise<SaveResult> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "You're signed out — log in again." };

  const { error } = await supabase.from("scripts").upsert(
    {
      project_id: projectId,
      content,
      updated_at: new Date().toISOString(),
      updated_by: user.id,
    },
    { onConflict: "project_id" },
  );

  if (error) return { error: error.message };
  return { ok: true };
}
