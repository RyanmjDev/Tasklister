const scrollbar = require('tailwind-scrollbar');

module.exports = {
  purge: ['./src/**/*.ts', './src/**/*.tsx', './index.html'],
  theme: {
    extend: {
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [scrollbar()],
}
