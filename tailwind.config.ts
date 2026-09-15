import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#070c16",
          surface: "#0c1424",
          "surface-2": "#121c32",
          border: "rgba(255, 255, 255, 0.08)",
        },
        gold: {
          DEFAULT: "#d4af37",
          light: "#f3e5ab",
          dark: "#a68822",
          muted: "rgba(212, 175, 55, 0.25)",
        },
        cobalt: {
          DEFAULT: "#0071e3",
          glow: "rgba(0, 113, 227, 0.25)",
        },
      },
      fontFamily: {
        display: ["var(--font-prata)", "serif"],
        body: ["var(--font-plus-jakarta)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      borderRadius: {
        pill: "980px",
        button: "980px",
      },
    },
  },
  plugins: [],
};
export default config;
