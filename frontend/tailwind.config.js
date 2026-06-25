/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F6F2E3",
        ink: "#20301F",
        skin: {
          DEFAULT: "#355E3B",
          dark: "#243F28",
          light: "#4C7A52",
        },
        flesh: {
          DEFAULT: "#9CAF45",
          light: "#C3D27A",
        },
        seed: "#5B3A29",
        line: "#D8CFB0",
      },
      fontFamily: {
        display: ["Fraunces", "serif"],
        body: ["Work Sans", "sans-serif"],
        mono: ["IBM Plex Mono", "monospace"],
      },
      boxShadow: {
        soft: "0 8px 24px -8px rgba(32, 48, 31, 0.25)",
      },
    },
  },
  plugins: [],
};
