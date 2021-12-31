<template>
  <div class="test-setup-params-child-body"
    style="background: orange;margin-top: 30px;">
    <h1>我是子组件 <br> TestCommunicationChild 测试子组件调用父组件方法</h1>
    <div class="aaaaaaa"
      @click="sonClick">
      我是子组件 通过emit 调用父组件方法
    </div>
    <div style="margin: 20px;">

      <el-button @click="changeTitleEmitParent">修改子组件的CopyTitle后通知父组件更新title，然后子组件会自动更新来自于父组件的title的展示，copyTitle 不会更新，除非进行赋值</el-button>
    </div>

    <h1> props 成功传入 ======= {{ title }}-----{{ age }}</h1>
    <hr>
    <h4>通过compouted 获取到 props 传过来的 title ==== {{computedTitle}}</h4>
    <hr>
    <h4>props 传过来的值无法直接修改，引用类型应该可以修改，备份后成为copyTitle 进行修改 {{copyTitle}}</h4>
    <hr>
    <h4>watch 监听到 state 中的val的变化 {{state.val}}</h4>
  </div>
</template>

<script lang="ts">
// 本组件调试setup的两个参数
import { interval, take } from 'rxjs';
import { computed, defineComponent, onMounted, ref, toRef, toRefs } from 'vue';

// setup 中使用watch、computed、ref、reactive
const TestCommunicationChild = defineComponent({
  name: 'TestCommunicationChild',
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
    }
  },
  watch: {
    copyTitle: {
      handler(newVal, oldVal) {
        console.log('copyTitle====', newVal, oldVal);
        // setTimeout(() => {
        //   this.copyTitle = 'lllllllllllllllllll'; // 通过this修改copyTitle 的值
        // }, 2000);
        this.$emit('getChildTitle', { copyTitle: this.copyTitle }); // 把更新的值发送给父组件，通知父组件更新值
      },
      immediate: false,
      deep: true
    },
    state: {
      handler(newVal, oldVal) {
        console.log('通过watch 监听到 父组件的state变化了====', newVal.val, oldVal.val); // 因为state 是响应式的，所有newVal 和oldVal相同
      },
      immediate: false,
      deep: true
    }
  },
  setup(props, context) {
    const copyTitle = ref(props.title);
    console.log(context);
    const { emit, slots, attrs, expose }: any = context;
    // props 子组件中声明在props中的值可以调用
    // context.emit 调用父组件事件
    // context.attrs 调用父组件传来的未在子组件中声明的props的值或者方法，已经在子组件中声明的props会打印undefined
    // context.expose 导出当前组件方法或者属性提供父组件调用
    console.log(context);
    // console.log(props.title, props.age);
    console.log(attrs.room, attrs.onChildClick); // 父组件传入的事件也可以用 attrs.on+事件名 调用
    // console.log((context as any).attrs.onChildClick());

    // 定义子组件方法
    const sonClick = () => {
      emit('childClick', { value: '子组件通过emit调用父组件成功' });
    };

    // 定义通过父组件调用的方法
    const parentClick = () => {
      console.log('通过expose导出方法提供父组件调用，父组件通过refs调用了子组件事件');
    };

    // 暴露方法
    expose({ parentClick });

    const changeTitleEmitParent = () => {
      // eslint-disable-next-line vue/no-mutating-props
      props.state.val = props.state.val + 1;
      copyTitle.value =
				copyTitle.value === 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB' ? 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA' : 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB';
      console.log(copyTitle.value);
    };

    return { props, context, sonClick, copyTitle, changeTitleEmitParent };
  }
});

export default TestCommunicationChild;
</script>

<style scoped lang="scss">
.aaaaaaa {
	width: 60vw;
	height: 100px;
	background-color: red;
	font-size: 30px;
	overflow: hidden;
}
</style>
