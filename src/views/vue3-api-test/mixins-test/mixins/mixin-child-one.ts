import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    shallowRef,
    triggerRef
} from 'vue';
import { interval, take, timer } from 'rxjs';
// 使用这个文件的写法只能配合父组件 不是setup 写法的方法引入
// 因为父组件的setup下访问不到this，获取不到这些data 和 方法，就算是使用 对象的方法调用到了，this指向也是混乱的，
// 可以在父组件和子组件没有互相调用的情况下使用
// 或者使用bus这种跨组件通信的方式进行调用和传值，但仅限于简单逻辑，复杂逻辑需要大量的bus
const mixinChildOne = {
    name: 'mixinChildOne',
    data() {
        return {
            mixinChildOneData: {
                name: 'mixinChildOneData',
                id: 'mixinChildOneDataId',
                age: 28,
                room: 298
            }
        };
    },
    created() {
        // console.log('mixin-child-one-created');
    },
    mounted() {
        const vm: any = this;
        vm.funOne();
        // console.log('mixin-child-one-mounted');
    },
    methods: {
        // 父组件中调用会失去
        funOne() {
            console.log((this as any).mixinChildOneData);
            console.log('调用了mixin-child-one 中 funOne 方法');
        }
    }
};
export { mixinChildOne };
