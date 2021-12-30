import { createApp } from 'vue';
import ElementPlus from '@/plugins/element-plus';
import { v4 as uuidv4 } from 'uuid';
import App from './App.vue';
import router from '@/router/index';
import store from '@/store/index';

const app = createApp(App);

app.config.globalProperties = {
  // element-plus 全局配置
  $ELEMENT: {}
};

// 全局引入的两种方法，在bar-echarts/index.vue 文件中应用---start
app.provide('$getUuidv4', uuidv4); // 组件内需使用inject 引入
app.config.globalProperties.$uuid = uuidv4; // 组件内需声明，不然this上找不到
// 全局引入的两种方法，在bar-echarts/index.vue 文件中应用---end

app.use(ElementPlus);
app.use(store).use(router).mount('#app');
