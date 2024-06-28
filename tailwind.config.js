/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-bg-primary": "#121212",
        "dark-bg-secondary": "#1F1B24",
      },
    },
  },
  darkMode: "class",
  plugins: [],
};
