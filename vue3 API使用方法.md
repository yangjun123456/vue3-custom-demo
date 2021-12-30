# vue3 常用的API方法
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
> ref可以创建响应式值或者对象,ref(12),ref(true),ref(null),ref(undefined),ref({a:'1',f:{m:'123'}});,不会修改原始值，会更新dom，如果ref内创建的是引用类型值，会修改原始值，会更新dom， 并且可以被watch监听到
> reactive 创建响应式对象 reactive({a:'1',f:{m:'123'}}); 会修改原始值，会更新dom， 数组也可以响应式和更新到dom， 并且可以被watch监听到

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
详情demo在TestApi.vue 的toRefs的逻辑下
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

#### 

#### reactive
`reactive 方法是用来创建一个响应式的数据对象`

#### ref
`const count=ref(0)`

```
基本类型值（String 、Nmuber 、Boolean 等）或单值对象（类似像 {count: 3} 这样只有一个属性值的对象）使用 ref
引用类型值（Object 、Array）使用 reactive
```

#### toRef
```
toRef 是将某个对象中的某个值转化为响应式数据，其接收两个参数，第一个参数为 obj 对象；第二个参数为对象中的属性名
```

### ref 和 toRef 的区别
```
ref 是对传入数据的拷贝；toRef 是对传入数据的引用
ref 的值改变会更新视图；toRef 的值改变不会更新视图
```

#### toRefs
```
将传入的对象里所有的属性的值都转化为响应式数据对象，该函数支持一个参数，即 obj 对象
```

#### shallowReactive
```
shallowReactive 监听了第一层属性的值，一旦发生改变，则更新视图
```

#### shallowRef
```
shallowReactive 是监听对象第一层的数据变化用于驱动视图更新，那么 shallowRef 则是监听 .value 的值的变化来更新视图的

这么一看，未免也太过麻烦了，改个数据还要重新赋值，不要担心，此时我们可以用到另一个API，叫做 triggerRef ，调用它就可以立马更新视图，其接收一个参数 state ，即需要更新的 ref 对象
```

#### toRaw
```
toRaw 方法是用于获取 ref 或 reactive 对象的原始数据的
```

#### markRaw
```
markRaw 方法可以将原始数据标记为非响应式的，即使用 ref 或 reactive 将其包装，仍无法实现数据响应式，其接收一个参数，即原始数据，并返回被标记后的数据
``` 

#### provide && inject
```
provide ：向子组件以及子孙组件传递数据。接收两个参数，第一个参数是 key，即数据的名称；第二个参数为 value，即数据的值
setup() {
    const obj= {
        name: '前端印象',
        age: 22
    }

    // 向子组件以及子孙组件传递名为info的数据
    provide('info', obj)
}
inject ：接收父组件或祖先组件传递过来的数据。接收一个参数 key，即父组件或祖先组件传递的数据名称
setup() {   
    // 接收A.vue传递过来的数据
    inject('info')  // {name: '前端印象', age: 22}
}
```

#### watch && watchEffect
```
watch 监听一个或多个值，需要传入监听的值，更新的方法，返回一个stop函数
watchEffect 自动检测需要监听的值，只有一个方法
```

#### getCurrentInstance
```
import {ref, getCurrentInstance} from 'vue'
setup() {   
    const num = ref(3)
    const instance = getCurrentInstance()
    console.log(instance)

    return {num}
}
```

#### 获取标签元素
```
<div ref="el">div元素</div>
setup() {
    // 创建一个DOM引用，名称必须与元素的ref属性名相同
    const el = ref(null)

    // 在挂载后才能通过 el 获取到目标元素
    onMounted(() => {
    el.value.innerHTML = '内容被修改'
    })

    // 把创建的引用 return 出去
    return {el}
}
```
