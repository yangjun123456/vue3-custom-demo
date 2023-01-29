<template>
	<svg :class="svgClass"
		@mouseenter="mouseenter"
		@mouseleave="mouseleave"
		aria-hidden="true"
		title
		mode="open"
		:style="{ width: size, height: size }">
		<use title
			:xlink:href="iconName" />
		<title></title>
	</svg>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, shallowRef, triggerRef, computed, watchEffect } from 'vue';
import { interval, take } from 'rxjs';
const IconSvg = defineComponent({
    name: 'IconSvg',
    props: {
        // 当前 svg 的文件名，如 arrow-left.svg，该值就应该是 arrow-left
        filename: {
            type: String,
            required: true
        },

        // 自定义的 class，非必填
        className: {
            type: String,
            default: ''
        },
        // size 图标大小
        size: {
            type: String,
            default: '14px'
        },
        hover: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
        const _iconName = ref<string>(''); // 私有变量使用下划线标注， 用于和iconName区分， 必须得是响应式的， computed 或者 watch 才能监听到变化更新dom
        // eslint-disable-next-line vue/no-setup-props-destructure
        const { filename, className, size, hover }: any = props;

        // computed-------------------------------------------------------------------------------------------start
        const svgClass = computed(() => {
            return 'svg-icon' + (className ? ' ' + className : '');
        });
        const iconName = computed(() => {
            return `#icon-${_iconName.value}`;
        });
        // computed-------------------------------------------------------------------------------------------end
        // 生命周期-------------------------------------------------------------------------------------------start

        onMounted(() => {
            _iconName.value = filename;
        });
        // 生命周期-------------------------------------------------------------------------------------------end
        // methoeds-------------------------------------------------------------------------------------------start
        const mouseenter = () => {
            if (hover) {
                _iconName.value = hover;
            }
        };

        const mouseleave = () => {
            if (hover) {
                _iconName.value = filename;
            }
        };
        // methoeds-------------------------------------------------------------------------------------------end

        // watch-------------------------------------------------------------------------------------------start
        // watch-------------------------------------------------------------------------------------------end

        // watchEffect-------------------------------------------------------------------------------------------start
        // watchEffect-------------------------------------------------------------------------------------------end
        return {
            svgClass,
            iconName,
            mouseenter,
            mouseleave
        };
    }
});
export default IconSvg;
</script>

<style scoped>
.svg-icon {
	width: 1em;
	height: 1em;
	fill: currentColor;
	overflow: hidden;
}
</style>
