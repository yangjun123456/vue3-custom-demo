<template>
	<div class="test-custom-directive">
		<input v-focus="['asdf','aaa']"
			type="text">
		<div v-twinkle="{value: val}"
			class="twinkle-div"></div>
	</div>
</template>

<script lang="ts" setup>
import { focus } from '@/directives/focus';
import { twinkle } from '@/directives/twinkle';
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';
import { messagePage } from '@/api/common/common';
import { useStore } from 'vuex';
// const focusDirective = focus();
const vFocus = focus();
const vTwinkle = twinkle();
const val = ref(false);
setInterval(() => {
    val.value = !val.value;
}, 3000);
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
input {
	width: 100px;
	height: 60px;
	border: 1px solid red;
}
.twinkle-div {
	width: 10vw;
	height: 10vw;
	background-color: red;
}
</style>
