export default {
  map: false,
  plugins: {
    // tailwindcss: {}, // tailwindcss@3
    '@tailwindcss/postcss': {}, // tailwindcss@4
    'postcss-preset-env': {},
    /* 'postcss-modules': {} */

    // 仅在环境变量 ENABLE_MODULES=true 时启用
    ...(process.env.ENABLE_MODULES === 'true' && {
      'postcss-modules': {}
    })
  }
}