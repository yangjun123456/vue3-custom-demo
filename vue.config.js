const path = require('path');
function resolve(dir) {
  return path.join(__dirname, dir);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  productionSourceMap: false,
  runtimeCompiler: true, // 更换编译模式
  devServer: {
    hot: true, // 自动保存
    open: true // 自动启动
  },
  //   output: {
  //     path: 'dist',
  //     filename: 'js/[name]--1.js',
  //     publicPath: '/',
  //     chunkFilename: 'js/[name]--1.js'
  //   },
  chainWebpack: (config) => {
    console.log(config.values());
    const oneOfsMap = config.module.rule('scss').oneOfs.store;
    oneOfsMap.forEach((item) => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          // 要公用的scss的路径
          resources: ['./src/assets/style/public.scss']
        })
        .end();
    });
    config.resolve.alias.set('assets', resolve('src/assets'));

    // 清除已有的loader, 如果不这样做会添加在此loader之后
    config.module.rule('svg').uses.clear().end();
    // 则匹配排除node_modules目录
    config.module
      .rule('svg')
      .exclude.add(/node_modules/)
      .end();
    // 添加svg新的loader处理
    config.module
      .rule('svg')
      .test(/\.svg$/)
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end();

    config.module
      .rule('thread-loader')
      .test(/\.js$/)
      .use('thread-loader')
      .loader('thread-loader')
      .tap((options) => {
        return {
          workers: 4 // 进程4个
        };
      })
      .end();
    // config.devServer.port('2849');
    config.merge({
      devServer: {
        port: '3049'
      }
    });

    config.plugin('html').tap((options) => {
      options[0].title = 'modify html title';
      return options;
    });

    // config.output.filename('js/[name].[hash]-1.js').chunkFilename('js/[name].[hash]-1.js').end(); // 开发环境打包hash

    // config
    //   .plugin('webpack-bundle-analyzer')
    //   .use(BundleAnalyzerPlugin)
  },

  configureWebpack: (config) => {
    // console.log(config);
    config.optimization = {
      splitChunks: {
        chunks: 'all'
      }
    };
    config.optimization = {
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          // 公用模块抽离
          common: {
            chunks: 'all',
            minSize: 0, // 大于0个字节
            minChunks: 1 // 抽离公共代码时，这个代码块最小被引用的次数
          },
          // 第三方库抽离
          echarts: {
            priority: 10, // 权重
            test: /echarts/,
            chunks: 'all',
            minSize: 0, // 大于0个字节
            minChunks: 1 // 在分割之前，这个代码块最小应该被引用的次数
          },
          lodash: {
            priority: 10, // 权重
            test: /lodash/,
            chunks: 'all',
            minSize: 0, // 大于0个字节
            minChunks: 1 // 在分割之前，这个代码块最小应该被引用的次数
          },
          rxjs: {
            priority: 10, // 权重
            test: /rxjs/,
            chunks: 'all',
            minSize: 0, // 大于0个字节
            minChunks: 1 // 在分割之前，这个代码块最小应该被引用的次数
          },
          vendor: {
            priority: 10, // 权重
            test: /node_modules/,
            chunks: 'all',
            minSize: 0, // 大于0个字节
            minChunks: 1 // 在分割之前，这个代码块最小应该被引用的次数
          }
        }
      }
    };
  },

  lintOnSave: false
};
