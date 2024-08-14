/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary-dark": "#0077B6",
        "primary-light": "#0077B6",
        "secondary-dark": "#070412",
        "error-light": "#FEE2E2",
        "error-dark": "#AF5356",
      },
      borderColor: {
       "gray-250": "#DBD5E0",
      },
      width: {
        'alert-width': '37.5rem', 
      },
      fontFamily: {
        'thank-you': ['Caveat Brush', 'cursive'],
        'lato': ['Lato','Sans-serif']
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
