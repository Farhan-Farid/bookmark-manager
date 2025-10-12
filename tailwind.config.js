/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./*.html",                // root-level html
    "./html-pages/**/*.html",  // html inside folder
  ],
  theme: {
    extend: {
      colors: {
        brandBlue: "#1e40af",
        softPink: "#f472b6",
        darkBg: "#0f172a",
      },
    },
  },
  darkMode: "class",
  plugins: [],
}
