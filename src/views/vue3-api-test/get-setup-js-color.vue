<template>
  <div style="overflow:auto;">
    <h1>说明： 测试在scss 使用v-bind获取js中的object 的响应式的 css样式object</h1>
    <br>
    <h1 class="getSetUpJsColor">scss中通过v-bind获取js中的样式并且实现响应式更新</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
import { interval, take } from 'rxjs';
const GetSetUpJsColor = defineComponent({
  name: 'GetSetUpJsColor',
  setup(props, context) {
    const colorStyle = shallowRef({
      color: 'red',
      fontSize: '20px'
    });
    onMounted(() => {
      interval(1000)
        .pipe(take(100))
        .subscribe(() => {
          colorStyle.value.color = colorStyle.value.color === 'red' ? 'orange' : 'red';
          colorStyle.value.fontSize = colorStyle.value.fontSize === '20px' ? '30px' : '20px';
          triggerRef(colorStyle);
        });
    });
    return { colorStyle };
  }
});
export default GetSetUpJsColor;
</script>
<style lang="scss" scoped>
.getSetUpJsColor {
	transition: all 1s;
	color: v-bind('colorStyle.color');
	font-size: v-bind('colorStyle.fontSize');
}
</style>
