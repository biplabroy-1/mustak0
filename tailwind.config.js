/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/index.html",
    "./src/payment.html",
    "./src/**/*.{js,ts,html,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['Poppins'],
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.hide-scrollbar': {
          /* For Firefox */
          'scrollbar-width': 'none',
          /* For Chrome, Safari, and Opera */
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        },
      })
    },
  ],
}