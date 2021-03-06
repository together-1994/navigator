const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle_[chunkhash:8].js',
  },
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    inline: true,
    proxy: {
      '/api': 'http://one.qunhequnhe.com',
    },
    overlay: {
      errors: true,
      warning: true,
    },
    port: 8000,
  },
  resolve: {
    extensions: [' ', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)/,
        use: [{
          loader: 'babel-loader',
        }, {
          loader: 'eslint-loader',
        }],
        exclude: /node_modules/,
      },
      {
        test: /(\.css$)/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /(\.scss$)/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
          }, {
            loader: 'sass-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
        use: [{
          loader: 'url-loader',
        }, {
          loader: 'file-loader',
        }],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'app/index.tmpl.html'),
    }),
    new CopyWebpackPlugin([
      {
        from: 'public',
        to: 'public',
      },
    ]),
  ],
  devtool: 'eval-source-map',
  mode: 'development',
};
