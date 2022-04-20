<template>
	<section class="el-tabs-body">
		<el-button type="primary"
			@click="exportClick">导出为docx文件</el-button>
		<table>
			<tr>
				<td class="left">
					<span>asdf</span>
				</td>
				<td class="right">
					<span>asdfa123981723</span>
				</td>
			</tr>
		</table>
		<h1 :export2wordOption="JSON.stringify({export2wordTransform2Style: {'margin-top': '100px'}})">asdfasdf</h1>
		<div class="wraper"
			:export2wordOption="JSON.stringify({export2wordTransform2table:true})">
			<div class="left">asdfasdf</div>
			<div class="right">123123123</div>
		</div>
		<div class="wraper">
			<div class="left"
				:export2wordOption="JSON.stringify({export2wordTransform2inline:true})">asdfasdf</div>
			<div class="right"
				:export2wordOption="JSON.stringify({export2wordTransform2inline:true})">123123123</div>
		</div>

		<h1 class="asdfalala">aslkdfjasdfkljsldfkj</h1>

		<h1 class="abc"
			style="">v-if 可以控制tabs 中 el-tab-pane是否渲染 </h1>
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
		<section class="word-footer-content">
			<div :export2wordOption="JSON.stringify({export2wordTransform2table:true})">
				<div style="text-align:left;">left</div>
				<div style="text-align:right;">right</div>
			</div>
		</section>
	</section>
</template>

<script lang="ts" setup>
import { interval, take, timer, takeWhile } from 'rxjs';
import { ref, getCurrentInstance, inject, onMounted } from 'vue';
import htmlDocx from 'html-docx-js/dist/html-docx';
import saveAs from 'file-saver';
import { export2WordInstance } from './export-word';

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

onMounted(() => {
    console.log(onMounted);
});

const exportClick = () => {
    var el = document.querySelector('.el-tabs-body');
    export2WordInstance.export2Word(el);
};
</script>

<style scoped lang="scss">
.abc {
	color: red;
	font-weight: bolder;
}
.asdfalala {
	color: red;
	text-align: center;
}
table {
	width: 100%;
	text-align: center;
}
.left {
	text-align: left;
}
.right {
	text-align: right;
}
.wraper {
	display: table;
	width: 600px;
	.left {
		display: table-cell;
		// width: 300px;
	}
	.right {
		display: table-cell;
		// width: 300px;
	}
}
</style>
