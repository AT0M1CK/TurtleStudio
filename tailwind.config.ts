import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Precision / industrial palette — single light theme.
        background: "var(--background)", // #FDFAF5 warm cream
        foreground: "var(--foreground)", // #010201 near-black
        accent: "var(--accent)", //     #C60006 red — sparingly
        muted: "var(--muted)", //        #8A8A82 warm gray
        surface: "var(--surface)", //    #E8E3D8 card background
      },
      fontFamily: {
        // Inter — body / UI default
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        // Archivo — display headlines only
        display: ["var(--font-display)", "var(--font-body)", "sans-serif"],
        // IBM Plex Mono — technical annotations only
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      boxShadow: {
        // Very subtle card elevation — no drop-shadow soup.
        card: "0 1px 1px 0 rgba(1,2,1,0.05), 0 1px 3px 0 rgba(1,2,1,0.04)",
      },
      keyframes: {
        reveal: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        reveal: "reveal 0.6s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};
export default config;
