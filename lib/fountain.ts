import { Fountain } from "fountain-js";
import DOMPurify from "isomorphic-dompurify";

/**
 * Parse raw Fountain plaintext into sanitized screenplay HTML.
 *
 * fountain-js does NOT sanitize its output, and we inject the result via
 * dangerouslySetInnerHTML, so running it through DOMPurify is mandatory — a
 * project member could otherwise smuggle markup/script into the screenplay.
 * Works on both server (jsdom) and client (browser) via isomorphic-dompurify.
 */
export function renderFountain(text: string): string {
  if (!text.trim()) return "";
  const { html } = new Fountain().parse(text);
  return DOMPurify.sanitize(html.script ?? "");
}
