#### svg-sprite-loader 将 svg 图片（在编辑器中以代码的形式展现） 通过自定义icon组件渲染成为svg icon图 -------实现自己的icon组件 ----- 类似于iconfont的使用

1. 下载安装`svg-sprite-loader`
2. 创建icons文件夹
  - 2.1 创建src/icons文件夹
  - 2.2 创建src/icons/svg文件夹 存放 svg 图片
  - 2.3 开发组件src/icons/iconSvg.vue 组件
  - 2.4 开发src/icons/index.ts 生成配置文件 导出所有svg文件
3. vue.config.js 中进行配置
```
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
```
4. 使用方式在 iconsvg-test.vue 文件 使用了多种不同的引入方式测试
