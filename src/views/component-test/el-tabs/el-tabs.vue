<template>
	<section>
		<h1 style="position:absolute;left:50%;top:300px;color:red;font-size: 30px;">{{userRef1}}----{{userRef2}}</h1>
		<el-tabs v-model="activeName"
			@tab-click="handleClick">
			<template v-for="(item,index) of list"
				:key="index">
				<el-tab-pane :label="item.label"
					:name="item.name">
					<div ref="userRef1"
						v-if="list.length">
						{{item.label}}-{{item.name}}</div>
				</el-tab-pane>
			</template>
			<el-tab-pane label="Config"
				name="second">
				<div ref="userRef2">Config</div>
			</el-tab-pane>
			<el-tab-pane label="Role"
				name="third">Role</el-tab-pane>
			<el-tab-pane label="Task"
				name="fourth">Task</el-tab-pane>
		</el-tabs>
	</section>
</template>

<script lang="ts" setup>
import { interval, take, timer, takeWhile } from 'rxjs';
import { ref, getCurrentInstance, inject } from 'vue';
// 全局
const instance = getCurrentInstance();
const $uuid:any = inject('$getUuidv4')

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

timer(5000).subscribe(() => {
    console.log(userRef1.value);
    console.log(userRef2.value);
});
</script>
