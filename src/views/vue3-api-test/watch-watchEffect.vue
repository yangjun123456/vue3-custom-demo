<template>
  <div class="watch-watcheffect"
    style="text-align: left">
    <h1>watch 和 watchEffect</h1>
    <br>
    <hr>
    <br>
    <h4>watch 和 watchEffect 只能监听响应式数据，响应式数据会更新到dom如ref、reactive，数据变化后更新不到dom的都不能被监听到如toRaw、makeRaw等</h4>
    <br>
    <hr>
    <h4>watch 可以设置immediate参数设置是否初始加载，还有deep 深度监听</h4>
    <br>
    <hr>
    <h4>watchEffect 初始化时自动加载代码，检测响应式的值，如果有响应式的值变化，自动执行整个watchEffect</h4>
    <br>
    <hr>
    <br>
    <h4>效果再console.log中打印</h4>
    <br>
    <hr>
    <br>
    <div>watch 监听的布尔值====== {{testWatch}}</div>
    <div>watchEffect 监听的布尔值====== {{testWatchEffect}}</div>
    <div></div>
  </div>
</template>

<script lang="ts">
// 本组件调试setup的两个参数
import { interval, take, timer } from 'rxjs';
import {
    defineComponent,
    markRaw,
    toRef,
    toRefs,
    toRaw,
    reactive,
    ref,
    onMounted,
    watchEffect,
    watch,
    computed,
    getCurrentInstance,
    shallowRef,
    shallowReactive,
    inject,
    triggerRef,
    effectScope
} from 'vue';

// setup 中使用watch、computed、ref、reactive
const WatchAndWatchEffect = defineComponent({
    name: 'WatchAndWatchEffect',
    components: {},
    props: {
        room: {
            type: String,
            default: ''
        },
        state: {
            type: Object,
            default: () => {
                return {};
            }
        },
        title: {
            type: String,
            default: ''
        }
    },
    setup(props, context) {
    /* watch------------------------------------------------------------------------------------start */
        const testWatch = ref(0);
        const testWatchStop = watch(testWatch, (newVal, oldVal) => {
            console.log('testWatch----------', newVal, oldVal);
        });

        interval(1000)
            .pipe(take(2))
            .subscribe(
                () => {
                    testWatch.value++;
                    console.log('watch--------next');
                },
                () => {
                    console.log('watch--------error');
                },
                () => {
                    console.log('watch--------complete');
                    timer(0).subscribe(() => {
                        testWatchStop(); // 清除watch
                        timer(100)
                            .pipe(take(1))
                            .subscribe(() => {
                                // 再触发监听不到了
                                testWatch.value++; // 但还是响应式的仍可以触发dom更新
                            });
                    });
                }
            );
        /* watch------------------------------------------------------------------------------------end */

        /* watchEffect------------------------------------------------------------------------------------start */
        const testWatchEffect = ref(1);
        watchEffect(() => {
            console.log('testWatchEffect--------', testWatchEffect.value);
        });
        timer(3000)
            .pipe(take(!!testWatchEffect.value))
            .subscribe(() => {
                interval(1000)
                    .pipe(take(3))
                    .subscribe(() => {
                        testWatchEffect.value++;
                    });
            });
        /* watchEffect------------------------------------------------------------------------------------end */

        /* effectScope-------------------------------------------------------------------------------------start */
        // 创建一个 effect 作用域对象，以捕获在其内部创建的响应式 effect (例如计算属性或侦听器)，使得这些 effect 可以一起被处理。
        const scope = effectScope();
        const counter = ref(1);

        scope.run(() => {
            const doubled = computed(() => counter.value * 2);

            watch(doubled, () => console.log(doubled.value));

            watchEffect(() => console.log('Count: ', doubled.value));
        });
        counter.value++;
        timer(2000).subscribe(() => {
            // 处理该作用域内的所有 effect
            counter.value++;
            scope.stop(); // 统一清除scope内的所有监听，处理后下边的counter的变化，不能被watch和watchEffect监听到了
            counter.value++;
        });
        /* effectScope-------------------------------------------------------------------------------------end */
        return {
            props,
            context,
            testWatch,
            testWatchEffect
        };
    }
});

export default WatchAndWatchEffect;
</script>
