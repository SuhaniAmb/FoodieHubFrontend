// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // ✅ supports JS, TS, JSX, and TSX
  ],
  theme: {
    extend: {
      fontFamily:{
        quicksand:['Quicksand','sans-serif'],
      },
    },
  },
  plugins: [
  require('tailwind-scrollbar-hide')

],
}
