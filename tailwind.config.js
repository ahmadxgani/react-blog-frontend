/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require("daisyui")
  ],
  daisyui: {
    themes: [{light: {
      ...require("daisyui/src/colors/themes")["[data-theme=light]"],
      "base-100": "#E6E5F3",
    }}, "dark"],
  }
}
