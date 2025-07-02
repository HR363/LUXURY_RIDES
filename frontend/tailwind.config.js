/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0A2540',
        accent: '#00C853',
        background: '#FFFFFF',
        lightgrey: '#F6F9FC',
        slate: '#334155',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        // 12-column grid
        '12': 'repeat(12, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
