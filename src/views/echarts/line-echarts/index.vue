<template>
	<div class="line-echarts-body">
		<div ref="lineEcharts"
			class="line-echarts"
			:id="echartsId"
			:key="echartsId"></div>
	</div>
</template>

<script lang="ts">
import { inject, markRaw } from 'vue';
import { Options, Vue } from 'vue-class-component';
// vue-property-decorator 引入装饰器会在控制台报错，说 vue-class-component 没有导出component 因为在vue-property-decorator 中引入过这个东西，不过也不影响什么
import * as echarts from 'echarts';
import { interval, take, takeWhile } from 'rxjs';

@Options({
    data() {
        return {
            $uuid: '', // 声明定义变量 避免ts检查找不到报错，全局定义的具有优先级
            $getUuidv4: '',
            /* 声明定义全局变量值，避免ts检查报错-----------end */

            /* 定义data数据变量----------start */
            customId: '',
            echartsId: '',
            echartOptions: {}, // echarts 配置
            echartsInstance: '' // echarts实例
        };
    },
    inject: ['$getUuidv4'],
    props: {
        msg: String
    },
    computed: {
        getCustomId() {
            return this.customId;
        }
    },
    created() {
        this.customId = this.$getUuidv4();
        this.echartsId = this.$uuid();
        console.log('%c line-echarts/index.vue  uuid的两种使用方法==' + this.$getUuidv4() + '+++' + this.$uuid(), 'font-size: 20px;color: red;');
    },

    mounted() {
        this.initChart();
        this.setChartOptions();
        this.intervalRefreshUuid();
    },
    methods: {
        // 初始化实例
        initChart() {
            this.echartsInstance = markRaw(echarts.init(this.$refs.lineEcharts as any));
        },

        // 配置options
        setChartOptions() {
            this.echartOptions = {
                title: {
                    text: 'Stacked Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                },
                yAxis: {
                    type: 'value'
                },
                series: [
                    {
                        symbolSize: 12,
                        name: 'Email',
                        type: 'line',
                        stack: 'Total',
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: 'Union Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: 'Video Ads',
                        type: 'line',
                        stack: 'Total',
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: 'Direct',
                        type: 'line',
                        stack: 'Total',
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: 'Search Engine',
                        type: 'line',
                        stack: 'Total',
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                ]
            };
            this.echartsInstance.setOption(this.echartOptions);
        },

        intervalRefreshUuid() {
            interval(3000)
                .pipe(
                    take(3),
                    takeWhile(() => this.customId)
                )
                .subscribe(() => {
                    this.customId = this.$getUuidv4();
                });
        }
        /* 定义方法-----------------------end */
    },
    watch: {
        getCustomId: {
            handler(newVal, oldVal) {
                console.log(newVal, '=========', oldVal);
            },
            immediate: true,
            deep: true
        }
    }
})
export default class LineEcharts extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.line-echarts-body {
	font-size: 14px;
}
.line-echarts {
	width: 100%;
	height: 80vh;
}
</style>
