/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    `./src/styles/global.scss`,
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "2rem",
        xl: "10rem",
        "2xl": "18rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
