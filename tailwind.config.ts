import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Cyber Atelier palette
        bg: {
          DEFAULT: "#070a10",
          deep: "#04060a",
          panel: "#0d1117",
          elevated: "#121826",
        },
        ink: {
          DEFAULT: "#e6f1ff",
          muted: "#8892b0",
          dim: "#5a6778",
        },
        accent: {
          DEFAULT: "#64ffda", // signature cyan
          glow: "#7dffe0",
          dim: "#3dd6b6",
        },
        edge: {
          DEFAULT: "rgba(100, 255, 218, 0.12)",
          strong: "rgba(100, 255, 218, 0.28)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular"],
      },
      fontSize: {
        "display-xl": ["clamp(3rem, 9vw, 7.5rem)", { lineHeight: "0.92", letterSpacing: "-0.04em" }],
        "display-lg": ["clamp(2.25rem, 5vw, 4rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-md": ["clamp(1.6rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.025em" }],
      },
      animation: {
        "scan-line": "scan-line 8s linear infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "grain": "grain 8s steps(10) infinite",
        "marquee": "marquee 40s linear infinite",
      },
      keyframes: {
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.4", filter: "blur(20px)" },
          "50%": { opacity: "0.8", filter: "blur(28px)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -5%)" },
          "30%": { transform: "translate(3%, -8%)" },
          "50%": { transform: "translate(-3%, 6%)" },
          "70%": { transform: "translate(7%, -3%)" },
          "90%": { transform: "translate(-6%, 4%)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, transparent, #070a10 80%), repeating-linear-gradient(0deg, rgba(100,255,218,0.06) 0 1px, transparent 1px 80px), repeating-linear-gradient(90deg, rgba(100,255,218,0.06) 0 1px, transparent 1px 80px)",
        "radial-glow":
          "radial-gradient(60% 60% at 50% 40%, rgba(100,255,218,0.18) 0%, rgba(7,10,16,0) 70%)",
      },
      boxShadow: {
        glow: "0 0 60px -10px rgba(100,255,218,0.35)",
        "glow-strong": "0 0 80px -10px rgba(100,255,218,0.55)",
        "panel": "0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(100,255,218,0.08), 0 20px 40px -20px rgba(0,0,0,0.8)",
      },
    },
  },
  plugins: [],
};

export default config;
