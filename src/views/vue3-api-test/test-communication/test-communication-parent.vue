<template>
  <div style="overflow:auto;color:#fff;">
    <div class="test-communication-body"
      style="background-color:purple;">
      <h1 class="title"
        ref="testCommunicationTitle"></h1>
      <h1 style="font-size: 20px">
        我是父组件 <br> 测试父子组件通信 <br> 测试setup中的props和context 用法
      </h1>
      <h1>通过修改子组件的copyTitle 然后发送给父组件进行更新title ==== {{title}}</h1>
      <div style="margin: 30px 0">
        <div style="
            width: 60vw;
            height: 100px;
            background-color: red;
            font-size: 30px;
            overflow: hidden;
          "
          @click="parentClick">
          我是父组件 通过refs 调用子组件方法
        </div>
      </div>
    </div>
    <Suspense>
      <template #default>
        <TestCommunicationChild ref="testCommunicationChild"
          :room="'room'"
          :teacher="'MR.yang'"
          :title="title"
          :state="state"
          :age="28"
          @childClick="childClick"
          @getChildTitle="getChildTitle"></TestCommunicationChild>
      </template>
      <template #fallback>
          <ToRawAndMakeRaw></ToRawAndMakeRaw>
        <!-- <p style="position:absolute;left:0;top:0;font-size: 100px;"> Loading... </p> -->
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { take, interval, timer } from 'rxjs';
import {
  defineComponent,
  markRaw,
  toRaw,
  reactive,
  ref,
  onMounted,
  toRefs,
  watchEffect,
  watch,
  computed,
  getCurrentInstance,
  defineAsyncComponent
} from 'vue';
import { useStore } from 'vuex';
import { NavModule } from '@/store/modules/nav';
import TestCommunicationChild from '@/views/vue3-api-test/test-communication/test-communication-child.vue';
import WatchAndWatchEffect from '@/views/vue3-api-test/watch-watchEffect.vue';

// setup 中使用watch、computed、ref、reactive
const TestCommunication = defineComponent({
  name: 'TestCommunication',
  components: {
    ToRawAndMakeRaw: defineAsyncComponent(() => import('../toRaw-makeRaw.vue')),
    // TestCommunicationChild: defineAsyncComponent(() => import('./test-communication-child.vue'))
    TestCommunicationChild: defineAsyncComponent({
      //   loader: () => import('./test-communication-child.vue'),
      loader: () => import('../ref-reactive.vue'),
      // 加载异步组件时要使用的组件
      loadingComponent: TestCommunicationChild,
      // 加载失败时要使用的组件
      errorComponent: WatchAndWatchEffect,
      // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
      delay: 200,
      //   // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
      //   // 默认值：Infinity（即永不超时，单位 ms）
      timeout: 3000,
      // 定义组件是否可挂起 | 默认值：true
      suspensible: true,
      onError(error, retry, fail, attempts) {
        if (error.message.match(/fetch/) && attempts <= 3) {
          // 请求发生错误时重试，最多可尝试 3 次
          retry();
        } else {
          // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
          // 必须调用其中一个才能继续错误处理。
          fail();
        }
      }
    })
  },
  setup(props, context) {
    const state = reactive({ val: 0, name: 'aaaaaa' });
    const store = useStore();
    const instance = getCurrentInstance();
    const testCommunicationTitle: any = ref(null);
    const title = ref('title test');
    const testCommunicationChildIsShow = ref(false);

    const childClick = (params: any) => {
      console.log('通过emit 触发了父组件方法', params);
    };
    const parentClick = (params: any) => {
      console.log(instance);
      testCommunicationChildIsShow.value = true;
      timer(1000).subscribe(() => {
        (instance as any).refs.testCommunicationChild.parentClick();
      });
    };
    const getChildTitle = (params: any) => {
      console.log(params);
      const { copyTitle } = params;
      title.value = copyTitle;
      console.log(title);
    };

    return {
      state,
      testCommunicationTitle,
      childClick,
      parentClick,
      title,
      getChildTitle,
      testCommunicationChildIsShow
    };
  }
});

export default TestCommunication;
</script>
