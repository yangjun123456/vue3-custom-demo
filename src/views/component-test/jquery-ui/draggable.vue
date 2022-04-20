<template>
	<div class="draggable">
        <div class="inputs">
            start:<el-input v-model="counts[0]"></el-input>
            drag:<el-input v-model="counts[1]"></el-input>
            stop:<el-input v-model="counts[2]"></el-input>
        </div>
		<div id="draggable-2">
            draggable-2
            <p style="background:#fff;">handle: "p"</p>
        </div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
declare const $: any;
const DraggableCom = defineComponent({
    name: 'DraggableCom',
    setup(props, context) {
        const counts = ref([0, 0, 0]);
        onMounted(() => {
            // console.log($);
            // $('#draggable-1').draggable({});
            $('#draggable-2').draggable({
                cursor: 'move', // 鼠标样式
                containment: '.el-main', // 父级类名， 只能在el-main里边拖动
                scroll: false, // 不允许出现滚动条
                handle: 'p',
                start: function () {
                    // 开始
                    counts.value[0]++;
                },
                drag: function () {
                    // 拖动中
                    counts.value[1]++;
                },
                stop: function () {
                    // 停止
                    counts.value[2]++;
                }
            });
            // debugger;
        });
        return { props, counts };
    }
});
export default DraggableCom;
</script>

<style lang="scss" scoped>
.draggable {
	width: 100%;
	height: 100%;
}
.inputs{
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
#draggable-2 {
	width: 200px;
	height: 200px;
	background-color: red;
}
</style>
