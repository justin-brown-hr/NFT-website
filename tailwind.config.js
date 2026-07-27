/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-black": "#08060B",
        "bg-panel": "#0F0B14",
        navy: "#0A1628",
        "navy-deep": "#06101C",
        "purple-primary": "#6B3FA0",
        "purple-glow": "#8B5CF6",
        gold: "#E8B75C",
        "gold-bright": "#F4C860",
        "text-primary": "#F5F1EA",
        "text-muted": "#A99FB0",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
        script: ["var(--font-script)", "cursive"],
      },
      letterSpacing: {
        "wide-label": "0.28em",
        "cta": "0.12em",
      },
      backgroundImage: {
        "purple-radial":
          "radial-gradient(ellipse at center, rgba(107, 63, 160, 0.35) 0%, transparent 70%)",
        "vignette":
          "radial-gradient(ellipse at center, transparent 30%, rgba(8, 6, 11, 0.85) 100%)",
      },
    },
  },
  plugins: [],
};
