<template>
  <div class="toRaw-makeRaw"
    style="text-align: left">
    <div class="toRaw"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRaw 测试</h3>
      <button @click="toRawClick1">toRawClick1 修改toRaw后的值不会更新页面,如果页面有其它更新，本次更改也会同步更新</button>
      <div>toRawState.name === {{ toRawState.name }}</div>
      <div>toRawState.age === {{ toRawState.age }}</div>
    </div>
    <div class="makeRaw"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRaw 测试</h3>
      <button @click="markRawobjClick">markRawobjClick 修改不会更新页面,如果页面有其它更新，本次数据更新也会同步到页面</button>
      <div>state1.name === {{ state1.name }}</div>
      <div>state1.name === {{ state1.age }}</div>
    </div>
    <button @click="otherRefresh">其它更新 触发了其它更新，toRaw 和 makeRaw 的更新会同步到页面</button>
    <div>reactiveObj.age ===== {{reactiveObj.age}}</div>
  </div>
</template>

<script lang="ts">
// 本组件调试setup的两个参数
import { interval, take } from 'rxjs';
import {
    defineComponent,
    markRaw,
    toRef,
    toRefs,
    toRaw,
    reactive,
    ref,
    onMounted,
    watchEffect,
    watch,
    computed,
    getCurrentInstance,
    shallowRef,
    shallowReactive,
    inject,
    triggerRef
} from 'vue';

// setup 中使用watch、computed、ref、reactive
const ToRawAndMakeRaw = defineComponent({
    name: 'ToRawAndMakeRaw',
    components: {},
    props: {
        room: {
            type: String,
            default: ''
        },
        state: {
            type: Object,
            default: () => {
                return {};
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
    /* toRaw----------------------------------------------------------start */
        const obj1 = {
            name: 'BBBB',
            age: 28
        };
        // state和obj1是引用关系，state的本质是一个Proxy对象，其中引用了obj1
        const toRawState = reactive(obj1);
        // 通过toRaw方法获取到原始数据，其实是获取到obj1的内存地址，obj2和obj1是完全相等的
        const obj2 = toRaw(toRawState);
        // 异步修改obj2中的name不会更新页面
        const toRawClick1 = () => {
            obj2.name = '1234123';
            obj2.name = 'asdlfkjalskjdf';
            obj2.age++;
            // toRawState 也会更新，但不会更新到页面
            console.log('toRaw===', obj1, obj2, toRawState);
            //   toRawState.name = 'MRs.BBBB'
        };

        console.log(obj1 === obj2); // true
        /* toRaw----------------------------------------------------------end */

        /* markRaw----------------------------------------------------------start */
        // 与toRaw不同，markRaw包装后的数据永远不会被追踪！
        const markRawobj1 = { name: 'lijing', age: 18 };
        const markRawobj2 = markRaw(markRawobj1);
        // 此时reactive包装的数据虽然是响应式对象，但是不会被跟踪，也不会产生效应式效果
        const state1 = reactive(markRawobj2);

        const markRawobjClick = () => {
            state1.age++;
            console.log(markRawobj1 === markRawobj2); // true
        };

        /* markRaw----------------------------------------------------------end */
        const reactiveObj = ref({ age: 19, room: '292' });
        const otherRefresh = () => {
            reactiveObj.value.age++;
            console.log('触发了其它更新，toRaw 和 makeRaw 的更新会同步到页面');
        };

        return {
            props,
            context,
            toRawState,
            toRawClick1,
            markRawobjClick,
            state1,
            otherRefresh,
            reactiveObj
        };
    }
});

export default ToRawAndMakeRaw;
</script>
