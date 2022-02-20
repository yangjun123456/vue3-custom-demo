<template>
  <div class="ref-and-reactive"
    style="text-align: left">
    <div class="reactive"
      style="background-color: orange">
      <h3 style="font-size: 18px">reactive 测试</h3>
      <button @click="reactiveClick">reactiveClick reactive 会影响原始值 包装的数组或者对象都可以实时响应页面</button>
      <div>reactiveList1[0] === {{ reactiveList1[0] }}</div>
      <div>reactiveObj1.date === {{ reactiveObj1.date }}</div>
      <div>reactiveObj1.age === {{ reactiveObj1.age }}</div>
      <button @click="reactiveClick1">修改未被reactive包装过的原始值会影响包装过后的值，但不会立刻更新dom</button>
      <div>reactiveObj1.age === {{ reactiveObj1.age }}</div>
      <div>reactiveObj1Raw.age === {{ reactiveObj1Raw.age }}</div>
    </div>
    <div class="ref"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px"
        class="abcdefg">ref 测试</h3>
      <hr>
      <h4>ref 不会修改原始值</h4>
      <h4>如果是ref(obj.count) 不存在引用关系，修改原始值不会影响包装过后的值,修改包装过后的值不会影响原始值</h4>
      <h4>如果是ref(obj) 存在引用关系，修改原始值会影响包装过后的值 但不会立刻更新到dom，修改包装过后的值会影响原始值，会立刻更新到dom</h4>
      <hr>
      <button @click="refClick1">refClick1 更新date、count、传入对象格式的count， ref 可以更新到dom</button>
      <button @click="refClick2">refClick2 更新布尔值 ref 可以更新到dom</button>
      <div>ref.date === {{ date }}</div>
      <div>ref.count === {{ count }}</div>
      <div>objw.count === {{ objw.count }}</div>
      <div>ref.bol === {{ bol }}</div>
      <div>ref.bol2 === {{ bol2 }}</div>
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
const RefAndReactive = defineComponent({
  name: 'RefAndReactive',
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
    /* reactive-----------------------------------------------------start */
    const reactiveObj1Raw = {
      count: 0,
      name: 'BBBB',
      age: 28,
      teacher: 'mr.BBBB',
      room: '281',
      aaa: {
        name: {
          value: 'asdfasfd'
        }
      },
      date: new Date('2021-01-01')
    };
    const reactiveObj1 = reactive(reactiveObj1Raw);

    const reactiveList1Raw = ['a', 'c', 'b', 'd', 's', 'g', 'h'];
    const reactiveList1 = reactive(reactiveList1Raw);

    const reactiveClick = () => {
      reactiveObj1.age++;
      reactiveObj1.date = new Date('2029-01-01');
      reactiveList1[0] = 'alsaaaaaakdfj';
      console.log('reactiveObj1========', reactiveObj1, reactiveObj1Raw);
      console.log('reactiveList1========', reactiveList1, reactiveList1Raw);
    }
    const reactiveClick1 = () => {
      reactiveObj1Raw.age++;
      console.log('reactiveObj1========', reactiveObj1, reactiveObj1Raw);
      console.log('reactiveList1========', reactiveList1, reactiveList1Raw);
    }
    /* reactive-----------------------------------------------------end */

    /* ref-----------------------------------------------------start */
    const obj = { count: 5 };
    const objm = { count: 3 };
    const bolOright = false;
    const count = ref(obj.count);
    const objw = ref(objm);
    const bol = ref(true);
    const bol2 = ref(bolOright);
    const date = ref(new Date('2020-09-09'));
    const refClick1 = () => {
      date.value = new Date('2025-12-12');
      //   obj.count++;
      //   objm.count++;
      count.value++;
      objw.value.count++;
      console.log(count, obj, objm, objw); // 不会修改原始值，会更新dom，如果有其它的操作更新dom，也不会更新原始值
    };
    const refClick2 = () => {
      bol.value = !bol.value;
      bol2.value = !bol2.value;
      //   bolOright = !bolOright
      console.log(bol, bol2, bolOright);
    };

    /* ref-----------------------------------------------------end */

    return {
      props,
      context,
      reactiveObj1Raw,
      reactiveObj1,
      count,
      bol,
      objw,
      date,
      bol2,
      bolOright,
      refClick1,
      refClick2,
      reactiveList1,
      reactiveClick,
      reactiveClick1
    };
  }
});

export default RefAndReactive;
</script>
