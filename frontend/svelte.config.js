const sveltePreprocess = require('svelte-preprocess');

const production = process.env.NODE_WATCH === 'production';

const preprocess = sveltePreprocess({
  defaults: {
    script: 'typescript'
  },
  typescript: {
    tsconfigFile: './tsconfig.json'
  },
  postcss: {
    plugins: [require('tailwindcss'), require('autoprefixer')]
  }
});

module.exports = {
  dev: !production,
  preprocess
};
