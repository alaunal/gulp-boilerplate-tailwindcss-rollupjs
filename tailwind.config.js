const plugin = require('tailwindcss/plugin');

const arg = (argList => {
  let arg = {},
      a, opt, thisOpt, curOpt;
  for (a = 0; a < argList.length; a++) {
      thisOpt = argList[a].trim();
      opt = thisOpt.replace(/^\-+/, '');
      if (opt === thisOpt) {
          if (curOpt) arg[curOpt] = opt;
          curOpt = null;
      } else {
          curOpt = opt;
          arg[curOpt] = true;
      }
  }
  return arg;
})(process.argv);

// -- Environment configuration.
const isProd = arg.production === true;

module.exports = {
  purge: {
    enabled: isProd ? true : false,
    content: ['./src/public/**/*.html', './src/assets/js/**/*.js']
  },
  future: {
    removeDeprecatedGapUtilities: false,
    purgeLayersByDefault: true,
    applyComplexClasses: true
  },
  theme: {
    screens: {
      sm: '640px', // -- mobile
      md: '768px', //-- tablet small
      lg: '992px', //-- tablet large
      xl: '1200px', //-- laptop
      xxl: '1600px', //-- desktop large
    },
    fontFamily: {
      display: ['Montserrat'],
      heading: ['Montserrat'],
      body: ['Work Sans']
    },
    extend: {},
  },
  corePlugins: {
    container: false, //-- disable default Tailwind container.
  },
  variants: {},
  plugins: [
    plugin(function({ addUtilities }) {
      const container = {
        '.container': {
          maxWidth: '100%',
          padding: '0 1.25rem',
          '@screen sm': {
            maxWidth: '100%',
            padding: '0 1.25rem',
          },
          '@screen md': {
            maxWidth: '688px',
            padding: '0',
          },
          '@screen lg': {
            maxWidth: '864px',
            padding: '0',
          },
          '@screen xl': {
            maxWidth: '1140px',
            padding: '0',
          },
          '@screen xxl': {
            maxWidth: '1350px',
            padding: '0',
          },
        }
      };

      addUtilities(container, ['responsive']);
    })
  ],
};
