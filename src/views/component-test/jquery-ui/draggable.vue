<template>
	<div class="draggable">
		<div id="draggable-1"></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, shallowRef, triggerRef } from 'vue';
declare const $: any;
const DraggableCom = defineComponent({
    name: 'DraggableCom',
    setup(props, context) {
        onMounted(() => {
            // console.log($);
            $('#draggable-1').draggable({});
            // debugger;
        });
        return { props };
    }
});
export default DraggableCom;
</script>

<style lang="scss" scoped>
.draggable {
    width: 100%;
    height: 100%;
	display: flex;
	flex-wrap: wrap;
}
#draggable-1 {
	width: 50px;
	height: 50px;
	background-color: red;
}
</style>
