"use client";

import { deleteProject } from "./actions";

export function DeleteProjectButton({ id }: { id: string }) {
  return (
    <form
      action={deleteProject.bind(null, id)}
      onSubmit={(e) => {
        if (
          !window.confirm(
            "Delete this project? Shoot days and shots go with it. This cannot be undone.",
          )
        ) {
          e.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex h-10 items-center rounded-[5px] border border-accent px-4 text-sm font-medium text-accent transition-colors duration-200 hover:bg-accent hover:text-background"
      >
        Delete
      </button>
    </form>
  );
}
