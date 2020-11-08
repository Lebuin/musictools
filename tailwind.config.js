module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Poppins',
          'sans-serif'
        ],
      },
      fontSize: {
        sm:   '1.2rem',
        base: '1.55rem',
        lg:   '1.70rem',
        xl:   '1.85rem',
      },
      colors: {
        black: '#303336',
        gray: {},
        grey: {
          100: '#F6F7F7',
          200: '#E8EAEC',
          300: '#D9DDE1',
          400: '#BDC4CA',
          500: '#A1AAB3',
          600: '#9199A1',
          700: '#61666B',
          800: '#484D51',
          900: '#303336',
        },
        translucent: {
          100: '#FFFFFF1A',
          200: '#FFFFFF33',
          300: '#FFFFFF4D',
          400: '#FFFFFF66',
          500: '#FFFFFF80',
          600: '#FFFFFF99',
          700: '#FFFFFFB3',
          800: '#FFFFFFCC',
          900: '#FFFFFFE6',
        },
      },
      spacing: {
        '-0':  '-0',
        '-1':  '-0.25rem',
        '-2':  '-0.5rem',
        '-3':  '-0.75rem',
        '-4':  '-1rem',
        '-5':  '-1.25rem',
        '-6':  '-1.5rem',
        '-8':  '-2rem',
        '-10': '-2.5rem',
        '-12': '-3rem',
        '-16': '-4rem',
        '-20': '-5rem',
        '-24': '-6rem',
        '-32': '-8rem',
        '-40': '-10rem',
        '-48': '-12rem',
        '-56': '-14rem',
        '-64': '-16rem',
      }
    },
  },
  variants: {},
  plugins: [],
}
