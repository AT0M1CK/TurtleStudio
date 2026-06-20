import type { Metadata } from "next";
import { Archivo, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

// Display — Archivo, with the width axis enabled for expanded statements.
const display = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  axes: ["wdth"],
  display: "swap",
});

// Body / UI — Inter.
const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

// Technical annotations — IBM Plex Mono.
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Turtle Studio — A production tool that feels like equipment",
  description:
    "A precise, mobile-first production companion for indie filmmakers. Pre-production, shoot-day execution, and your project's creative history in one disciplined place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
