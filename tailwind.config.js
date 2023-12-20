/** @type {import('tailwindcss').Config} */
module.exports = {
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
        "2xl": "16rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
