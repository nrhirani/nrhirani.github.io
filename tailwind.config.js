/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0a0a0d",
          surface: "#111116",
          panel: "#16121f",
          card: "#18181d",
        },
        accent: {
          pink: "#ec4899",
          violet: "#7c3aed",
          cyan: "#2dd4bf",
        },
        ink: {
          DEFAULT: "#f5f5f7",
          muted: "#9ca3af",
          dim: "#6b7280",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "accent-gradient": "linear-gradient(90deg, #7c3aed 0%, #ec4899 100%)",
        "panel-gradient": "linear-gradient(135deg, #1f1733 0%, #150f24 100%)",
      },
      keyframes: {
        "scroll-dot": {
          "0%, 100%": { transform: "translateY(0)", opacity: "1" },
          "50%": { transform: "translateY(10px)", opacity: "0.3" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.25" },
          "50%": { transform: "translate(-50%, -50%) scale(1.18)", opacity: "0.4" },
        },
        "glow-pulse-slow": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1.1)", opacity: "0.15" },
          "50%": { transform: "translate(-50%, -50%) scale(0.85)", opacity: "0.28" },
        },
      },
      animation: {
        "scroll-dot": "scroll-dot 1.8s ease-in-out infinite",
        "fade-up": "fade-up 0.7s ease-out forwards",
        "glow-pulse": "glow-pulse 9s ease-in-out infinite",
        "glow-pulse-slow": "glow-pulse-slow 12s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
