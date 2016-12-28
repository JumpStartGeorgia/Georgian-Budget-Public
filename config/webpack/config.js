require('dotenv').config()
const autoprefixer = require('autoprefixer')

const paths = require('config/paths')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  require('./isomorphic-tools.config.js')
)

module.exports = env => {
  if (env.dev) webpack_isomorphic_tools_plugin = webpack_isomorphic_tools_plugin.development()

  const rules = [
    {
      test: /\.jsx?$/,
      use: 'babel-loader'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: env.prod ? 'css-loader?minimize!' : 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    },
    {
      test: /\.svg$/,
      use: 'svg-inline-loader'
    },
    {
      test: /\.ttf$/,
      use: 'url-loader?limit=10000'
    }
  ]

  if (env.dev) {
    rules.push({
      test: /\.jsx?$/,
      enforce: 'pre',
      use: 'eslint-loader',
      exclude: /node_modules/
    })
  }

  const plugins = [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL)
    }),
    new ExtractTextPlugin('bundle.css'),
    webpack_isomorphic_tools_plugin
  ]

  if (env.prod) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: true
    }))
  }

  plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [ autoprefixer({ browsers: [ '> 1%' ]}) ]
    }
  }))

  const config = {
    context: paths.ROOT,
    entry: 'src/browser.jsx',
    output: {
      pathinfo: env.dev,
      path: paths.BUNDLES,
      filename: env.prod ? 'bundle.min.js' : 'bundle.js'
    },
    devtool: env.dev ? 'eval' : 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.svg'],
      modules: [ paths.ROOT, 'node_modules' ]
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    module: {
      rules: rules
    },
    plugins: plugins
  }

  if (env.debug) {
    console.log(config)
    debugger
  }

  return config
}
