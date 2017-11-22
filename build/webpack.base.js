let webpack = require('webpack')
let path = require('path')
let scssLoaders = [
    { loader: 'vue-style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader', options: { sourceMap: true } }
]
let sassLoaders = [
    { loader: 'vue-style-loader' },
    { loader: 'css-loader' },
    { loader: 'sass-loader', options: { indentedSyntax: true } }
]

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  module: {
    rules: [ {
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      enforce: 'pre',
      include: [resolve('src'), resolve('example')],
      options: {
        formatter: require('eslint-friendly-formatter')
      }
    },
    {
      test: /\.vue/,
      loader: 'vue-loader',
      options: {
        loaders: {
          scss: scssLoaders,
          sass: sassLoaders
        }
      }
    },
    {
      test: /\.(scss|sass)/,
      loader: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader', options: { sourceMap: true } }
      ]
    },
    {
      test: /\.(js|es6)/,
      loader: 'babel-loader',
      exclude: resolve('node_modules'),
      options: {
        cacheDirectory: true
      }
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.(gif|jpg|png)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        outputPath: 'image/',
        publicPath: './image/',
        name: '[name].[ext]?[hash]'
      }
    },
    {
      test: /\.(woff|svg|eot|ttf|otf)\??.*$/,
      loader: 'url-loader',
      options: {
        limit: 1000,
        outputPath: 'font/',
        publicPath: './font/',
        name: '[name].[ext]?[hash]'
      }
    },
            { test: /\.(html|tpl)$/, loader: 'html-loader' }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue': 'vue/dist/vue.esm.js'
    }
  }
}
