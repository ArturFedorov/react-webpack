const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env ,argv) => {
  process.env.NODE_ENV = argv.mode;
  const isDevelopment = argv.mode === 'development';

  return {
    mode: argv.mode,
    context: path.resolve(__dirname,  'src'),
    entry: {
      main: './index.js',
      analytics: './analytics.js'
    },
    output: {
      filename: '[name].[contenthash].js',
      path: path.resolve(__dirname, 'build')
    },
    resolve: {
      extensions: ['.js', '.jsx', '.scss'],
      alias: {
        '@models': path.resolve(__dirname, 'srs/models'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            'style-loader', 'css-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'public/static/media/[name].[hash:8].[ext]'
              }
            }
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'react-webpack',
        inject: 'body',
        template: path.resolve(__dirname, 'public/index.html')
      }),
      new CleanWebpackPlugin({
        verbose: true
      })
    ]
  }
}
