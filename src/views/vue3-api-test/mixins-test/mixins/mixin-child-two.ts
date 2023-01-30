import {
    defineComponent,
    onMounted,
    ref,
    reactive,
    shallowRef,
    triggerRef
} from 'vue';
import { interval, take, timer } from 'rxjs';
// 本文件的写法在父组件的 created 和 mounted 下访问不到this
// 这个文件的mixin写法可以支持父组件 setup 的方式引入， 如同 mixins-parent 使用方式
// 在父组件setup 方法下引入后，通过setup return导出，也可以在methods 方法下使用this调用
const mixinChildTwo = function () {
    const setup = () => {
        const mixinChildTwoData = ref({
            name: 'mixinChildTwoData',
            id: 'mixinChildTwoDataId',
            age: 28,
            room: 298
        });

        const funTwo = () => {
            console.log('调用了mixin-child-two 中 funTwo 方法');
        };
        onMounted(() => {
            console.log('mixin-child-two-mounted');
        });
        return {
            mixinChildTwoData,
            funTwo
        };
    };
    return setup();
}
export { mixinChildTwo }
