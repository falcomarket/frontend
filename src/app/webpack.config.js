const webpack = require('webpack');

module.exports = {
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
  ],
  resolve: {
    fallback: {
      'fs': false,
      'path': false,
      'os': false
    },
    alias: {
      'process': 'process/browser'
    },
  },
};
