<template>
	<div class="font-faimly-test">
		<div class="">默认字体------AlibabaPuHuiTi-Bold---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="AlibabaPuHuiTi-Bold">阿里巴巴普惠字体类型------AlibabaPuHuiTi-Bold---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="AlibabaPuHuiTi-Heavy">阿里巴巴普惠字体类型------AlibabaPuHuiTi-Heavy---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="AlibabaPuHuiTi-Light">阿里巴巴普惠字体类型------AlibabaPuHuiTi-Light---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="AlibabaPuHuiTi-Medium">阿里巴巴普惠字体类型------AlibabaPuHuiTi-Medium---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="AlibabaPuHuiTi-Regular">阿里巴巴普惠字体类型------AlibabaPuHuiTi-Regular---阿斯兰的看法就阿斯利康的飞机</div>
		<div class="DINAlternate-Bold">数字类型---DINAlternate-Bold---87678765</div>
		<div class="DINCondensed-Bold">数字类型---DINCondensed-Bold---87678765</div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
declare const $: any;
const FontFamilyTestCom = defineComponent({
    name: 'FontFamilyTestCom',
    setup(props, context) {
        return { props };
    }
});

export default FontFamilyTestCom;
</script>
<style lang="scss" scoped>
.font-faimly-test {
	width: 100%;
	height: 100%;
}
div {
	font-size: 24px;
}
// 阿里巴巴普惠字体--------------------------------------------------------------------------------start
.AlibabaPuHuiTi-Bold {
	font-family: AlibabaPuHuiTi-Bold;
}
.AlibabaPuHuiTi-Heavy {
	font-family: 'AlibabaPuHuiTi-Heavy';
}
.AlibabaPuHuiTi-Light {
	font-family: 'AlibabaPuHuiTi-Light';
}
.AlibabaPuHuiTi-Medium {
	font-family: 'AlibabaPuHuiTi-Medium';
}
.AlibabaPuHuiTi-Regular {
	font-family: 'AlibabaPuHuiTi-Regular';
}
// 阿里巴巴普惠字体--------------------------------------------------------------------------------end

// 数字--------------------------------------------------------------------------------start
.DINAlternate-Bold {
	font-family: 'DINAlternate-Bold';
}
.DINCondensed-Bold {
	font-family: 'DINCondensed-Bold';
}
// 数字--------------------------------------------------------------------------------end
</style>
