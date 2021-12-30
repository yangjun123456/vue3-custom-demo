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
