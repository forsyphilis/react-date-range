const webpack             = require('webpack');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const UglifyJsPlugin      = webpack.optimize.UglifyJsPlugin;
const path                = require('path');
const DefinePlugin        = webpack.DefinePlugin;
const WebpackDevServer    = require("webpack-dev-server");
const NODE_ENV            = process.env.NODE_ENV || 'production';

const config = {
  entry: {
    main: [path.join(__dirname, '/src/main.js')]
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
            title             : '',
            template          : path.join(__dirname, '/src/index.html'),
            inject            : true,
            filename          : 'index.html'
        }),
        ],
  module: {
    rules: [
          { test: /\.js$/,
              use: {
                  loader: 'babel-loader',
              },
              include: [path.join(__dirname, '../../../src'), path.join(__dirname, '/src')],
              exclude: /node_modules/
          },
          { test: /\.s?css$/,
              use: [
                  {loader: 'style-loader'},
                  {loader: 'css-loader'},
              ]
          }
      ]
  }
};

const compiler = webpack(config);

if (NODE_ENV === 'development') {
  const server = new WebpackDevServer(compiler, {
    contentBase : path.join(__dirname, 'dist'),
    noInfo: false,
    quiet: false,
    lazy: false,
    publicPath: '/',
    stats: {
      colors: true,
      chunks: false
    }
  });

  server.listen(3000, 'localhost', function(){
    console.log('Webpack Dev Server is listening on port 3000');
  });
} else if (NODE_ENV === 'production') {
  compiler.run(function (err, stats) {
    if (err) throw err;

    console.log(stats.toString({
      colors : true,
      chunks : false
    }));
  });
}
