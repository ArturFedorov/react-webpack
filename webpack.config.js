const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env ,argv) => {
  process.env.NODE_ENV = argv.mode;

  return {
    mode: argv.mode,
    entry: {
      main: './src/index.js',
      analytics: './src/analytics.js'
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build'),
      clean: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'react-webpack'
      })
    ]
  }
}
