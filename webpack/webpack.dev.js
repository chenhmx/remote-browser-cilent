// const webpack = require('webpack')
const path = require('path')
const { merge } = require('webpack-merge')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
const portfinder = require('portfinder')
const common = require('./webpack.common.js')
const devProxy = require('./dev.proxy')
// const DashboardPlugin = require('webpack-dashboard/plugin')

// const SpeedMeasurePlugin = require('speed-measure-webpack-plugin')
// const smp = new SpeedMeasurePlugin()

const devWebpackConfig = merge(common, {
  mode: 'development',
  // devtool: 'source-map',
  devtool: 'eval-cheap-module-source-map',
  // experiments: {
  //   asyncWebAssembly: true,
  //   buildHttp: true,
  //   layers: true,
  //   lazyCompilation: true,
  //   outputModule: true,
  //   syncWebAssembly: true,
  //   topLevelAwait: true,
  // },
  // 开发环境使用内存缓存
  cache: { type: 'memory' },
  devServer: {
    // disableHostCheck: true,
    allowedHosts: 'all',
    historyApiFallback: {
      rewrites: [
        {
          from: /.*/g,
          to: '/mobile.html',
        },
      ],
    },
    client: {
      logging: 'error',
      progress: true,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    static: {
      directory: path.join(__dirname, '../public'),
    },
    compress: true,
    open: ['/mobile.html'],
    // server: 'spdy',
    // server: 'https',
    hot: true,
    // liveReload: false,
    proxy: devProxy,
  },
  // watch: true,
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
    ignored: /node_modules/,
  },
  module: {
    rules: [
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [require.resolve('react-refresh/babel')].filter(Boolean),
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ReactRefreshWebpackPlugin({
      overlay: false,
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new DashboardPlugin()
  ].filter(Boolean),
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
    minimize: false,
    concatenateModules: false,
    usedExports: false,
  },
})

// module.exports = smp.wrap(devWebpackConfig)
// module.exports = devWebpackConfig

module.exports = new Promise((resolve, reject) => {
  // @funboxteam/free-port-finder
  // detect-port
  portfinder.getPort(
    {
      port: 8080, // 默认8080端口，若被占用，重复+1，直到找到可用端口或到stopPort才停止
      stopPort: 65535, // maximum port
    },
    (err, port) => {
      if (err) {
        reject(err)
        return
      }
      devWebpackConfig.devServer.port = port
      resolve(devWebpackConfig)
    }
  )
})
