const path = require('path');

module.exports = {
  debug: false,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'es']
  },
  localePath: path.resolve('./src/locales'),
  reloadOnPrerender: process.env.NODE_ENV === 'development'
};
