/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./utils/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      transitionDuration: {
        0: "0ms",
        1500: "1500ms",
        2000: "2000ms",
        3000: "3000ms",
        5000: "5000ms",
      },
    },
  },
  plugins: [],
};
