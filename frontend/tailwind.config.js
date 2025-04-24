/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.example': {
          color: 'red',
        },
      });
    }),
  ],
};