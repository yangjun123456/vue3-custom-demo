const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const setPlugins = () => {
    const plugins = [];
    return plugins;
};

module.exports = {
    productionSourceMap: false,
    runtimeCompiler: true, // 更换编译模式
    devServer: {
        hot: true, // 自动保存
        open: true, // 自动启动
        // https: false, // 是否开启 https
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://49.232.143.65:9007/',
                changeOrigin: true,
                secure: false, // 如果是https接口，需要配置这个参数
                // ws: true, //websocket支持
                rewrite: (_path) => _path.replace(/^\/api/, '')
            }
        }
    },

    // 项目部署的基础路径
    // 我们默认假设你的应用将会部署在域名的根部，
    // 比如 https://www.my-app.com/
    // 如果你的应用时部署在一个子路径下，那么你需要在这里
    // 指定子路径。比如，如果你的应用部署在
    // https://www.foobar.com/my-app/
    // 那么将这个值改为 `/my-app/`
    publicPath:
    process.env.NODE_ENV === 'development'
        ? './'
        : '/dist/' /* 这个是我存放在github在线预览的Reader项目*/,
    // 将构建好的文件输出到哪里（或者说将编译的文件）
    outputDir: 'dist',

    // 放置静态资源的地方 (js/css/img/font/...)
    assetsDir: 'assets',
    filenameHashing: true,

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

        // src/icons 下的svg图片不使用原有的loader
        config.module.rule('svg').exclude.add(resolve('src/icons')).end();

        // 给icons下的svg图片单独添加svg-sprite-loader
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end();

        // px2rem-loader ------- loader设置
        config.module
            .rule('scss')
            .oneOf('vue')
            .use('px2rem-loader')
            .loader('px2rem-loader')
            .before('postcss-loader') // this makes it work.
            .options({
                remUnit: 80, // 根据视觉稿，rem为px的 20分之一，1920px  80rem
                remPrecision: 8 // 换算的rem保留几位小数点
            })
            .end();

        config.output
            .filename('assets/js/[name].[hash].js')
            .chunkFilename('assets/js/[name].[hash].js')
            .end(); // 开发环境打包hash

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

        // config.output
        //   .filename('js/[name].[hash]-1.js')
        //   .chunkFilename('js/[name].[hash]-1.js')
        //   .end(); // 开发环境打包hash

    // config.plugin('webpack-bundle-analyzer').use(BundleAnalyzerPlugin);
    },

    configureWebpack: (config) => {
    // console.log(config);
    // config.optimization = {
    //   splitChunks: {
    //     chunks: 'all'
    //   }
    // };
        config.optimization = {
            runtimeChunk: 'single',
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    // 公用模块抽离
                    vendors: {
                        name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                        priority: 10,
                        chunks: 'initial'
                    },
                    iview: {
                        name: 'chunk-iview',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?iview(.*)/
                    },
                    echarts: {
                        name: 'chunk-echarts',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?echarts(.*)/
                    },
                    rxjs: {
                        name: 'chunk-rxjs',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?rxjs(.*)/
                    },
                    lodash: {
                        name: 'chunk-lodash',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?lodash(.*)/
                    },
                    elementPlus: {
                        name: 'chunk-element-plus',
                        priority: 20,
                        test: /[\\/]node_modules[\\/]_?element-plus(.*)/
                    },
                    commons: {
                        name: 'chunk-commons',
                        minChunks: 2,
                        priority: 5,
                        chunks: 'initial',
                        reuseExistingChunk: true
                    }
                }
            }
        };
        config.plugins = [...config.plugins, ...setPlugins()];
    },

    lintOnSave: false
};
