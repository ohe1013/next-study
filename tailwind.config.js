const px0_10 = { ...Array.from(Array(11)).map((_, i) => `${i}px`) }
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) }
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) }

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        body: 'calc(100vh - 2rem)',
      },
      colors: {
        primary: '#3b82f6',
      },
      screens: {
        xsm: '320px',
        m:'960px',
        "3xl" :'1600px'
      },
    },
  },
  plugins: [],
}
