<!-- 3种加密方式 -->
## aes 加密
1. 下载`crypto-js`依赖包
2. 详细方法在 `@/libs/utils.ts` 下的 `aesEncrypt` 方法
3. 调用方法在 `functions-test.ts` 文件

---


## sm4 加密
1. 下载`js-base64`依赖包
2. 在 `@/libs/utils.ts` 下引入文件 `@/libs/sm4-encrypt.js` 并声明名称 `declare const SM4:any;`
3. 详细方法在 `@/libs/utils.ts` 下的 `sm4Encrypt` 方法
4. 调用方法在 `functions-test.ts` 文件

---


## base64 加密
1. 下载`js-base64`依赖包
2. 调用方法在 `functions-test.ts` 文件, 直接调用js-base64中的encode和decode加密和解密方法

---