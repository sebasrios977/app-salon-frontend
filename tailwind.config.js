const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
    "./formkit.theme.ts",
  ],
  theme: {
    extend: {
      colors: {
        "vtd-primary": colors.blue,
        "vtd-secondary": colors.gray,
      },
    },
  },
};