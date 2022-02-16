<template>
  <div class="test-axios-body">
    <h1 v-once style="font-size:20px;">接口测试</h1>
    <h1 >使用的 中孚利安 的 省值班任务 的 通知下发 列表请求接口==========请求状态: <span style="color: red;">{{ msg }}</span></h1>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';
import { messagePage } from '@/api/common/common';

import { useStore } from 'vuex';

const store: any = useStore();
const msg = ref('');
onMounted(() => {
  console.log(store);
  messagePageData();
});

// 测试接口
const messagePageData = async () => {
  try {
    const res = await messagePage({
      pageNum: 1,
      pageSize: 10,
      keyWord: '',
      type: '1',
      startTime: '',
      endTime: ''
    });
    console.log(res);
    if (res.status == 1 || res.status == 200) {
      msg.value = '请求成功';
    } else {
      msg.value = '请求失败';
    }
  } catch (error) {
    msg.value = '接口不通';
    console.log(error);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
	margin: 40px 0 0;
}
ul {
	list-style-type: none;
	padding: 0;
}
li {
	display: inline-block;
	margin: 0 10px;
}
a {
	color: #42b983;
}
</style>
