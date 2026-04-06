/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'fridge-green': '#1B4332',
        'fridge-mid': '#2D6A4F',
        'fridge-light': '#FFFBF5',
        'fridge-cream': '#F4ECD8',
        'fridge-orange': '#E76F51',
        'fridge-gold': '#F4A261',
        'spice-red': '#C1121F',
        'spice-yellow': '#FFB703',
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'pulse-slow': 'pulse 3s infinite',
        'float': 'float 3s ease-in-out infinite',
        'score-fill': 'scoreFill 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        scoreFill: {
          '0%': { strokeDashoffset: '339' },
          '100%': { strokeDashoffset: 'var(--score-offset)' },
        },
      },
    },
  },
  plugins: [],
}