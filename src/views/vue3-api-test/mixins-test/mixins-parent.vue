<template>
	<div style="overflow:auto;">
		<h1 style="font-size: 20px;">说明： mixin 混合当前组件和抽离的ts文件方法</h1>
		<br>
		<h1 style="font-size: 20px;">说明： mixin.ts 文件写法如果为对象写法如同mixin-child-one.ts写法，可以在父组件中直接使用this调用，但是setup下没有this，无法调用</h1>
		<br>
		<h1 style="font-size: 20px;">说明： mixin.ts 文件写法如果为 setup 写法如同mixin-child-two.ts写法，可以在父组件中setup方法中调用，也可以在父组件 setup 导出后在methods中使用this调用</h1>
		<br>
		<el-button @click="mixinChildOneClick">one 写法无法在 setup 下使用, 可以使用Options 配置的方式进行开发, 可以直接在 methods 下使用this调用</el-button>
		<br>
		<br>
		<div>mixinChildOneData.name === {{mixinChildOneData.name}}</div>
		<br>
		<br>
		<el-button @click="mixinChildTwoClick">two 写法可以在 setup 下使用, 在setup方法下导出后， 也可以在methods 下的方法中使用this调用</el-button>
		<br>
		<br>
		<div>mixinChildTwoData.name === {{mixinChildTwoData.name}}</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';
import { mixinChildOne } from '@/views/vue3-api-test/mixins-test/mixins/mixin-child-one';
import { mixinChildTwo } from '@/views/vue3-api-test/mixins-test/mixins/mixin-child-two';
const MiXinParent = defineComponent({
    name: 'MiXinParent',
    data() {
        return {
            describe: 'miaoshuwenjian'
        };
    },
    mixins: [mixinChildOne],
    created() {
        console.log('created');
    },
    mounted() {
        console.log(this);
        console.log('mounted');
    },
    methods: {
        mixinChildOneClick() {
            console.log('');
            console.log('oneClick');
            this.mixinChildOneData.name = '123123123123'; // 可以修改mixin-child-two中的值
            this.funOne();
            console.log(this);
        },
        mixinChildTwoClick() {
            console.log('');
            console.log('twoClick');
            this.mixinChildTwoData.name = 'aslkdfjlalalalala'; // 可以修改mixin-child-two中的值
            this.funTwo();
            console.log(this);
        }
    },
    setup(props, context) {
        const describe = ref('asdf');
        const { mixinChildTwoData, funTwo } = mixinChildTwo();
        const obj = ref({ name: '18204739' });
        onMounted(() => {
            timer(1000)
                .pipe(take(!!describe.value))
                .subscribe(() => {
                    mixinChildTwoData.value.name = '129873192873'; // 可以修改mixin-child-two中的值
                });
            console.log(mixinChildTwoData, funTwo());
        });
        return { props, context, obj, mixinChildTwoData, funTwo }; // 导出mixinChildTwo中的值后，可以在 methods 下使用this调用
        // return { props, context };
    }
});
export default MiXinParent;
</script>
<style lang="scss" scoped>
</style>
