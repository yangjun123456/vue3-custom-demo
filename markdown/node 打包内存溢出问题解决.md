#### 关于node项目打包内存溢出JS stacktrace
`58003 ms: Mark-sweep 1350.6 (1434.6) -> 1350.5 (1434.6) MB, 753.0 / 0.0 ms [allocation failure] [GC in old space requested].`

解决办法一
> 设置node变量使用最大内存为自己需要的
```
# linux & mac下面
export NODE_OPTIONS=--max_old_space_size=8096

# windows 下面
set NODE_OPTIONS=--max_old_space_size=8096

# 使用cross-env解决mac 与 windows 的差异
npm install --save-dev cross-env # 安装

cross-env NODE_OPTIONS=--max_old_space_size=8096

cross-env NODE_OPTIONS=--max_old_space_size=8096 npm run build
```

解决方法二
>  通过package.json加大内存，在启动node
`node --max-old-space-size=8192 node_modules/rollup/bin/rollup -c rollup-config.js`
