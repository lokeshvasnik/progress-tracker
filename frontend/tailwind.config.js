/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',   // ⬅️ put this at the root level, not inside theme
  theme: {
    extend: {
      colors: {
        primary: '#1e40af',
        secondary: '#9333ea',
        accent: '#f59e0b',
      },
      spacing: {
        '72': '18rem',
        '84': '21rem',
      },
      fontFamily: {
        display: ['Oswald', 'sans-serif'],
        body: ['"Open Sans"', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
