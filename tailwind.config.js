module.exports = {
  content: ['./components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
    },
    extend: {
      fontSize: {
        h1: ['48px'],
        h2: ['40px'],
        h3: ['32px'],
        h4: ['28px'],
        h5: ['24px'],
        h6: ['20px'],
      },
      colors: {
        primary: '#67ad54',
        secondary: '#29415b',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
