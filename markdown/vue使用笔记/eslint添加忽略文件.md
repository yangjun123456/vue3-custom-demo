1. 在文件顶部添加 `/*eslint-disable*/`, 禁止检查整个文件
2. 创建 `.eslintignore` 文件, 添加忽略的文件
3. 禁止下一行的eslint`// eslint-disable-next-line`, 需要写在报错行的上边一行
4. 禁止当前行的eslint `// eslint-disable-line`, 需要写在报错行的最后边
5. 禁止多行的eslint `/* eslint-disable */` `/* eslint-enable*/`, 前边的是开始行， 后边的是结束行