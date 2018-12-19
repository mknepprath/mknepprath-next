module.exports = {
  plugins: {
    'postcss-normalize': {},
    'postcss-preset-env': {
      'stage': 3,
      'features': {
        'nesting-rules': true
      }
    }
  },
  map: true
}
