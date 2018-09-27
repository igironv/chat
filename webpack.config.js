const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

let prod = {
  mode: 'production',
  entry: {
    home: path.resolve(__dirname, 'src/pages/home.js')
  },
  performance: {
    hints: false
  },
  output: {
    path: path.resolve(__dirname, 'app/static'),
    filename: 'js/[name].js'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              'loader': 'css-loader',
              options: {
                minimize: true
              }
            },
            {
              'loader': 'sass-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            limit: 100,
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('css/[name].css'),
    new MiniCssExtractPlugin({})
  ]
}

let dev = {
  mode: 'development',
  entry: {
    home: path.resolve(__dirname, 'src/pages/home.js')
  },
  output: {
    path: path.resolve(__dirname, 'app/static'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader'
        },
        exclude: /node_modules/
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/'
          }
        }]
      }
    ]
  }
}

module.exports = (env, argv) => {
  let config = {}
  switch (argv.mode) {
    case 'production':
      config = prod
      break
    default:
      config = dev
  }
  return config
}
