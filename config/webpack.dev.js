const helpers = require('./helpers');
const webpackMerge = require('webpack-merge'); // used to merge webpack configs
const commonConfig = require('./webpack.common.js'); // the settings that are common to prod and dev

import webpack from 'webpack';

/**
 * Webpack Plugins
 */
const DefinePlugin = require('webpack/lib/DefinePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');

/**
 * Webpack Constants
 */
const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const HMR = helpers.hasProcessFlag('hot-server');
const METADATA = webpackMerge(commonConfig({
  env: ENV
}).metadata, {
  host: HOST,
  port: PORT,
  ENV: ENV,
  HMR: HMR
});

module.exports = function (options) {
  let config = webpackMerge(commonConfig({
    env: ENV
  }), {
    devtool: 'cheap-module-source-map',
    output: {
      path: helpers.root('src'),
      filename: '[name].bundle.js',
      sourceMapFilename: '[name].map',
      chunkFilename: '[id].chunk.js',
      publicPath: `http://localhost:${PORT}/`,
      library: 'ac_[name]',
      libraryTarget: 'var',
    },

    plugins: [
      new DefinePlugin({
        'ENV': JSON.stringify(METADATA.ENV),
        'HMR': METADATA.HMR,
        'process.env': {
          'ENV': JSON.stringify(METADATA.ENV),
          'NODE_ENV': JSON.stringify(METADATA.ENV),
          'HMR': METADATA.HMR,
        }
      }),


      new webpack.HotModuleReplacementPlugin(),
      new NamedModulesPlugin(),
      new LoaderOptionsPlugin({
        debug: true,
        options: {
          tslint: {
            emitErrors: false,
            failOnHint: false,
            resourcePath: 'src'
          },

        }
      }),
    ],
    // devServer: {
    //   port: METADATA.port,
    //   host: METADATA.host,
    //   historyApiFallback: true,
    //   watchOptions: {
    //     aggregateTimeout: 300,
    //     poll: 1000
    //   },
    //   outputPath: helpers.root('dist')
    // },

    externals: ['googleTranslateApi'],
    node: {
      global: true,
      crypto: 'empty',
      process: true,
      module: false,
      clearImmediate: false,
      setImmediate: false
    },

    target: 'electron-renderer'

  });
  config.entry.hmr = `webpack-hot-middleware/client?path=http://localhost:${PORT}/__webpack_hmr`,''
  return config;
}
