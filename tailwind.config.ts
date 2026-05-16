import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#07070a",
        void: "#0a0a0c",
        ivory: "#f4ecd8",
        bone: "#e8dcc4",
        ash: "#8a8a92",
        gold: "#c9a96e",
        flame: "#e9b96e",
        cyan: "#7dd3fc",
        teal: "#5eead4",
        crimson: "#c4756b",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        zh: ["var(--font-zh)", "ui-serif", "serif"],
      },
      letterSpacing: {
        cinema: "0.32em",
        wide2: "0.18em",
      },
      animation: {
        breathe: "breathe 7s ease-in-out infinite",
        drift: "drift 18s ease-in-out infinite",
        shimmer: "shimmer 5s linear infinite",
      },
      keyframes: {
        breathe: {
          "0%,100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.02)" },
        },
        drift: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-12px,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
