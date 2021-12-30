<template>
  <div class="test-api-body"
    style="text-align: left">
    <h1 style="font-size: 20px">我是子组件 test api 测试api 方法应用</h1>
    <div class="reactive"
      style="background-color: orange">
      <h3 style="font-size: 18px">reactive 测试</h3>
      <div>reactiveList1[0] === {{ reactiveList1[0] }}</div>
      <div>reactiveObj1.name === {{ reactiveObj1.name }}</div>
      <div>reactiveObj1.age === {{ reactiveObj1.age }}</div>
      <div>reactiveObj2.date === {{ reactiveObj2 }}</div>
    </div>
    <div class="ref"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px"
        class="abcdefg">ref 测试</h3>
      <button @click="refClick1">refClick1</button>
      <button @click="refClick2">refClick2</button>
      <div>ref.count === {{ count }}</div>
      <div>objw.count === {{ objw.count }}</div>
      <div>ref.str === {{ str }}</div>
      <div>ref.bol === {{ bol }}</div>
    </div>
    <div class="shallowRef"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">shallowRef 测试</h3>
      <button style="margin-right: 10px"
        @click="changeShallowRefObjDeep">
        change name.val 不生效,调用triggerRef 后才生效
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
    <div class="toRaw"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRaw 测试</h3>
      <button @click="toRawClick1">toRawClick1 修改toRaw后的值不会更新页面</button>
      <div>toRawState.name === {{ toRawState.name }}</div>
    </div>
    <div class="toRef"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRef 测试</h3>
      <button @click="toRefClick1">toRefClick1</button>
      <div>toRefcount.count === {{ toRefcount }}</div>
      <div>toRefcount2.name === {{ toRefcount2 }}</div>
    </div>
    <div class="toRefs"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRefs 测试</h3>
      <h3 style="font-size: 18px">toRefs 避免在解构赋值后失去响应式</h3>
      <button @click="toRefsClick1">toRefsClick1 toRefs传入的是reactive 可以实时更新dom</button>
      <button @click="toRefsClick2">toRefsClick2 toRefs传入的是普通对象 不可以实时更新dom</button>
      <div>toRefsState.name === {{ toRefsState.name }}</div>
      <div>toRefsState.age === {{ toRefsState.age }}</div>
      <div>toRefsState.toRefsObj1Name 非解构赋值不会更新dom === {{ toRefsState.toRefsObj1Name }}</div>
      <div>toRefsState.toRefsObj1Name 解构赋值不会更新dom === {{ toRefsObj1Name }}</div>
      <hr>
      <div>toRefsState2.toRefsObj2Name reactive的非解构赋值修改数据会更新到dom === {{ toRefsState2.toRefsObj2Name }}</div>
      <div>toRefsState2.toRefsObj2Name 普通的或者reactive的解构赋值不会更新到dom === {{ toRefsObj2Name }}</div>
      <hr>
      <div>toRefsState2.toRefsObj2Value 解构赋值获取值会更新到dom === {{ toRefsObj2Value }}</div>
      <div>toRefsState2.toRefsObj2Value 非解构赋值获取值会更新到dom === {{ toRefsState2.toRefsObj2Value }}</div>
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
const TestApi = defineComponent({
  name: 'TestApi',
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
    const uuid = inject('$getUuidv4') as any;
    const instance = getCurrentInstance();
    console.log(instance);
    const { $uuid }: any = instance?.appContext.config.globalProperties;
    console.log(uuid()); // 获取uuid
    console.log($uuid()); // 另外一种获取uuid
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
      }
    };
    const reactiveObj1 = reactive(reactiveObj1Raw);
    const reactiveList1Raw = ['a', 'c', 'b', 'd', 's', 'g', 'h'];
    const reactiveList1 = reactive(reactiveList1Raw);

    {
      const a = 0;
      // 修改reactiveOb1.age 响应式到view上
      setTimeout(() => {
        reactiveObj1.age = 29;
        reactiveList1[0] = 'alsaaaaaakdfj';
        console.log('reactiveObj1========', reactiveObj1, reactiveObj1Raw);
        console.log('reactiveList1========', reactiveList1, reactiveList1Raw);
      }, 1000);
    }

    let date = new Date('2021-01-01');
    let reactiveObj2 = reactive(new Date(date));
    {
      // 修改原对象不会改变页面，重新赋值可以
      const a = 0;
      console.log(reactiveObj2);
      date = new Date('2029-01-01');
      reactiveObj2 = reactive(date);
    }
    /* reactive-----------------------------------------------------end */

    /* ref-----------------------------------------------------start */
    const obj = { count: 3 };
    const objm = { count: 3 };
    const count = ref(obj.count);
    const objw = ref(objm);
    const bol = ref(true);
    const str = ref('str');
    const refClick1 = () => {
      count.value++;
      objw.value.count++;
      console.log(count, obj, objm, objw); // 不会修改原始值，会更新dom，如果有其它的操作更新dom，也不会更新原始值
    };
    const refClick2 = () => {
      bol.value = !bol.value;
      console.log(bol);
    };

    {
      const a = 0;
      count.value = 10;
      bol.value = false;
      str.value = 'aslkdfj';
      //   interval(500).pipe(take(15)).subscribe(() => { count.value++; })
    }
    /* ref-----------------------------------------------------end */

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
    console.log('shallowReactiveObj=====', shallowReactiveObj.num, shallowReactiveObj.count, reactiveObj1.aaa); // 第一个是非响应式的，第二个是响应式的
    /* shallowReactive-----------------------------------------------------end */

    /* toRaw----------------------------------------------------------start */
    const obj1 = {
      name: 'BBBB',
      age: '28'
    };
    // state和obj1是引用关系，state的本质是一个Proxy对象，其中引用了obj1
    const toRawState = reactive(obj1);
    // 通过toRaw方法获取到原始数据，其实是获取到obj1的内存地址，obj2和obj1是完全相等的
    const obj2 = toRaw(toRawState);
    // 异步修改obj2中的name不会更新页面
    const toRawClick1 = () => {
      obj2.name = '1234123';
      obj2.name = 'asdlfkjalskjdf';
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

    console.log(markRawobj1 === markRawobj2); // true
    /* markRaw----------------------------------------------------------end */

    /*  toRef----------------------------------------------------------start */
    // 如果使用toRef来转换，则修改响应式数据会影响到原始数据，数据发生改变，但是界面不会自动更新
    // ref类似深拷贝，toref类似浅拷贝

    const toRefobj = { count: 3, name: 'BBBB', age: 28, teach: 'teacher. BBBB', ff: { m: 0, val: { count: 1 } } };
    const toRefcount = toRef(toRefobj, 'count'); // 会修改原始数据，不会更新到dom
    const toRefcount2 = ref(toRefobj.name); // 不会修改原始数据会更新到dom，如果是引用类型，会修改原始数据不会更新到dom
    const toRefClick1 = () => {
      //   toRefcount2.value = toRefcount2.value === 'BBBB' ? 'AAAA' : 'BBBB';
      toRefcount.value++;
      console.log(toRefcount, toRefobj); // 会修改原始值，不会更新dom, 但是如果有其它操作更新dom，本次的变更可会更新到dom
    };

    /*  toRef----------------------------------------------------------end */

    /*  toRefs----------------------------------------------------------start */
    // 【重点】: toRefs 会实时修改原始数据，如果传入reactive 数据会实时更新dom，如果传入普通对象不会更新dom，但会在下一次dom更新时同步更新
    // 用法1 传入普通对象，把普通对象转化成为响应式对象，但是控制台会报警告toRefs() expects a reactive object but received a plain one.
    // 因为传入的是普通对象，使用toRefs会修改原始数据，不会更新dom
    const toRefsObj1 = { name: 'BBBB', age: 28, teach: 'teacher. BBBB', toRefsObj1Name: 'alskdfj', ff: { m: 0, val: { count: 1 } } };
    const toRefsState = toRefs(toRefsObj1); // 会修改原始数据，引入的是普通对象不会更新到dom
    const { toRefsObj1Name } = toRefsState; // 解构赋值以后的修改不会更新dom，失去响应式，但会修改原始值
    const toRefsClick2 = () => {
      toRefsState.name.value = toRefsState.name.value === 'AAAA' ? 'BBBB' : 'AAAA';
      //   toRefsState.toRefsObj1Name.value = toRefsState.toRefsObj1Name.value === 'AAAA' ? 'BBBB' : 'AAAA'; // 和修改toRefsObj1Name.value是等价的
      toRefsObj1Name.value = toRefsObj1Name.value === 'AAAA' ? 'BBBB' : 'AAAA';
      toRefsState.age.value++;
      console.log('toRefsState 用法1 传入的不是响应式对象=====', toRefsObj1, toRefsState);
    };

    // 用法2 消除控制台的警告 给toRefs 传入一个响应式对象=========toRefs
    // 因为传入的是reactive包装的对象，使用toRefs会修改原始数据，会更新dom
    const toRefsObj2 = reactive({
      toRefsObj2Name: 'aslkdjf',
      name: 'BBBB',
      age: 28,
      teach: 'teacher. BBBB',
      toRefsObj2Value: 'qowiuesdfkjwe',
      ff: { m: 0, val: { count: 1 } }
    });
    const toRefsState2 = toRefs(toRefsObj2); // 会修改原始数据，引入的是reactive数据会更新到dom
    const { toRefsObj2Name } = toRefsObj2; // 解构赋值失去响应式
    const { toRefsObj2Value } = toRefsState2; // // 解构赋值不会失去响应式
    const toRefsClick1 = () => {
      toRefsState2.toRefsObj2Name.value = toRefsState2.toRefsObj2Name.value === 'AAAA' ? 'BBBB' : 'AAAA';
      //   toRefsState2.toRefsObj2Value.value = toRefsState2.toRefsObj2Value.value === 'AAAA' ? 'BBBB' : 'AAAA'; // 和修改toRefsObj2Value.value是等价的
      toRefsObj2Value.value = toRefsObj2Value.value === 'AAAA' ? 'BBBB' : 'AAAA';
      console.log('toRefsState 用法2 传入的是响应式对象=====', toRefsObj2, toRefsState2);
    };
    watch(
      toRefsObj2Value,
      (newVal: any, oldVal: any) => {
        console.log('watch toRefsObj2Value=====解构赋值的值', newVal, oldVal);
      },
      { immediate: true, deep: true }
    );
    // watch 监听toRefs 后的数据，newVal等于oldVal
    // watch 监听ref 和reactive ，newVal不等于oldval
    // 无法监听普通对象
    // 无法监听失去响应式的数据 例如： toRef后的数据，toRefs传入普通对象的数据，shallowRef和shallowReactive 的深层数据，toRaw的数据
    // 大概率只能监听ref 和reactive 的数据
    // 被toRefs包装过的非响应式对象也不会被监听到
    watch(
      [() => toRefsState2.toRefsObj2Name], // 监听到的new和old 是相同的,是被toRefs 处理过一个类似于toRef后的值
      //   [() => toRefsState2.toRefsObj2Name.value], // 监听到的new和old 是不同的，获取到的就是字符串本身
      ([newVal1], [oldVal1]) => {
        //  经过toRefs 处理过，oldval和newval相等
        console.log('watch toRefsState2.toRefsObj2Name======非解构赋值的值', newVal1, oldVal1);
      },
      { immediate: true, deep: true }
    );
    // 接收一个方法，如果方法内的值存在响应式的值并且改变了，那么出发整个watchEffect 方法
    // 同watch 只能监听响应式数据，响应式数据会更新到dom，数据变化后更新不到dom的都不能被监听到
    watchEffect(() => {
      console.log('toRefsState.name=============', toRefsState.name);
      console.log('toRefsObj2Value.value=============', toRefsObj2Value.value);
    });

    /*  toRefs----------------------------------------------------------end */

    return {
      props,
      context,
      uuid,
      reactiveObj1,
      reactiveObj2,
      count,
      bol,
      objw,
      str,
      refClick1,
      refClick2,
      toRefcount2,
      shallowRefObj,
      changeShallowRefObj,
      changeShallowRefObjDeep,
      shallowReactiveObj,
      changeShallowReactiveObj,
      changeShallowReactiveObjDeep,
      toRawState,
      toRawClick1,
      toRefClick1,
      toRefcount,
      toRefsState,
      toRefsObj1Name,
      toRefsState2,
      toRefsObj2Value,
      toRefsClick1,
      toRefsClick2,
      toRefsObj2Name,
      reactiveList1
    };
  }
});

export default TestApi;
</script>
