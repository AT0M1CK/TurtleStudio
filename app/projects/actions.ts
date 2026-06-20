"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PROJECT_STATUS_VALUES } from "@/lib/projects";

export type ProjectState = { error?: string };

function parse(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    status: String(formData.get("status") ?? "").trim(),
  };
}

function validate({ name, status }: { name: string; status: string }) {
  if (!name) return "Project name is required.";
  if (!PROJECT_STATUS_VALUES.includes(status as never))
    return "Pick a valid status.";
  return null;
}

export async function createProject(
  _prev: ProjectState,
  formData: FormData,
): Promise<ProjectState> {
  const fields = parse(formData);
  const invalid = validate(fields);
  if (invalid) return { error: invalid };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data, error } = await supabase
    .from("projects")
    .insert({
      owner_id: user.id,
      name: fields.name,
      description: fields.description || null,
      status: fields.status,
    })
    .select("id")
    .single();

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  redirect(`/projects/${data.id}`);
}

export async function updateProject(
  id: string,
  _prev: ProjectState,
  formData: FormData,
): Promise<ProjectState> {
  const fields = parse(formData);
  const invalid = validate(fields);
  if (invalid) return { error: invalid };

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { error } = await supabase
    .from("projects")
    .update({
      name: fields.name,
      description: fields.description || null,
      status: fields.status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) return { error: error.message };

  revalidatePath("/dashboard");
  revalidatePath(`/projects/${id}`);
  redirect(`/projects/${id}`);
}

export async function deleteProject(id: string) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  // RLS ensures only the owner can actually delete; cascades to shoot_days,
  // shots, and project_members.
  await supabase.from("projects").delete().eq("id", id);

  revalidatePath("/dashboard");
  redirect("/dashboard");
}
