
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HappyPack = require('happypack');
var os = require('os');
var worker = Math.floor(os.cpus().length / 2) + 1;
var happyThreadPool = HappyPack.ThreadPool({
  size: worker
});
var ExtractTextPlugin = require('extract-text-webpack-plugin');

const path = require('path');
var publicPath = path.join(__dirname, "build")

module.exports = {
  mode: "development",
  devtool: 'inline-source-map',
  entry: [path.join(__dirname, "src", "index.js")],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    chunkFilename: '[id].js?[chunkhash]',
    publicPath: '/'
  },
  module: {
    rules: [{
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: [/\.module\.less$/, /\.less$/],
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },
       {
         test: /\.(sass|scss)$/,
         use: ['style-loader', 'css-loader', 'sass-loader']
       },
      {
        test: /\.(pdf|xlsx|png|PNG|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000
          }
        }]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    }),
  ],
  devServer: {
    host: "127.0.0.1",
    port: 6004,
    open: false,
    historyApiFallback: true,
    proxy: {
      '/api/': {
        target: 'http://localhost:6004',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
