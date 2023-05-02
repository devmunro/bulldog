/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    colors: {
      primary: '#4F46E5',
      secondary: '#BFDBFE',
      tertiary: '#111827',
      black: '#000',
      white: '#fff',
    },
    extend: {

      fontFamily: {
        'raleway': ['Raleway', 'sans-serif'],
        'roboto': ['Roboto', 'sans-serif'],
      },
      

      textColor: (theme) => ({
        'primary': theme('colors.primary'),
        'secondary': theme('colors.secondary'),
        'tertiary': theme('colors.tertiary'),
      }),
     
    },
  },
  plugins: [],
};
