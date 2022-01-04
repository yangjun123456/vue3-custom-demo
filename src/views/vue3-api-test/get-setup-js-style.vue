<template>
  <div style="overflow:auto;">
    <h1>说明： 测试在scss 使用v-bind获取js中的object 的响应式的 css样式object</h1>
    <br>
    <h1 class="getSetUpJsStyle">scss中通过v-bind获取js中的样式并且实现响应式更新</h1>
    <div id="defineCustomComponentId"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
import { interval, take } from 'rxjs';
// import DefinedCustomVueElement from '@/views/vue3-api-test/components/define-custom-element';
const GetSetUpJsStyle = defineComponent({
  name: 'GetSetUpJsStyle',
  setup(props, context) {
    const colorStyle = shallowRef({
      color: 'red',
      fontSize: '20px'
    });

    interval(1000)
      .pipe(take(100))
      .subscribe(() => {
        colorStyle.value.color = colorStyle.value.color === 'red' ? 'orange' : 'red';
        colorStyle.value.fontSize = colorStyle.value.fontSize === '20px' ? '30px' : '20px';
        triggerRef(colorStyle);
      });
    onMounted(() => {
      // 动态创建元素标签
    //   (document.getElementById('defineCustomComponentId') as any).appendChild(
    //     new DefinedCustomVueElement({
    //       // 初始化的 prop (可选)
    //     })
    //   );
    });
    return { colorStyle };
  }
});
export default GetSetUpJsStyle;
</script>
<style lang="scss" scoped>
.getSetUpJsStyle {
	transition: all 1s;
	color: v-bind('colorStyle.color');
	font-size: v-bind('colorStyle.fontSize');
}
</style>
