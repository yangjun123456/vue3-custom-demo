<template>
	<section class="app-main">
		<router-view />
	</section>
</template>

<script setup lang="ts">
import { FunctionTest } from '@/utils/functions-test';
new FunctionTest();
</script>

<style lang="scss">
.app-main {
	width: 100%;
	height: 100%;
}
#app {
	width: 100%;
	height: 100%;
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
</style>
