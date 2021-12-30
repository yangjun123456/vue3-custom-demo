# setup 方法介绍
defineComponent 主要功能包含两个参数 props 和 context 及 一系列api用法，其他开发方法如同正常js 开发模式，setup 同级可定义components、props、watch、computed 等，watch和computed也可以在setup中进行开发完成

#### 父子组件传值
父组件
```
<div style="background-color: blur">
    <h1 style="font-size: 20px">子组件TestSetupParams</h1>
    <div style="margin: 30px 0">
    <div
        style="
        width: 60vw;
        height: 100px;
        background-color: red;
        font-size: 30px;
        overflow: hidden;
        " 
        @click="parentClick"
    >emit to child 通过refs 调用子组件方法</div>
    <TestSetupParams
        ref="testSetupParams"
        :room="'room'"
        :title="'title'"
        :age="28"
        @childClick="childClick"
    ></TestSetupParams>
    </div>
</div>

setup(props, context) {
    const childClick = (params: any) => {
      console.log('通过emit 触发了父组件方法', params);
    };
    const parentClick = (params: any) => {
      console.log(instance);
      (instance as any).refs.testSetupParams.parentClick();
    };

    return {
        childClick
    };
}
```
子组件
```
<h1>我是子组件 test setup params 测试子组件调用父组件方法</h1>
<h1>{{ title }}-----{{ age }} ------ props 成功传入</h1>
<div style="
width: 60vw;
height: 100px;
background-color: red;
font-size: 30px;
overflow: hidden;
"
    @click="sonClick">
    emit to parent
</div>
<h4>通过compouted 获取到 props 传过来的 title {{computedTitle}}</h4>
<h4>props 传过来的值无法直接修改，引用类型应该可以修改，备份后成为copyTitle 进行修改 {{copyTitle}}</h4>
<h4>通过compouted 获取到 setup 中暴露出的参数 {{computedWulilaoshi}}</h4>
<h4>watch 监听到 state 中的val的变化 {{state.val}}</h4>

// setup 中使用watch、computed、ref、reactive
// setup 中使用watch、computed、ref、reactive
const TestSetupParams = defineComponent({
  name: 'TestSetupParams',
  components: {},
  props: {
    title: {
      type: String,
      default: ''
    },
    age: {
      type: Number,
      default: 0
    },
    state: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  computed: {
    computedTitle() {
      return this.title;
    },
    computedWulilaoshi() {
      return this.wuliTeacher;
    }
  },
  watch: {
    copyTitle: {
      handler(newVal, oldVal) {
        console.log('copyTitle====', newVal, oldVal);
      },
      immediate: true,
      deep: true
    },
    state: {
      handler(newVal, oldVal) {
        console.log('state====', newVal, oldVal);
      },
      immediate: true,
      deep: true
    }
  },
  setup(props, context) {
    const wuliTeacher = ref('wu li lao shi');
    const copyTitle = ref(props.title);
    console.log(context);
    const { emit, slots, attrs, expose }: any = context;
    // props 子组件中声明在props中的值可以调用
    // context.emit 调用父组件事件
    // context.attrs 调用父组件传来的未在子组件中声明的props的值或者方法，已经在子组件中声明的props会打印undefined
    // context.expose 导出当前组件方法或者属性提供父组件调用
    console.log(context);
    // console.log(props.title, props.age);
    console.log(attrs.room, attrs.onChildClick);
    // console.log((context as any).attrs.onChildClick());

    // 定义子组件方法
    const sonClick = () => {
      emit('childClick', { value: '子组件通过emit调用父组件成功' });
    };

    // 定义通过父组件调用的方法
    const parentClick = () => {
      console.log('通过expose导出方法提供父组件调用，父组件通过refs调用了子组件事件');
    };

    {
      // 测试setup同级的watch监听
      const a = 0;
      copyTitle.value = 'aslkdfjaslkdfj';
      interval(1000)
        .pipe(take(5))
        .subscribe(() => {
          // eslint-disable-next-line vue/no-mutating-props
          props.state.val = props.state.val + 1;
          console.log('asdfasdfewer', props.state.val);
          copyTitle.value = 'aslkdfjaslkdfj1111111';
        });
    }
    // 暴露方法
    expose({ parentClick });

    return { props, context, sonClick, wuliTeacher, copyTitle };
  }
});
```