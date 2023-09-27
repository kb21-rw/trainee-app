/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#0077B6",
        "secondary-dark": "#070412",
      },
    },
  },
  plugins: [],
};