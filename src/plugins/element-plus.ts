/* eslint-disable */
// @ts-nocheck
import { toNumber } from '@/utils/function';
import { elThemeType, elStyleType } from '@/config';
// element-plus
import ElementPlus from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

// 通过切换样式文件的引入实现element-plus主题的切换, 切换时需要通过localStorage保存和读取变量 然后刷新页面进行更新整体页面样式
if (toNumber(elStyleType) == 1) {
    // 第一种样式
    import('@/style/element-ui/element-ui-base-1.scss');
    import('@/style/element-ui/element-ui-variable-1.scss');
}

if (toNumber(elStyleType) == 2) {
    // 第二种样式
    import('@/style/element-ui/element-ui-base-2.scss');
    import('@/style/element-ui/element-ui-variable-2.scss');
}
// import 'element-plus/dist/index.css'; // 默认主题

export function setupElementPlus(app: any) {
    zhCn.el.pagination = {
        pagesize: '条/页',
        total: '共{total}条',
        goto: '前往',
        pageClassifier: '页',
        deprecationWarning: ''
    }
    app.config.globalProperties.$ELEMENT = {
        // element-plus 全局配置
        locale: zhCn
    };
    app.use(ElementPlus);
}
