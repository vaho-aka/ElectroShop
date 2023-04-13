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
      },
      animation: {
        'slide-down': 'slide-down 300ms ease-out forwards',
      },
    },
  },
  plugins: [],
};
