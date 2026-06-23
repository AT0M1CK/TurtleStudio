import { Fountain } from "fountain-js";
import type { ElementType } from "./schema";

type LineNode = {
  type: "line";
  attrs: { element: ElementType };
  content?: { type: "text"; text: string }[];
};
export type ScreenplayDoc = { type: "doc"; content: LineNode[] };

function line(element: ElementType, text: string): LineNode {
  const trimmed = text.replace(/\s+$/, "");
  return {
    type: "line",
    attrs: { element },
    content: trimmed ? [{ type: "text", text: trimmed }] : undefined,
  };
}

export function emptyDoc(): ScreenplayDoc {
  return { type: "doc", content: [line("scene_heading", "")] };
}

// fountain-js token type → our element type.
const TOKEN_MAP: Record<string, ElementType | undefined> = {
  scene_heading: "scene_heading",
  action: "action",
  character: "character",
  dialogue: "dialogue",
  parenthetical: "parenthetical",
  transition: "transition",
  centered: "general",
  shot: "shot",
};

/**
 * Convert legacy Fountain plaintext into a structured screenplay doc, for the
 * one-time hydration when a project has `content` but no `doc` yet. Multi-line
 * tokens are split into one `line` per visual line (each block is its own node).
 */
export function fountainToDoc(content: string): ScreenplayDoc {
  if (!content.trim()) return emptyDoc();

  const { tokens } = new Fountain().parse(content, true);
  const lines: LineNode[] = [];

  for (const token of tokens ?? []) {
    const element = TOKEN_MAP[token.type];
    if (!element) continue; // skip title-page keys, page breaks, dual markers, etc.
    const text = (token.text ?? "").replace(/\r/g, "");
    for (const part of text.split("\n")) {
      lines.push(line(element, part));
    }
  }

  return lines.length ? { type: "doc", content: lines } : emptyDoc();
}
