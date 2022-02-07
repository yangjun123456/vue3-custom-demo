import { createApp } from 'vue';
// element-plus
import { setupElementPlus } from '@/plugins/element-plus';

// vue-i18n
// 多语言
import { setupI18n } from '@/plugins/vue-i18n';

// uuid
import { v4 as uuidv4, v3 as uuidv3 } from 'uuid';

// app根组件
import App from './App.vue';

// 路由
import router from '@/router/index';

// vuex
import store from '@/store/index';

// 全局组件
// svg icon图标公共组件
import IconSvg from '@/icons/IconSvg.vue';

// 引入icons/svg 图片
import '@/icons/index'; // 组件内需声明，不然this上找不到
// 全局引入的两种方法，在bar-echarts/index.vue 文件中应用---end
// config 配置-----------------------------------------------------------------------------------------------------------------------------------------end
import 'element-plus/dist/index.css'

// 初始化app
const app = createApp(App);

// 注册公共组件
app.component('svg-icon', IconSvg); // 注册全局组件svg-icon

console.info(app.version);

// config 配置---------------------------------------------------------------------------------------------------------------------------------------start
app.config.performance = true;

app.config.compilerOptions.isCustomElement = (tag) =>
    tag.startsWith('defined-custom-');

// 全局引入的两种方法，在bar-echarts/index.vue 文件中应用---start
app.provide('$getUuidv4', uuidv4); // 组件内需使用inject 引入
app.config.globalProperties.$uuid = uuidv4;
app.provide('$getUuidv3', uuidv3); // 组件内需使用inject 引入
app.config.globalProperties.$uuidv3 = uuidv3;
// app.use 应用
setupElementPlus(app);
setupI18n(app);
app.use(store).use(router).mount('#app');

// setTimeout(() => app.unmount(), 5000) // 卸载根组件，从html中移除app
