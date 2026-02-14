/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f172a", // Deep dark
        surface: "#1e293b",    // Lighter dark
        primary: "#6366f1",    // Indigo
        accent: "#10b981",     // Emerald
      }
    },
  },
  plugins: [],
}