import { createApp } from 'vue';
import { setPlugins } from '@/plugins';

// 路由
import router from '@/router/index';

// vuex
import store from '@/store/index';

// flexible自适应设置文件--------------------------------------------------------------------------------start
// 引入自适应js文件
import 'lib-flexible/flexible.js';
import '@/libs/viewport.js';
// flexible自适应设置文件--------------------------------------------------------------------------------end

// 引入icons/svg 图片
import '@/icons/index';

// app根组件
import App from './App.vue';

// 全局组件
// svg icon图标公共组件
import IconSvg from '@/components/svg-icon/svg-icon.vue';
// config 配置----------------------------------------------------------------------------------end

require('@/assets/style/common.scss');
require('@/assets/style/vxe-table.scss');
require('@/assets/style/reset.scss'); // 组件内需声明，不然this上找不到

// 初始化app
const app = createApp(App);

// 注册公共组件
app.component('svg-icon', IconSvg); // 注册全局组件svg-icon

console.info(app.version);
// config 配置--------------------------------------------------------------------------------start
app.config.performance = true;

// 保留注释， 需要在html 的template 中添加comments
app.config.compilerOptions.comments = true;
app.config.compilerOptions.isCustomElement = (tag) =>
    tag.startsWith('defined-custom-');
// app.use 应用
setPlugins(app);
app.use(store).use(router).mount('#app');
// setTimeout(() => app.unmount(), 5000) // 卸载根组件，从html中移除app
