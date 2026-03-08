/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        metroBlue: "#2563eb",
        metroGreen: "#16a34a",
        metroYellow: "#facc15",
        metroRed: "#dc2626",
        metroGray: "#1f2937"
      }
    },
  },
  plugins: [],
}