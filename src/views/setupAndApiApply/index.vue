<template>
  <div style="overflow:auto;">
    <div ref="root"
      class="setup-and-api-apply">{{ count }}--about.page</div>
    <div ref="el"></div>
    <hr />
    <div class="test-setup-params-component">
      <h1 style="font-size: 20px">
        子组件TestSetupParams, 测试setup中的props和context 用法
      </h1>
      <div style="margin: 30px 0">
        <div style="
            width: 60vw;
            height: 100px;
            background-color: red;
            font-size: 30px;
            overflow: hidden;
          "
          @click="parentClick">
          emit to child 通过refs 调用子组件方法
        </div>
        <TestSetupParams ref="testSetupParams"
          :room="'room'"
          :teacher="'MR.yang'"
          :title="'title test'"
          :state="state"
          :age="28"
          @childClick="childClick"></TestSetupParams>
      </div>
    </div>
    <hr />
    <hr />
    <section class="test-api">
      <TestApi :room="'room'"
        ref="TestApi"
        :teacher="'MR.yang'"
        :title="'title test'"
        :state="state"
        :age="28"></TestApi>
    </section>
    <hr />
  </div>
</template>

<script lang="ts">
import { take, interval } from 'rxjs';
import { defineComponent, markRaw, toRaw, reactive, ref, onMounted, watchEffect, watch, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { NavModule } from '@/store/modules/nav';
import TestSetupParams from '@/views/setupAndApiApply/components/TestSetupParams.vue';
import TestApi from '@/views/setupAndApiApply/components/TestApi.vue';

// setup 中使用watch、computed、ref、reactive
const SetupAndApiApply = defineComponent({
  name: 'SetupAndApiApply',
  components: {
    TestSetupParams,
    TestApi
  },
  setup(props, context) {
    const state = reactive({ val: 0, name: 'aaaaaa' });
    const count = ref(0);
    const store = useStore();
    const instance = getCurrentInstance();
    const el: any = ref(null);

    // interval(2000)
    //   .pipe(take(5))
    //   .subscribe(() => {
    //     state.val++;
    //     console.log(count.value);
    //     count.value++;
    //   });

    {
      // 获取dom元素
      const mm = ref(0);
      // 创建一个DOM引用，名称必须与元素的ref属性名相同
      // 在挂载后才能通过 el 获取到目标元素
      onMounted(() => {
        el.value.innerHTML = '内容被修改';
      });
    }

    // 实现count.value 的watch监听，5s后取消监听
    {
      // computed、watch、watchStop
      const fullName = computed(() => count.value);
      const fullNameStop = watch(fullName, (newValue, oldValue) => {
        console.log(`新值为${newValue}`, `原值为${oldValue}`);
      });
      setTimeout(() => {
        fullNameStop();
      }, 5000);
      console.log(fullName);
    }

    {
      // watchEffect
      // 只要watchEffect 中的数据有更新就会调用
      const aa = 'asdf';
      watchEffect(() => {
        console.log(state.val);
        console.log(state.name);
        console.log(count.value);
      });
    }

    console.log(NavModule.test);
    console.log(props, context);

    const childClick = (params: any) => {
      console.log('通过emit 触发了父组件方法', params);
    };
    const parentClick = (params: any) => {
      console.log(instance);
      (instance as any).refs.testSetupParams.parentClick();
    };

    return {
      count,
      state,
      el,
      childClick,
      parentClick
    };
  }
});

export default SetupAndApiApply;
</script>
