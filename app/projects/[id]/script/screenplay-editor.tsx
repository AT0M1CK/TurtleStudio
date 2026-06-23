"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import Document from "@tiptap/extension-document";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Line,
  ELEMENT_LABELS,
  type ElementType,
} from "@/lib/screenplay/schema";
import type { ScreenplayDoc } from "@/lib/screenplay/serialize";

// The screenplay document is a flat list of typed `line` nodes.
const ScreenplayDocument = Document.extend({ content: "line+" });

export function ScreenplayEditor({
  initialDoc,
  canWrite,
}: {
  initialDoc: ScreenplayDoc;
  canWrite: boolean;
}) {
  const [element, setElement] = useState<ElementType>("action");

  const editor = useEditor({
    immediatelyRender: false,
    editable: canWrite,
    extensions: [
      ScreenplayDocument,
      Line,
      Text,
      History,
      Placeholder.configure({
        placeholder: "INT. SOMEWHERE - DAY — start writing…",
      }),
    ],
    content: initialDoc,
    editorProps: {
      attributes: {
        class: "screenplay-surface",
        spellcheck: "false",
        role: "textbox",
        "aria-label": "Screenplay",
      },
    },
    onSelectionUpdate: ({ editor }) => {
      setElement(editor.state.selection.$from.parent.attrs.element);
    },
    onTransaction: ({ editor }) => {
      setElement(editor.state.selection.$from.parent.attrs.element);
    },
  });

  return (
    <div className="screenplay-workspace">
      {/* Chrome */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="label-mono text-accent">Screenplay</span>
          <span className="label-mono rounded-[4px] border border-foreground/15 px-2 py-1 text-foreground">
            {ELEMENT_LABELS[element]}
          </span>
        </div>
        {canWrite ? (
          <span className="label-mono hidden text-muted sm:inline">
            Enter · next — Tab · change type
          </span>
        ) : (
          <span className="label-mono text-muted">Read-only</span>
        )}
      </div>

      {/* The page */}
      <div className="screenplay-page">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
