<template>
	<!-- 文档说明------- markdown/test-flexible测试flexible 实现rem的响应式.md -->
	<div class="test-flexible">
		<div class="test1">asldkfjasldfkj</div>
		<div class="test2">爱丽丝的咖啡机阿斯利康的飞机阿斯利康大家发阿斯利康</div>
	</div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
const name = ref<any>(null);
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
