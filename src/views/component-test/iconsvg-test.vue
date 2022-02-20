<template>
	<div class="icon-test"
		style="overflow:auto;">
		<div>
			<h1>说明： 测试iconSvg svg图标组件</h1>
			<br>
			<br>
			<h1>svg 组件展示svg图标， 只能使用src/icons下的svg图片，单独使用了svg-sprite-loader 进行了处理</h1>
			<svg-icon :filename="'sql-import'"
				:hover="'anticon-eye'"
				:size="'50px'"></svg-icon>
		</div>
		<div>
			<br>
			<br>
			<br>
			<h1>svg img标签引用 assets下的svg图标=====可以正常使用</h1>
			<img style="width: 50px;height: 50px;"
				src="../../assets/svgs/cancel.svg"
				alt="" />
		</div>
		<div>

			<br>
			<br>
			<br>
			<h1 style="color: red">svg img标签引用icons下的svg图标=======不能正常展示</h1>
			<h1>因为使用了svg-sprite-loader 处理了这些icon，只能用于svg-icon使用，F12可以看到实际上引用的是svg代码</h1>
			<img style="width: 50px;height: 50px;"
				src="../../icons/svg/add.svg"
				alt="" />
		</div>
		<div>
			<br>
			<br>
			<br>
			<br>
			<h1>svg img标签引用png图标========可以正常引用</h1>
			<img style="width: 50px;height: 50px;"
				src="../../assets/logo.png"
				alt="" />

		</div>
		<div>
			<br>
			<br>
			<h1 style="color: red">svg 背景图引用icons 下的 svg图标========不能正常引用----------会打包失败，反正无法应用，就删掉了</h1>
			<h1>因为使用了svg-sprite-loader 处理了这些icon，只能用于svg-icon组件使用，F12可以看到实际上引用的是svg代码</h1>
			<div class="icon-svg"></div>

		</div>
		<div>
			<br>
			<br>
			<h1>svg 背景图引用assets 下的 svg图标========可以正常引用</h1>
			<div class="assets-svg"></div>

		</div>
		<div>
			<br>
			<br>
			<h1>png 背景图引用assets 下的 png图标========可以正常引用</h1>
			<div class="assets-png"></div>

		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
const IconSvgTest = defineComponent({
  name: 'IconSvgTest',
  setup(props, context) {
    return { props };
  }
});
export default IconSvgTest;
</script>

<style lang="scss" scoped>
.icon-svg,
.assets-svg,
.assets-png {
	width: 50px;
	height: 50px;
	background-size: 50px 50px;
	margin: 0 auto;
}
// .icon-svg {
// 	background-image: url('../../icons/svg/add.svg');
// }
.assets-svg {
	background-image: url('../../assets/svgs/cancel.svg');
}
.assets-png {
	background-image: url('../../assets/logo.png');
}

.icon-test {
	display: flex;
	flex-wrap: wrap;
	& > div {
		width: 50%;
		margin: 20px 0;
		padding: 20px 0;
		&:nth-child(odd) {
			background-color: rgb(229, 255, 0);
			color: #000;
		}
		&:nth-child(even) {
			background-color: red;
			color: #fff;
		}
	}
}
</style>
