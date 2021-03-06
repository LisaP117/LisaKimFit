/* eslint-disable max-len */
/* eslint-disable complexity */
const globAll = require('glob-all').sync;
const path = require('path');
const webpack = require('webpack');
const ManifestPlugin = require('webpack-assets-manifest');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const purgeFromJs = (content) => content.match(/[A-Za-z0-9-_:\/]+/g) || [];

function Bundle() {
  const plugin = require('./_config/plugins.json');
  const prod = process.env.NODE_ENV === 'production';
  const purgePath = path.resolve(__dirname, 'src')

  const alias = {
    Src: path.resolve(__dirname, 'src')
  };

  const plugins = [
    new ManifestPlugin({
      output: path.join(__dirname, 'src', 'cache-manifest.json')
    }),
    new MiniCssExtractPlugin({
      filename: 'css/main.css?cb=[chunkhash]',
      chunkFilename: 'main.css?cb=[contenthash]'
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(__dirname, 'src', 'site', '_includes', '_partials', 'scripts.njk'),
      template: path.resolve(__dirname, '_templates', 'scripts.njk'),
      chunks: ['common']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(__dirname, 'src', 'site', '_includes', '_partials', 'preload-styles.njk'),
      template: path.resolve(__dirname, '_templates', 'preload-styles.njk'),
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      inject: false,
      filename: path.resolve(__dirname, 'src', 'site', '_includes', '_partials', 'styles.njk'),
      template: path.resolve(__dirname, '_templates', 'styles.njk')
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true
    })
    // new BundleAnalyzerPlugin()
  ];

   if (prod) {
    plugins.push(
      new PurgecssPlugin({
        paths: globAll([
          `${purgePath}/site/**/*.njk`,
          `${purgePath}/scripts/**/*.ts`,
          `${purgePath}/functions/*.js`
        ]),
        extractors: [
          {
            extractor: purgeFromJs,
            extensions: ['njk']
          }
        ]
      })
    )
  }

  return {
    cache: false,

    devtool: !prod ? 'source-map' : 'eval',

    entry: {
      common: path.resolve(__dirname, 'src/scripts/main.ts'),
      main: path.resolve(__dirname, 'src/styles/main.scss'),
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'css/[name].bundle.js?cb=[chunkhash]',
      chunkFilename: 'css/[id].chunk.js?cb=[chunkhash]',
      publicPath: '/'
    },

    mode: prod ? 'production' : 'development',

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                publicPath: '/'
              }
            },
            {
              loader: 'css-loader?-url',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: () => [
                    require('postcss-sort-media-queries'),
                    require('postcss-minify-selectors'),
                    require('postcss-clean')(plugin.cleancss),
                    require('autoprefixer'),
                    require('cssnano')(plugin.cssnano)
                  ]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
      ]
    },

    optimization: {
      minimizer: prod ? [new TerserPlugin(plugin.uglify)] : [new TerserPlugin({
        terserOptions: {
          minimize: false,
          warnings: false,
          mangle: false
        }
      })]
    },

    plugins,

    resolve: {
      alias,
      extensions: ['.ts', '.js']
    },

    watch: prod ? false : true
  };
}

module.exports = Bundle();
