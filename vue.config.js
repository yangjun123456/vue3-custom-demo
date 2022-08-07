const path = require('path');
function resolve(dir) {
    return path.join(__dirname, dir);
}
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const isProd = process.env.NODE_ENV === 'production';

const setPlugins = () => {
    const plugins = [];
    // 拷贝插件
    // plugins.push(
    //     new CopyWebpackPlugin([{ from: resolve('src/assets/font'), to: 'assets/font' }])
    // );
    // 压缩插件
    plugins.push();
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
        // 修改js输出目录
        config.output
            .filename('assets/js/[name].[hash].js')
            .chunkFilename('assets/js/[name].[hash].js')
            .end(); // 开发环境打包hash

        // 修改js输出目录
        // config.output
        //     .filename('js/[name].[hash]-1.js')
        //     .chunkFilename('js/[name].[hash]-1.js')
        //     .end(); // 开发环境打包hash
        console.log(isProd);
        if (isProd) {
            // 仅在打包的时候开启， 开发环境下开启无法运行项目
            // 修改css输出目录
            config.plugin('extract-css').tap(() => [
                {
                    filename: 'assets/css/[name].[contenthash:15].css',
                    chunkFilename: 'assets/css/[name].[contenthash:15].chunk.css',
                    ignoreOrder: true
                }
            ]);
        }

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
        // 设置别名
        config.resolve.alias
            .set('assets', resolve('src/assets'))
            .set('@', resolve('src'));

        // 修改图片输出目录
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
            .exclude.add(resolve('src/icons'))
            .end()
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .tap((options) => {
                const newOptions = {
                    name: 'assets/img/[name].[hash:8].[ext]',
                    fallback: {
                        options: {
                            name: 'assets/img/[name].[hash:8].[ext]',
                            esModule: false
                        }
                    }
                };
                return newOptions;
            });

        // 修改svg输出目录
        config.module
            .rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .exclude.add(resolve('src/icons'))
            .end()
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .tap((options) => ({
                name: 'assets/img/[name].[hash:8].[ext]'
            }));

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

        // 修改fonts输出目录
        config.module
            .rule('fonts')
            .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
            .use('url-loader')
            .loader('url-loader')
            .tap((options) => {
                console.log(options);
                options.limit = 1; // 字体包小于limit会打包成为base64引入到项目， 字体包大于limit会打包到assets/font目录下
                options.fallback.options.name = 'assets/font/[name].[hash:8].[ext]';
                return options;
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
                remUnit: 100, // 根据视觉稿， 1920px  100rem --------需要搭配viewport.js 中 refreshRem 方法中的19.2进行修改  1920/100=19.2 || 1920/80=24
                remPrecision: 8 // 换算的rem保留几位小数点
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
    css: {
        extract: true // true: 打包成为单独的css文件夹和css文件  false： 打包到js里边
    },

    lintOnSave: false
};
