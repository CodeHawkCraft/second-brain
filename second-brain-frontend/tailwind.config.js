/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:{
          500:'#2563eb'
        },
        secondary:{
          500:'#EAEAEA'
        },


      }
    },
  },
  plugins: [],
}

