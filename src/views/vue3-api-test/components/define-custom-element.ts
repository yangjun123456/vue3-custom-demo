import { defineCustomElement } from 'vue';
const DefinedCustomVueElement = defineCustomElement({
    // 这里是普通的 Vue 组件选项
    props: {},
    emits: {},
    template: `
    <section class="test-difine-custom-element">
        <h1>说明: 创建自定义组件成功，和普通的vue组件没有太大区别， 在getSetUpJsStyle.vue 组件中引入使用</h1>
        <h1>test defineCustomElement 成功</h1>
    </section>
  `,
    // 只用于 defineCustomElement：注入到 shadow root 中的 CSS
    styles: [`
    .test-difine-custom-element{
        color:red;
        font-size: 30px;
    }
  `]
});
// 注册该自定义元素。
// 注册过后，页面上所有的 `<defined-custom-vue-element>` 标记会被升级。
customElements.define('defined-custom-vue-element', DefinedCustomVueElement);
// 你也可以用编程的方式初始化这个元素：
// (在注册之后才可以这样做)

export default DefinedCustomVueElement;
