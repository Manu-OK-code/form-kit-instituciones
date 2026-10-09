/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    '../src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: '#30A5E9',
        navy: '#0A3A5F',
        canvas: '#F9FAFB',
        ink: '#333333',
      },
    },
  },
  plugins: [],
};
