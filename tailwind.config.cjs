const scrollbar = require('tailwind-scrollbar');

module.exports = {
  purge: ['./src/**/*.js', './src/**/*.jsx', './index.html'],
  theme: {
    extend: {
      
    },
  },
  variants: {
    extend: {},
  },
  plugins: [scrollbar()],
}
