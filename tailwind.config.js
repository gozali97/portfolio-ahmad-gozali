/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      fontFamily: {
          primary: "Montserrat",
          secondary: "Orbitron",
      },
      extend: {
          colors: {
              primary: "#052f98",
              secondary: "#0a7fb7",
              third: "#e1b932",
              fourth: "#f6c726",
          },
      },
  },
  plugins: [],
}
