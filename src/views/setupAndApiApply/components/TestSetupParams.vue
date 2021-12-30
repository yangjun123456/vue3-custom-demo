<template>
    <div class="test-setup-params-body">
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
    </div>
</template>

<script lang="ts">
// 本组件调试setup的两个参数
import { interval, take } from 'rxjs';
import { computed, defineComponent, onMounted, ref } from 'vue';

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
        .pipe(take(1))
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

export default TestSetupParams;
</script>
