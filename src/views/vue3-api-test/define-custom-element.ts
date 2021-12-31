import { defineCustomElement } from 'vue';
const MyCustomComponent = defineCustomElement({
  // 这里是普通的 Vue 组件选项
  props: {},
  emits: {},
  template: `
    <section class="test-difine-custom-element">
        <h1>test defineCustomElement 成功</h1>
    </section>
  `,
  // 只用于 defineCustomElement：注入到 shadow root 中的 CSS
  styles: [`
    .test-difine-custom-element{
        color:red;
    }
  `]
});
// 注册该自定义元素。
// 注册过后，页面上所有的 `<my-vue-element>` 标记会被升级。
customElements.define('my-vue-element', MyCustomComponent);
// 你也可以用编程的方式初始化这个元素：
// (在注册之后才可以这样做)
// document.body.appendChild(
//   new MyCustomComponent({
//     // 初始化的 prop (可选)
//   })
// );

export default MyCustomComponent;
