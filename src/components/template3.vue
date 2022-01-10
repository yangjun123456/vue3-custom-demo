<template>
  <div id="template3">
      {{'template3'}}
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';

import { useStore } from 'vuex';
import router from '../router';

const store:any = useStore();
const loadFun = () => {
  console.log('load成功');
  console.log(store);
}
onMounted(() => {
  window.addEventListener('unload', loadFun);
})

</script>
<style lang="scss" scoped>
</style>
