<template>
  <div class="toRef-toRefs"
    style="text-align: left">
    <h1 style="font-size: 20px">toRef 和 toRefs 方法应用</h1>
    <div class="toRef"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRef 测试</h3>
      <button @click="toRefClick1">toRefClick1 toRef(toRefcount,'count') 原始值和toRef包装后的值是引用关系，所以都会变， toRef会改变原始值，不会立刻更新到dom，会在下次dom更新时进行更新，修改原始值也会改变toRef赋值的值</button>
      <div>toRef(toRefobj.count) 的值 toRefcount.count 通过toRef 获取到的值，修改toRef 获取的值会影响到原始值，修改原始值会影响到toRef 获取的值 === {{ toRefcount }}</div>
      <div>原始值 toRefobj.count 原始值对象非响应式，修改toRef 获取的值会影响到原始值，修改原始值会影响到toRef 获取的值 === {{ toRefobj.count }}</div>
      <br>
      <hr>
      <br>
      <button @click="toRefClick2">toRefClick2 不是通过toRef 包装而是通过ref包装的值ref(toRefobj.count)修改值后会立刻更新dom，不会更新原始值</button>
      <div>ref(toRefobj.name) 的值 toRefcount2.name === {{ toRefcount2 }}</div>
      <div>原始值 toRefobj.name === {{ toRefobj.name }}</div>
    </div>

    <div class="toRefs"
      style="background-color: orange; margin-top: 20px">
      <h3 style="font-size: 18px">toRefs 测试</h3>
      <h3 style="font-size: 18px">toRefs 可以避免在解构赋值后失去响应式，如果修改了未被reactive包装过的原始值，不会更新dom，会在下次更新</h3>
      <button @click="toRefsClick1">toRefsClick1 toRefs传入的是reactive 可以实时更新dom，使用toRefs后无论是否解构赋值，无论修改原始值还是解构赋值后的值都会更新到dom，因为是引用关系，变化原始值toRefs后的也会变，变化toRefs后的，原始值也会变</button>
      <div>非解构赋值 toRefsState2.toRefsObj2Name reactive的非解构赋值修改数据会更新到dom === {{ toRefsState2.toRefsObj2Name }}</div>
      <div>非解构赋值 toRefsState2.toRefsObj2Value 非解构赋值获取值会更新到dom === {{ toRefsState2.toRefsObj2Value }}</div>
      <hr>
      <div>解构赋值后 toRefsObj2Value 解构赋值获取值会更新到dom === {{ toRefsObj2Value }}</div>
      <div>解构赋值后 toRefsState2.toRefsObj2Name 普通的或者reactive的解构赋值不会更新到dom === {{ toRefsObj2Name }}</div>
      <br>
      <hr>
      <br>
      <button @click="toRefsClick2">toRefsClick2 toRefs传入的是普通对象 不可以实时更新dom，可以解构赋值，解构赋值后也会和原始值相互引用</button>
      <div>toRefsState.name === {{ toRefsState.name }}</div>
      <div>toRefsState.age === {{ toRefsState.age }}</div>
      <div>toRefsState.toRefsObj1Name 非解构赋值不会更新dom === {{ toRefsState.toRefsObj1Name }}</div>
      <div>toRefsState.toRefsObj1Name 解构赋值不会更新dom === {{ toRefsObj1Name }}</div>
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
const ToRefAndToRefs = defineComponent({
    name: 'ToRefAndToRefs',
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
        const toRefClick2 = () => {
            toRefcount2.value = toRefcount2.value === 'BBBB' ? 'AAAA' : 'BBBB';
            console.log(toRefcount2, toRefobj); // 会修改原始值，不会更新dom, 但是如果有其它操作更新dom，本次的变更可会更新到dom
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
        const aaaaa = {
            toRefsObj2Name: 'aslkdjf',
            name: 'BBBB',
            age: 28,
            teach: 'teacher. BBBB',
            toRefsObj2Value: 'qowiuesdfkjwe',
            ff: { m: 0, val: { count: 1 } }
        };
        const toRefsObj2 = reactive(aaaaa);
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
            toRefobj,
            toRefcount2,
            toRefClick2,
            toRefClick1,
            toRefcount,
            toRefsState,
            toRefsObj1Name,
            toRefsState2,
            toRefsObj2Value,
            toRefsClick1,
            toRefsClick2,
            toRefsObj2Name
        };
    }
});

export default ToRefAndToRefs;
</script>
