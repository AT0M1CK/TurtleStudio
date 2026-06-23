import { Node, InputRule, type Editor } from "@tiptap/core";

/**
 * Screenplay elements. We model the document as a flat sequence of `line` nodes,
 * each carrying an `element` attribute — far simpler for ProseMirror than eight
 * separate node types, and it feeds the pagination engine cleanly later.
 */
export type ElementType =
  | "scene_heading"
  | "action"
  | "character"
  | "dialogue"
  | "parenthetical"
  | "transition"
  | "shot"
  | "general";

export const ELEMENT_LABELS: Record<ElementType, string> = {
  scene_heading: "Scene Heading",
  action: "Action",
  character: "Character",
  dialogue: "Dialogue",
  parenthetical: "Parenthetical",
  transition: "Transition",
  shot: "Shot",
  general: "General",
};

// Pressing Enter moves to the next logical element (standard Final Draft flow).
export const NEXT_ON_ENTER: Record<ElementType, ElementType> = {
  scene_heading: "action",
  action: "action",
  character: "dialogue",
  dialogue: "action",
  parenthetical: "dialogue",
  transition: "scene_heading",
  shot: "action",
  general: "action",
};

// Tab / Shift-Tab cycles the current line's element through this ring.
export const TAB_CYCLE: ElementType[] = [
  "action",
  "scene_heading",
  "character",
  "dialogue",
  "parenthetical",
  "transition",
  "shot",
  "general",
];

function cycleElement(current: ElementType, dir: 1 | -1): ElementType {
  const i = TAB_CYCLE.indexOf(current);
  const base = i === -1 ? 0 : i;
  return TAB_CYCLE[(base + dir + TAB_CYCLE.length) % TAB_CYCLE.length];
}

export const Line = Node.create({
  name: "line",
  group: "block",
  content: "text*",
  defining: true,

  addAttributes() {
    return {
      element: {
        default: "action" as ElementType,
        parseHTML: (el) => el.getAttribute("data-element") || "action",
        renderHTML: (attrs) => ({ "data-element": attrs.element }),
      },
    };
  },

  parseHTML() {
    return [{ tag: "p[data-element]" }];
  },

  renderHTML({ HTMLAttributes }) {
    return ["p", HTMLAttributes, 0];
  },

  addKeyboardShortcuts() {
    const currentElement = (editor: Editor): ElementType =>
      editor.state.selection.$from.parent.attrs.element as ElementType;

    return {
      Enter: ({ editor }) => {
        const next = NEXT_ON_ENTER[currentElement(editor)] ?? "action";
        return editor
          .chain()
          .splitBlock()
          .updateAttributes("line", { element: next })
          .run();
      },
      Tab: ({ editor }) =>
        editor
          .chain()
          .updateAttributes("line", {
            element: cycleElement(currentElement(editor), 1),
          })
          .run(),
      "Shift-Tab": ({ editor }) =>
        editor
          .chain()
          .updateAttributes("line", {
            element: cycleElement(currentElement(editor), -1),
          })
          .run(),
    };
  },

  addInputRules() {
    return [
      // "INT." / "EXT." / "EST." / "I/E" at the start of a line → Scene Heading.
      new InputRule({
        find: /^(int|ext|est|i\/e)\.?\s$/i,
        handler: ({ chain }) => {
          chain().updateAttributes("line", { element: "scene_heading" }).run();
        },
      }),
      // A line ending in "TO:" → Transition.
      new InputRule({
        find: /\bto:\s$/i,
        handler: ({ chain }) => {
          chain().updateAttributes("line", { element: "transition" }).run();
        },
      }),
    ];
  },
});
