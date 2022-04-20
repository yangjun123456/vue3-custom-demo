<template>
  <div style="overflow:auto;">
    <h1>说明： 记住模板的子树。可用于元素和组件。该指令需要一个固定长度的依赖值数组来比较记忆。如果数组中的每个值都与上次渲染相同，则将跳过整个子树的更新。</h1>
    <br>
    <h1>说明： v-memo="[valueA, valueB]" 中 valueA 和 valueB等组成了一个条件list， 只要有一个条件产生了变化，那么更新子树dom， 如果全部相同，那么跳过子树dom的更新</h1>
    <br>
    <h1 style="font-size: 20px;">v-memo指令 没有明显的页面展示效果</h1>
    <br>
    <div v-for="item in list"
      :key="item.key"
      v-memo="[item.name]">
      <p>name: {{item.name}} - ID: {{ item.id }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, shallowRef, triggerRef } from 'vue';
import { interval, take, timer } from 'rxjs';
const VMemo = defineComponent({
    name: 'VMemo',
    setup(props, context) {
        const list = ref([
            { name: 'a', id: '01', key: '01' },
            { name: 'b', id: '02', key: '02' },
            { name: 'c', id: '01', key: '03' },
            { name: 'd', id: '04', key: '04' },
            { name: 'e', id: '01', key: '05' },
            { name: 'f', id: '06', key: '06' },
            { name: 'g', id: '01', key: '07' },
            { name: 'h', id: '08', key: '08' },
            { name: 'i', id: '01', key: '09' },
            { name: 'j', id: '10', key: '10' },
            { name: 'k', id: '11', key: '11' },
            { name: 'l', id: '12', key: '12' },
            { name: 'm', id: '11', key: '13' },
            { name: 'n', id: '14', key: '14' },
            { name: 'o', id: '11', key: '15' },
            { name: 'p', id: '16', key: '16' },
            { name: 'q', id: '11', key: '17' },
            { name: 'q', id: '20', key: '18' }
        ]);

        timer(2000).pipe(take(!!list.value)).subscribe(() => {
            list.value[1].name = '111111';
        })
        timer(5000).pipe(take(!!list.value)).subscribe(() => {
            console.log('timer调用了');
            list.value[10].name = 'new name';
        });
        return { list };
    }
});
export default VMemo;
</script>
<style lang="scss" scoped>
</style>
