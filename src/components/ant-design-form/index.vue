<template>
	<div>
		<a-form ref="formRef"
			name="advanced_search"
			class="ant-advanced-search-form"
			:model="value.formState">
			<a-row :gutter="24">
				<template v-for="(item,index) of value.formData"
					:key="index">
					<a-col :span="8">
						<a-form-item :name="item.prop"
							:label="item.label"
							:rules="item.rules">
							{{value.formState[item.prop]}}
							<template v-if="item.type === 'input'||!item.type">
								<a-input v-model:value="value.formState[item.prop]" @change="changeEvent()"
									placeholder="placeholder"></a-input>
							</template>
						</a-form-item>
					</a-col>
				</template>
			</a-row>
			<a-row>
				<a-col :span="24"
					style="text-align: right">
					<a-button type="primary"
						@click="handleQuery">查询</a-button>
					<a-button style="margin: 0 8px"
						@click="handleReset">重置</a-button>
					<!-- @click="() => formRef.resetFields()">重置</a-button> -->
				</a-col>
			</a-row>
		</a-form>
	</div>
</template>
<script lang="ts" setup>
import {
	defineProps,
	defineEmits,
	defineExpose,
	defineComponent,
	onMounted,
	ref,
	reactive,
	shallowRef,
	triggerRef,
	watch,
	markRaw,
	readonly,
	toRefs
} from 'vue';
import { interval, take, timer } from 'rxjs';
import { DownOutlined, UpOutlined } from '@ant-design/icons-vue';
import type { FormInstance } from 'ant-design-vue';
const props = defineProps({
	value: {
		type: Object,
		default: () => {
			return {
				formData: [],
				formState: {}
			};
		}
	}
});
const emits = defineEmits(['handleReset', 'handleQuery','update:value']);

const formRef = ref<FormInstance>();
const changeEvent=()=>{
    console.log('changeEvent');
    // 更新value 的值 ，本次使用了对象自动更新父组件值， 不进行update更新， 如有需求， 可单独配置
    // emits('update:value', {
    //     formData: props.value.formData,
    //     formState: {name: '123'}
    // });
}
const handleReset = () => {
	emits('handleReset', 'reset');
};
const handleQuery = () => {
	emits('handleQuery', { data: props.value });
};

defineExpose({ formRef });
</script>
<style>
#components-form-demo-advanced-search .ant-form {
	max-width: none;
}
#components-form-demo-advanced-search .search-result-list {
	margin-top: 16px;
	border: 1px dashed #e9e9e9;
	border-radius: 2px;
	background-color: #fafafa;
	min-height: 200px;
	text-align: center;
	padding-top: 80px;
}
[data-theme='dark'] .ant-advanced-search-form {
	background: rgba(255, 255, 255, 0.04);
	border: 1px solid #434343;
	padding: 24px;
	border-radius: 2px;
}
[data-theme='dark'] #components-form-demo-advanced-search .search-result-list {
	border: 1px dashed #434343;
	background: rgba(255, 255, 255, 0.04);
}
</style>