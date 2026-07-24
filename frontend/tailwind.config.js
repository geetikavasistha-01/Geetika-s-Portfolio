/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        surface2: "var(--color-surface2)",
        border: "var(--color-border)",
        text1: "var(--color-text1)",
        text2: "var(--color-text2)",
        text3: "var(--color-text3)",
        text4: "var(--color-text4)",
        navbar: "var(--color-navbar)",
        amber: "#88BDA4",
        teal: "#659287",
        rose: "#B1D3B9",
        green: "#88BDA4",
      },
      fontFamily: {
        display: ["Old Money", "Georgia", "serif"],
        body: ["Didact Gothic", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
