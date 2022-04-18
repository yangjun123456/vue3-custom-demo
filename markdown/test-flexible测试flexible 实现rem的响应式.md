### test-flexible测试flexible 实现rem的响应式   以下操作步骤仅针对当前demo

使用flexible 实现rem响应式实现步骤

1. 执行 `npm install lib-flexible px2rem-loader` 安装需要的包 
2. 开发 `utils/viewport.js` 文件 具体内容详见 `viewport.js` 文件
3. vue.config.js 配置文件配置 
```
  // px2rem-loader ------- loader设置
  config.module
    .rule('scss')
    .oneOf('vue')
    .use('px2rem-loader')
    .loader('px2rem-loader')
    .before('postcss-loader') // this makes it work.
    .options({
      remUnit: 192, // 根据视觉稿，rem为px的十分之一，1920px  192 rem
      remPrecision: 8 // 换算的rem保留几位小数点
    })
    .end();
```
4. main.ts 文件中引入文件
```
// flexible自适应设置文件--------------------------------------------------------------------------------start
// 引入自适应js文件
import 'lib-flexible/flexible.js';
import '@/utils/viewport.js';

// flexible自适应设置文件--------------------------------------------------------------------------------end
```

！最后说明一下，px 写法上会有些不同，可以参考 px2rem 官方介绍，下面简单介绍一下。
* 直接写 px，编译后会直接转化成 rem；
* 在 px 后面添加 /*no*/，不会转化 px，会原样输出；
* 在 px 后面添加 /*px*/，会根据 dpr 的不同，生成三套代码。
```
width: 100px; /*no*/
height: 100px; /*px*/
```


【注意】文件中修改了 refreshRem 方法的rem的计算方式

如果要取消使用----可注释掉 vue.config.js 中的 `px2rem-loader` 的引入

