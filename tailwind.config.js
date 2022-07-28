/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        arrow: "url('./src/assets/images/arrow.svg')",
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
