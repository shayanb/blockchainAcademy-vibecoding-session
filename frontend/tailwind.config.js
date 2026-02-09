/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bc-dark': '#1E1033',
        'bc-card': '#2D1B4E',
        'bc-primary': '#6B21A8',
        'bc-primary-light': '#A855F7',
        'bc-accent': '#DC2626',
        'bc-accent-hover': '#B91C1C',
        'bc-text': '#F3E8FF',
        'bc-text-muted': '#C4B5FD',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
