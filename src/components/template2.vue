<template>
  <div id="tempalte2">
      {{'template2'}}
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';
const Template2 = defineComponent({
    name: 'Template2',
    setup(props, context) {
        return { props, context };
    }
});
export default Template2;
</script>
<style lang="scss" scoped>
</style>
