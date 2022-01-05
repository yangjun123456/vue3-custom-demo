<template>
  <div style="overflow:auto;">
    <h1>说明： 测试iconSvg svg图标组件</h1>
    <div style="position:absolute;top:300px;left: 50%;">
      <svg-icon :filename="'sql-import'"
        :hover="'anticon-eye'"></svg-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
const IconSvgTest = defineComponent({
  name: 'IconSvgTest',
  setup(props, context) {
    return { props };
  }
});
export default IconSvgTest;
</script>
<style lang="scss" scoped>

</style>
