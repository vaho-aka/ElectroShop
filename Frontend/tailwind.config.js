/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: true,
  theme: {
    extend: {
      keyframes: {
        'slide-down': {
          '0%': { opacity: 0, transform: 'translateY(-3rem)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        'slide-up': {
          '100%': { opacity: 1, transform: 'translateY(0)' },
          '0%': { opacity: 0, transform: 'translateY(-3rem)' },
        },
      },
      animation: {
        'slide-down': 'slide-down 250ms ease-in forwards',
        'slide-up': 'slide-up 100ms ease forwards',
      },
    },
  },
  plugins: [],
};
