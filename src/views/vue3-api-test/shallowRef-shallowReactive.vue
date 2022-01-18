<template>
  <div class="shallowRef-shallowReactive"
    style="text-align: left">
    <div class="shallowRef"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">shallowRef 测试</h3>
      <button style="margin-right: 10px"
        @click="changeShallowRefObjDeep">
        change name.val 不生效,调用triggerRef 后才生效，当前调用了triggerRef(showllowRef)
      </button>
      <button @click="changeShallowRefObj">
        change shallowRefObj 点击修改value 可以生效
      </button>
      <div>shallowRefObj === {{ shallowRefObj }}</div>
    </div>
    <div class="shallowReactive"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">shallowReactive 测试</h3>
      <button style="margin-right: 10px"
        @click="changeShallowReactiveObjDeep">
        change count.name.val 不生效,需要等到其它的操作dom更新 才会跟着更新
      </button>
      <button @click="changeShallowReactiveObj">
        change shallowReactiveObj 点击修改第一层的num 可以响应dom更新
      </button>
      <div>shallowReactiveObj.num === {{ shallowReactiveObj.num }}</div>
      <div>shallowReactiveObj.count.name.val === {{ shallowReactiveObj.count.name.val }}</div>
    </div>
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
const ShallowRefAndShallowReactive = defineComponent({
    name: 'ShallowRefAndShallowReactive',
    components: {
    },
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
    /* shallowRef-----------------------------------------------------start */
    // shallowReactive 同理，只有修改第一层数据才会是响应式，其他不是
    // shallowRef 深层数据不会实时更新到dom，但是如果有其它更新了dom，本次变更也会更新
        const shallowRefObj: any = shallowRef({ count: { name: { val: 0 } } });
        {
            const a = 0;
            shallowRefObj.value = { count: { name: { val: 123 } } };
        }
        const changeShallowRefObj = () => {
            shallowRefObj.value = shallowRefObj.value ? shallowRefObj.value : 0;
            shallowRefObj.value++;
        };
        const changeShallowRefObjDeep = () => {
            shallowRefObj.value.count.name.val++;
            triggerRef(shallowRefObj);
        };
        watch(
            shallowRefObj,
            (newVal: any, oldVal: any) => {
                console.log('watch shallowRefObj==============', newVal, oldVal);
            },
            { deep: true }
        );
        console.log('shallowRefObj=====', shallowRefObj);
        /* shallowRef-----------------------------------------------------end */

        /* shallowReactive-----------------------------------------------------start */
        // shallowReactive 同理，只有修改第一层数据才会是响应式，其他不是
        // shallowReactive 深层数据不会实时更新到dom，但是如果有其它更新了dom，本次变更也会更新
        const shallowReactiveObj: any = shallowReactive({ num: 0, count: { name: { val: 0 } } });
        {
            const a = 0;
            shallowReactiveObj.value = { count: { name: { val: 123 } } };
        }
        const changeShallowReactiveObj = () => {
            shallowReactiveObj.num = shallowReactiveObj.num ? shallowReactiveObj.num : 0;
            shallowReactiveObj.num++;
            console.log(shallowReactiveObj.num);
        };
        const changeShallowReactiveObjDeep = () => {
            shallowReactiveObj.count.name.val++;
            console.log(shallowReactiveObj.count);
        };
        watch(
            () => shallowReactiveObj.count.name.val,
            (newVal: any, oldVal: any) => {
                console.log('watch shallowReactiveObj.count.name.val==============', newVal, oldVal);
            },
            { deep: true }
        );
        watch(
            () => shallowReactiveObj.num,
            (newVal: any, oldVal: any) => {
                console.log('watch shallowReactiveObj.num==============', newVal, oldVal);
            },
            { deep: true }
        );
        console.log('shallowReactiveObj=====', shallowReactiveObj.num, shallowReactiveObj.count); // 第一个是非响应式的，第二个是响应式的
        /* shallowReactive-----------------------------------------------------end */

        return {
            props,
            context,
            shallowRefObj,
            changeShallowRefObj,
            changeShallowRefObjDeep,
            shallowReactiveObj,
            changeShallowReactiveObj,
            changeShallowReactiveObjDeep
        };
    }
});

export default ShallowRefAndShallowReactive;
</script>
