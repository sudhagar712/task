/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: "#4f46e5", // Indigo 600
        secondary: "#111827", // Gray 900
        background: "#f9fafb", // Gray 50
        border: "#e5e7eb", // Gray 200
        text: "#374151", // Gray 700
      },
    },
  },
  plugins: [],
}
