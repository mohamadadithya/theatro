module.exports = {
  content: ['./src/**/*.svelte', './src/**/*.css'],
  theme: {
    extend: {
      fontFamily: {
        'plus-jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
        'satisfy': ['Satisfy', 'cursive']
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide')
  ],
}
