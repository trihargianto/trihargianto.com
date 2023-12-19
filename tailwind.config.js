/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./src/styles/global.css`,
    `./src/pages/**/*.{js,jsx,ts,tsx}`,
    `./src/components-v2/**/*.{js,jsx,ts,tsx}`,
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        lg: "2rem",
        xl: "10rem",
        "2xl": "20rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
