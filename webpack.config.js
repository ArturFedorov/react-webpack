const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


module.exports = (env ,argv) => {
  process.env.NODE_ENV = argv.mode;
  const isDevelopment = argv.mode === 'development';
  const isProduction = argv.mode === 'production';

  const cssLoaders = (extra) => {
    const loaders = [
      {
        loader: isDevelopment ? 'style-loader' : MiniCssExtractPlugin.loader
      },
      {
        loader: 'css-loader',
        options: {
          sourceMap: isDevelopment
        }
      }
    ];

    if(extra) {
      loaders.push(extra);
    }

    return loaders;
  }

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
      extensions: ['.js', '.scss'],
      alias: {
        '@models': path.resolve(__dirname, '/shared/models'),
        '@': path.resolve(__dirname, 'src')
      }
    },
    module: {
      rules: [
        {
          test: /\.s(a|c)ss$/,
          use: cssLoaders({
            loader: 'sass-loader',
            options: {
              sourceMap: isDevelopment
            }
          })
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'media/[name].[hash:8].[ext]'
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
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        }
      ]
    },
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimize: isProduction,
      minimizer: [
        new CssMinimizerPlugin({
          parallel: true
        }),
        new TerserPlugin({
          parallel: true
        })
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'react-webpack',
        inject: 'body',
        template: path.resolve(__dirname, 'public/index.html'),
        minify: {
          collapseWhitespace: isProduction
        }
      }),
      new CleanWebpackPlugin({
        verbose: true
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, 'public/favicon.ico'),
            to: path.resolve(__dirname, 'build')
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: isDevelopment ? '[name].css' : '[name].[hash].css',
        chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css'
      })
    ],
    devServer: {
      port: 5000,
      hot: isDevelopment
    }
  }
}
