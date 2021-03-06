module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      sans: ['Nunito', 'system-ui', '-apple-system',"Segoe UI", 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'Liberation Sans', 'sans-serif']
    },
    container: {
      padding: '1rem',
      screens: {
         sm: "100%",
         md: "100%",
         lg: "1024px",
         xl: "1200px"
      }
    },
    minHeight: {
      '0': '0',
      '1/4': '25%',
      '1/2': '50%',
      '3/4': '75%',
      'full': '100%',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

