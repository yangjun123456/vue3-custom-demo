# vue3 常用的 API 方法

#### setup

```
其实 setup 函数还有两个参数，分别是 props 、context，前者存储着定义当前组件允许外界传递过来的参数名称以及对应的值；后者是一个上下文对象，能从中访问到 attr 、emit 、slots

其中 emit 就是我们熟悉的Vue2中与父组件通信的方法，可以直接拿来调用

import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, unMounted} from 'vue'

onBeforeMount(() => {
    // 在挂载前执行某些代码
})

onMounted(() => {
    // 在挂载后执行某些代码
})

onBeforeUpdate(() => {
    // 在更新前前执行某些代码
})

onUpdated(() => {
    // 在更新后执行某些代码
})

onBeforeUnmount(() => {
    // 在组件销毁前执行某些代码
})

unMounted(() => {
    // 在组件销毁后执行某些代码
})

要特别说明一下的就是，setup 函数代替了 beforeCreate 和 created 两个生命周期函数，因此我们可以认为它的执行时间在beforeCreate 和 created 之间
```

#### ref 和 reactive

> ref 可以创建响应式值或者对象,ref(12),ref(true),ref(null),ref(undefined),ref({a:'1',f:{m:'123'}});,不会修改原始值，会更新 dom，如果 ref 内创建的是引用类型值，会修改原始值，会更新 dom， 并且可以被 watch 监听到
> reactive 创建响应式对象 reactive({a:'1',f:{m:'123'}}); 会修改原始值，会更新 dom， 数组也可以响应式和更新到 dom， 并且可以被 watch 监听到

#### shallowRef 和 shallowReactive

```
shallowRef
shallowRef 有 triggerRef() 方法
shallowRef 定义一个浅层的响应式对象，只有修改.value 的值才会是响应式的
例如
const shallowRefObj = shallowRef({num:123,obj:{name: '12222'}});
只有修改shallowRefObj.value 的值才会更新到dom，才是响应式的，才可以被watch监听到
如果修改shallowRefObj.value.obj.name 的值后调用了triggerRef(shallowRefObj) 也会更新到dom，也是响应式的，也可以被watch监听到
只修改shallowRefObj.value.name 不会更新dom，也不会被监听到


-----------------------------------------------------------------------------------------------


shallowReactive
shallowReactive 没有 triggerRef() 方法
shallowReactive 定义一个浅层的响应式对象，只有修改第一层的的值才会是响应式的
例如
const shallowReactiveObj = shallowReactive({num:123,obj:{name: '12222'}});
只有修改shallowReactiveObj.num,或者整体shallowReactiveObj.obj 重新赋值 才会更新到dom，才是响应式的，才可以被watch监听到
只修改shallowReactiveObj.obj.name 不会更新dom，也不会被监听到，即使有其他的值更新了dom连带着本次的数据变化更新到了dom，也不会触发watch监听
```

#### toRef 和 toRefs

```
toRef
可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
会修改原始值，不会被watch监听到，不会更新到dom，会在其它dom更新操作后再更新到dom


--------------------------------------------------------------------------------------

toRefs
将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。

toRefs 会实时修改原始数据，如果传入 reactive 数据会实时更新dom，解构赋值修改值后仍然保持对原始数据的变更，解构赋值仍然保持响应式，数据变化会被watch监听到，普通的reactive 解构赋值后失去响应式
如下
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
watch(
    [() => toRefsState2.toRefsObj2Name], // 监听到的new和old 是相同的,是被toRefs 处理过一个类似于toRef后的值
    //   [() => toRefsState2.toRefsObj2Name.value], // 监听到的new和old 是不同的，获取到的就是字符串本身
    ([newVal1], [oldVal1]) => {
    //  经过toRefs 处理过，oldval和newval相等
    console.log('watch toRefsState2.toRefsObj2Name======非解构赋值的值', newVal1, oldVal1);
    },
    { immediate: true, deep: true }
);


如果传入普通对象不会更新dom，也不会被watch监听到，可以解构赋值，修改值仍然保持对原始数据的变更，但不会有响应式，不会更新dom，但会在下一次dom更新时同步更新

```

#### watch 和 watchEffect

```
详情demo在 toRef-toRefs.vue 的toRefs的逻辑下
只可以监听响应式的数据，不可以监听普通对象
watch
// watch 监听toRefs 后的数据，newVal等于oldVal
// watch 监听ref 和reactive ，newVal不等于oldval
// 无法监听普通对象
// 无法监听失去响应式的数据 例如： toRef后的数据，toRefs传入普通对象的数据，shallowRef和shallowReactive 的深层数据，toRaw的数据
// 大概率只能监听ref 和reactive 的数据
// 被toRefs包装过的非响应式对象也不会被监听到

watchEffect 内包含的内容如果有响应式数据变化了，会自动出发watchEffect监听
```

#### getCurrentInstance 获取实例

```
import { getCurrentInstance } from 'vue';
setup 方法中使用 getCurrentInstance 获取到元素实例
如下
<div class="test-api-body" ref="testApiBodyEl"></div>

setup(){
    const instance = getCurrentInstance();
    const testApiBodyEl = ref(null); // 变量名必须定义与html中的res相同名称

    onMounted(() => {
      <!-- 只有Mounted后才能访问到 -->
      console.log('testApiBodyEl', instance);
      console.log('testApiBodyEl', instance?.refs); // 使用instance.refs 访问可以不用setup方法导出
      console.log('testApiBodyEl', testApiBodyEl);
    })
    return {
        testApiBodyEl // 只有导出才能使用 testApiBodyEl 变量直接获取到
    }
}
```


### v-memo
```
valueA 和 valueB等组成了一个条件list， 只要有一个条件产生了变化，那么更新子树dom， 如果全部相同，那么跳过子树dom的更新
<div v-memo="[valueA, valueB]">
  ...
</div>
```