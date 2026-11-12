/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1B6392",
          navy: "#0B5C96",
          sky: "#2DA5F3",
          orange: "#FA8232",
          "orange-hover": "#DE7328",
          dark: "#191C1F",
          gray: "#5F6C72",
          light: "#F2F4F5",
          border: "#E4E7E9",
          yellow: "#EBC80C",
        }
      }
    },
  },
  plugins: [],
}
