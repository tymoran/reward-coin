// module.exports = {
//   content: ['./src/**/*.{svelte,js,ts}'],

//   theme: {},
//   variants: {},
//   plugins: []
// };

const forms = require('@tailwindcss/forms');

module.exports = {
  mode: 'jit',
  content: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,svelte}'],
  safelist: [{ pattern: /^[a-zA-Z]/ }],
  plugins: [forms]
};
