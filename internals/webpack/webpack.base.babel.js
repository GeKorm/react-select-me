const path = require('path');
const webpack = require('webpack');

const cssnext = require('postcss-cssnext');
const postcssReporter = require('postcss-reporter');

module.exports = options => ({
  entry: options.entry,
  output: Object.assign(
    {
      path: path.resolve(process.cwd(), 'build'),
      publicPath: '/',
    },
    options.output
  ),
  module: {
    loaders: [
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: options.babelQuery,
      },
      {
        test: /\.css$/,
        include: /src/,
        loader: options.cssLoaders,
      },
      {
        test: /\.css$/,
        include: /lib/,
        loader: 'style-loader!css-loader',
      },
    ],
  },
  plugins: options.plugins.concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),

    new webpack.LoaderOptionsPlugin({
      test: /\.css$/,
      options: {
        // Process the CSS with PostCSS
        context: __dirname,
        postcss: [cssnext({ browsers: ['last 2 versions', 'IE > 10'] }), postcssReporter({ clearMessages: true })],
      },
    }),
  ]),
  resolve: {
    modules: ['src/demo', 'node_modules'],
    extensions: ['.js'],
    mainFields: ['jsnext:main', 'main'],
  },
  devtool: options.devtool,
  target: 'web',
  stats: false,
});
