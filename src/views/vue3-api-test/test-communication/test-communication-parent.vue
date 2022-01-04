<template>
  <div style="overflow:auto;color:#fff;">
    <div class="test-communication-body"
      style="background-color:purple;">
      <h1 class="title"
        ref="testCommunicationTitleEl"></h1>
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
    <TestCommunicationChild ref="testCommunicationChild"
      :room="'room'"
      :teacher="'MR.yang'"
      :title="title"
      :state="state"
      :age="28"
      @childClick="childClick"
      @getChildTitle="getChildTitle"></TestCommunicationChild>
    <!-- 异步组件的展示方式html，需用Suspense包装，#default 默认模板，#fallback 等待时渲染的内容-------------start -->
    <Suspense>
      <template #default>
        <TestCommunicationChildAsync ref="testCommunicationChildAsync"
          :room="'room'"
          :teacher="'MR.yang'"
          :title="title"
          :state="state"
          :age="28"
          @childClick="childClick"
          @getChildTitle="getChildTitle"></TestCommunicationChildAsync>
      </template>
      <template #fallback>
        <div>
          <ToRawAndMakeRaw></ToRawAndMakeRaw>
          <p style="position:absolute;left:0;top:0;font-size: 100px;"> Loading... </p>
        </div>
      </template>
    </Suspense>
    <!-- 异步组件的展示方式html，需用Suspense包装，#default 默认模板，#fallback 等待时渲染的内容-------------end -->
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
import WatchAndWatchEffect from '@/views/vue3-api-test/watch-watchEffect.vue';

// setup 中使用watch、computed、ref、reactive
const TestCommunication = defineComponent({
  name: 'TestCommunication',
  components: {
    TestCommunicationChild: defineAsyncComponent(() => import('./test-communication-child.vue')), // defineAsyncComponent 普通的组件异步加载方式
    // 组件异步加载的配置------------------------------------------------------------------------------------------------------------------------start
    // 说明： 在test-communication-child-async 中有一个async await 阻碍了组件加载，在组件加载完成之前先渲染fallback中的内容就是toRawAndMakeRaw 组件，
    ToRawAndMakeRaw: defineAsyncComponent(() => import('../toRaw-makeRaw.vue')),
    TestCommunicationChildAsync: defineAsyncComponent({
      loader: () => import('./test-communication-child-async.vue'),
      //   【注意】：下边的配置基本不生效，仅用loader 和 Suspense 标签配合可以显示异步组件 await 完成之前显示什么内容

      // 加载异步组件时要使用的组件
      loadingComponent: WatchAndWatchEffect,
      // 加载失败时要使用的组件
      errorComponent: WatchAndWatchEffect,
      // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
      delay: 1000,
      //   // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
      //   // 默认值：Infinity（即永不超时，单位 ms）
      timeout: 2500,
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
    // 组件异步加载的配置------------------------------------------------------------------------------------------------------------------------end
  },
  setup(props, context) {
    const state = reactive({ val: 0, name: 'aaaaaa' });
    const store = useStore();
    const instance = getCurrentInstance();
    const testCommunicationTitleEl: any = ref(null);
    const title = ref('title test');

    onMounted(() => {
      testCommunicationTitleEl.value.innerHTML = '说明： 测试父子组件通信'
    })

    const childClick = (params: any) => {
      console.log('通过emit 触发了父组件方法', params);
    };
    const parentClick = (params: any) => {
      console.log(instance);
      (instance as any).refs.testCommunicationChild.parentClick();
      if ((instance as any).refs.testCommunicationChildAsync) {
        (instance as any).refs.testCommunicationChildAsync.parentClick();
      }
    };
    const getChildTitle = (params: any) => {
      console.log(params);
      const { copyTitle } = params;
      title.value = copyTitle;
      console.log(title);
    };

    return {
      state,
      testCommunicationTitleEl,
      childClick,
      parentClick,
      title,
      getChildTitle
    };
  }
});

export default TestCommunication;
</script>
<style lang="scss" scoped>

</style>
