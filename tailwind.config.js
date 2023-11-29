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
        lg: "10rem",
      },
    },
    extend: {},
  },
  plugins: [],
};
