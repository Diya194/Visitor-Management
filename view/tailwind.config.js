const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'cyan': colors.cyan,
        'teal': colors.teal
      },
      width:{
        '128': '55rem'
      }
    },
  },
  plugins: [],
}

