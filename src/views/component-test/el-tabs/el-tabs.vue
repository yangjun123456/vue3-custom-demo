<template>
	<section>
		<h1 style="color:red;font-weight:bolder;">v-if 可以控制tabs 中 el-tab-pane是否渲染 </h1>
		<h1 style="color:red;font-weight:bolder;">一般情况下每个组件渲染的内容都不一样 需要单独添加 直接写死 然后v-if条件判断</h1>
		<h1 style="color:red;font-weight:bolder;">如果一定要遍历渲染内容，如果获取不到内容组件的ref，可以使用instance获取ref获取子组件内容和方法</h1>
		<h1 style="color:red;font-weight:bolder;">el-tab-pane v-if后整个标签页都不显示了</h1>
		<h1 style="color:red;font-weight:bolder;">el-tab-pane 内的子内容v-if后可以看到标签页，看不到子内容，也加载不到子内容的ref</h1>
        {{activeName}}
		<el-tabs v-model="activeName"
			@tab-click="handleClick">
			<template v-for="(item,index) of list"
				:key="index">
				<el-tab-pane :label="item.label"
					:name="item.name">
					<div v-if="index===0">
						<span ref="userRef1">{{item.name}}----userRef1：{{userRef1}}</span>
					</div>
					<div v-if="index>3">
						<span :ref="'userRef'+index">{{item.name}}-other</span>
					</div>
					<div v-else>
						<span>{{item.name}}-other</span>
					</div>
				</el-tab-pane>
			</template>
			<el-tab-pane label="Config"
				name="second">
				<div ref="userRef2">Config----userRef2：{{userRef2}}</div>
			</el-tab-pane>
			<el-tab-pane label="Role"
				name="third">
				<div ref="userRef3">Role----userRef3：{{userRef3}}</div>
			</el-tab-pane>
			<el-tab-pane label="Task"
				v-if="false"
				name="fourth">Task</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script lang="ts" setup>
import { interval, take, timer, takeWhile } from 'rxjs';
import { ref, getCurrentInstance, inject } from 'vue';
// 全局
const instance = getCurrentInstance();
const $uuid: any = inject('$getUuidv4');
const $uuidv3: any = inject('$getUuidv3');

const uuid = $uuid();
console.log(uuid);
const activeName = ref('tab1');
console.log(instance);
const handleClick = (tab: string, event: Event) => {
    console.log(tab, event);
};

const list = ref<{ name: string; label: string }[]>([
    {
        name: 'tab1',
        label: 'tab1'
    },
    {
        name: 'tab2',
        label: 'tab2'
    },
    {
        name: 'tab3',
        label: 'tab3'
    },
    {
        name: 'tab4',
        label: 'tab4'
    }
]);
const count = ref(5);
interval(2000)
    .pipe(
        take(3),
        takeWhile(() => uuid)
    )
    .subscribe(() => {
        count.value++;
        list.value.push({ name: 'tab' + count.value, label: 'tab' + count.value });
        console.log((instance as any).refs);
        console.log(userRef1.value);
    });

const userRef1 = ref();
const userRef2 = ref();
const userRef3 = ref();

timer(5000).subscribe(() => {
    console.log(userRef1.value);
    console.log(userRef2.value);
});

</script>
