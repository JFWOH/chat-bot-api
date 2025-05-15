// postcss.config.js CORRIGIDO
export default {
  plugins: {
    '@tailwindcss/postcss': {}, // <--- Correção aqui!
    autoprefixer: {},
    // Outros plugins PostCSS que você possa ter
  },
};