<template>
	<!-- 文档说明------- markdown/test-flexible测试flexible 实现rem的响应式.md -->
	<div class="test-flexible">
		<div class="test1">asldkfjasldfkj</div>
		<div class="test2">爱丽丝的咖啡机阿斯利康的飞机阿斯利康大家发阿斯利康</div>

        <hr>
        <hr>
        <hr>
        <hr>
        <hr>
        <hr>
        <hr>
        <hr>

        {{formValues}}
		<AntDesignForm ref='antDesignFormRef'
			v-model:value="formValues"
			@handleReset="handleReset"
			@handleQuery="handleQuery"></AntDesignForm>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
import AntDesignForm from '@/components/ant-design-form/index.vue';
const name = ref<any>(null);

interface FormDataType {
	id?: string;
	prop?: string;
	label?: string;
	type?: string;
	rules?: any[];
}
interface FormStateType {
	name: string;
	status: string;
	address: string;
	type: string;
}

const formValues = ref<{
	formData: FormDataType[];
	formState: FormStateType;
}>({
	formData: [
		{
			id: '',
			prop: 'name',
			label: '姓名',
			type: '',
			rules: [
				{ required: true, message: 'input something' },
				{ required: false, message: 'max length 10', max: 10 }
			]
		},
		{
			id: '',
			prop: 'status',
			label: '状态',
			type: '',
			rules: [
				{ required: true, message: 'input something' },
				{ required: false, message: 'max length 10', max: 10 }
			]
		},
		{
			id: '',
			prop: 'address',
			label: '地点',
			type: '',
			rules: [
				{ required: true, message: 'input something' },
				{ required: false, message: 'max length 10', max: 10 }
			]
		},
		{
			id: '',
			prop: 'type',
			label: '类型',
			type: '',
			rules: [
				{ required: true, message: 'input something' },
				{ required: false, message: 'max length 10', max: 10 }
			]
		}
	],
	formState: {
		name: '',
		status: '',
		address: '',
		type: ''
	}
});
const antDesignFormRef = ref();
const handleReset = (item: any) => {
	console.log(item);
	antDesignFormRef.value.formRef.resetFields();
};
const handleQuery = async (item: any) => {
	try {
		await antDesignFormRef.value.formRef.validateFields();
		// 获取到数据进行调用接口查询
	} catch (error) {
		console.log(error);
	}
};
</script>

<style lang="scss" scoped>
.test1 {
	font-size: 16px;
}
.test2 {
	// width: 100px; /*no*/
	width: 100px;
	// height: 100px; /*px*/
	height: 100px;
	background-color: red;
	// border-radius: 50%;
	opacity: 0.3;
  font-size: 16px;
}
</style>
