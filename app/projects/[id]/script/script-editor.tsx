"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { renderFountain } from "@/lib/fountain";
import { saveScript } from "./actions";

type SaveState = "idle" | "dirty" | "saving" | "saved" | "error";

const PLACEHOLDER = `INT. LOCATION - DAY

Action goes here — describe what we see.

CHARACTER
Dialogue goes here.
(a parenthetical)
More dialogue.

CUT TO:`;

export function ScriptEditor({
  projectId,
  initialContent,
  canWrite,
}: {
  projectId: string;
  initialContent: string;
  canWrite: boolean;
}) {
  const [content, setContent] = useState(initialContent);
  const [previewHtml, setPreviewHtml] = useState(() =>
    renderFountain(initialContent),
  );
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [view, setView] = useState<"write" | "preview">("write");

  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastSaved = useRef(initialContent);
  const contentRef = useRef(initialContent);

  // Debounced preview render — keep typing smooth on long scripts.
  useEffect(() => {
    const t = setTimeout(() => setPreviewHtml(renderFountain(content)), 150);
    return () => clearTimeout(t);
  }, [content]);

  const doSave = useCallback(
    async (text: string) => {
      setSaveState("saving");
      const res = await saveScript(projectId, text);
      if ("error" in res) {
        setSaveState("error");
      } else {
        lastSaved.current = text;
        // Only flip to "saved" if nothing newer is pending.
        setSaveState((s) => (s === "saving" ? "saved" : s));
      }
    },
    [projectId],
  );

  function onChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setContent(text);
    contentRef.current = text;
    if (!canWrite) return;
    setSaveState("dirty");
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => doSave(text), 1200);
  }

  // Best-effort flush of unsaved edits when leaving the editor.
  useEffect(() => {
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (canWrite && contentRef.current !== lastSaved.current) {
        void saveScript(projectId, contentRef.current);
      }
    };
  }, [canWrite, projectId]);

  const textarea = (
    <textarea
      value={content}
      onChange={onChange}
      spellCheck={false}
      aria-label="Screenplay source (Fountain format)"
      placeholder={PLACEHOLDER}
      className="h-[62vh] w-full resize-none rounded-[6px] border border-foreground/15 bg-background p-4 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted/60 focus:border-accent focus:outline-none"
    />
  );

  const preview = (
    <div className="h-[62vh] overflow-auto rounded-[6px] border border-foreground/10 bg-surface/30 p-5 sm:p-6">
      {previewHtml ? (
        <div
          className="screenplay"
          dangerouslySetInnerHTML={{ __html: previewHtml }}
        />
      ) : (
        <p className="label-mono text-muted">Formatted screenplay appears here</p>
      )}
    </div>
  );

  return (
    <div className="mt-6">
      {/* Toolbar */}
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="label-mono text-accent">Screenplay</p>

        <div className="flex items-center gap-3">
          <SaveIndicator
            canWrite={canWrite}
            state={saveState}
            onRetry={() => doSave(content)}
          />

          {canWrite && (
            <div className="flex rounded-[5px] border border-foreground/15 p-0.5 sm:hidden">
              <ToggleButton
                active={view === "write"}
                onClick={() => setView("write")}
              >
                Write
              </ToggleButton>
              <ToggleButton
                active={view === "preview"}
                onClick={() => setView("preview")}
              >
                Preview
              </ToggleButton>
            </div>
          )}
        </div>
      </div>

      {canWrite ? (
        <>
          {/* Desktop: split */}
          <div className="hidden gap-4 sm:grid sm:grid-cols-2">
            {textarea}
            {preview}
          </div>
          {/* Mobile: toggle */}
          <div className="sm:hidden">{view === "write" ? textarea : preview}</div>
        </>
      ) : (
        // Read-only: preview only.
        <div className="rounded-[6px] border border-foreground/10 bg-background p-5 sm:p-8">
          {previewHtml ? (
            <div
              className="screenplay"
              dangerouslySetInnerHTML={{ __html: previewHtml }}
            />
          ) : (
            <div className="py-10 text-center">
              <p className="font-display text-lg font-black uppercase tracking-tight text-foreground">
                Nothing written yet
              </p>
              <span className="label-mono mt-3 inline-block text-muted">
                Read-only
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function SaveIndicator({
  canWrite,
  state,
  onRetry,
}: {
  canWrite: boolean;
  state: SaveState;
  onRetry: () => void;
}) {
  if (!canWrite) return <span className="label-mono text-muted">Read-only</span>;
  switch (state) {
    case "saving":
      return <span className="label-mono text-muted">Saving…</span>;
    case "saved":
      return <span className="label-mono text-muted">Saved</span>;
    case "dirty":
      return <span className="label-mono text-muted">Unsaved</span>;
    case "error":
      return (
        <button
          onClick={onRetry}
          className="label-mono text-accent underline-offset-2 hover:underline"
        >
          Save failed — retry
        </button>
      );
    default:
      return null;
  }
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`label-mono rounded-[3px] px-3 py-1.5 transition-colors duration-200 ${
        active ? "bg-foreground text-background" : "text-muted hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}
