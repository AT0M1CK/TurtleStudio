import Link from "next/link";

/**
 * Turtle Theory Co. wordmark.
 *
 * Rendered in the Fraunces display serif as a faithful stand-in for the
 * supplied logo. To use the exact brand asset instead, drop the file at
 * `public/logo.png` (or .svg) and swap the inner markup for next/image.
 */
export function Logo({
  className = "",
  href = "/",
}: {
  className?: string;
  href?: string | null;
}) {
  const mark = (
    <span
      className={`font-serif text-lg font-semibold leading-none tracking-tight text-foreground ${className}`}
    >
      Turtle Theory Co.
    </span>
  );

  if (href === null) return mark;

  return (
    <Link href={href} aria-label="Turtle Theory Co. — home" className="inline-flex">
      {mark}
    </Link>
  );
}
