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
        bg: "var(--bg)",
        surface: "var(--surface)",
        surface2: "var(--surface2, var(--surface))",
        border: "var(--border)",
        accent: "var(--accent)",
        text: "var(--text)",
        "text-muted": "var(--text-muted)",
        text1: "var(--text)",
        text2: "var(--text)",
        text3: "var(--text-muted)",
        text4: "var(--text-muted)",
        navbar: "var(--navbar, var(--surface))",
        amber: "var(--accent)",
        teal: "var(--accent)",
        rose: "var(--accent)",
        green: "var(--accent)",
      },
      fontFamily: {
        sans: ["'Instrument Serif'", "Georgia", "serif"],
        serif: ["'Instrument Serif'", "Georgia", "serif"],
        mono: ["'Instrument Serif'", "Georgia", "serif"],
        display: ["'Instrument Serif'", "Georgia", "serif"],
        body: ["'Instrument Serif'", "Georgia", "serif"],
        editorial: ["'Instrument Serif'", "Georgia", "serif"],
        garamond: ["'Instrument Serif'", "Georgia", "serif"],
        daffeniy: ["'Instrument Serif'", "Georgia", "serif"],
        typewriter: ["'Instrument Serif'", "Georgia", "serif"],
        serifClassic: ["'Instrument Serif'", "Georgia", "serif"],
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
