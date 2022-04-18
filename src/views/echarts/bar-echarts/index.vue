<template>
	<div class="bar-echarts-body">
		<div ref="barEcharts"
			class="bar-echarts"
			:id="echartsId"
			:key="echartsId"></div>
	</div>
</template>

<script lang="ts">
// 在options中进行开发
import { markRaw } from 'vue';
import { Options, Vue } from 'vue-class-component';
import * as echarts from 'echarts';
import { interval, take, takeWhile } from 'rxjs';

interface Data {
	uuid: string;
	echartsId: string;
	echartOptions: any;
	echartsInstance: any;
}

@Options({
  props: {
    msg: String
  },
  inject: ['$getUuidv4'],
  data(): Data {
    console.log(this.$route);
    return {
      uuid: '',
      echartsId: '',
      echartOptions: {}, // echarts 配置
      echartsInstance: null // echarts实例
    };
  },
  created() {
    this.initData(); // 初始化data
  },
  mounted() {
    this.initChart();
    this.setChartOptions();
    this.intervalRefreshUuid();
  },
  computed: {
    getCustomId() {
      return this.uuid;
    }
  },
  watch: {
    getCustomId: {
      handler(newVal, oldVal) {
        console.log('watch', newVal, '----', oldVal);
      },
      immediate: false,
      deep: true
    }
  },
  methods: {
    // 实例
    initChart() {
      this.echartsInstance = markRaw(echarts.init(this.$refs.barEcharts as any));
    },
    // 设置options
    setChartOptions() {
      this.echartOptions = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: 'Direct',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: 'Email',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: 'Union Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: 'Video Ads',
            type: 'bar',
            stack: 'Ad',
            emphasis: {
              focus: 'series'
            },
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: 'Search Engine',
            type: 'bar',
            data: [862, 1018, 964, 1026, 1679, 1600, 1570],
            emphasis: {
              focus: 'series'
            },
            markLine: {
              lineStyle: {
                type: 'dashed'
              },
              data: [[{ type: 'min' }, { type: 'max' }]]
            }
          },
          {
            name: 'Baidu',
            type: 'bar',
            barWidth: 5,
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [620, 732, 701, 734, 1090, 1130, 1120]
          },
          {
            name: 'Google',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [120, 132, 101, 134, 290, 230, 220]
          },
          {
            name: 'Bing',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [60, 72, 71, 74, 190, 130, 110]
          },
          {
            name: 'Others',
            type: 'bar',
            stack: 'Search Engine',
            emphasis: {
              focus: 'series'
            },
            data: [62, 82, 91, 84, 109, 110, 120]
          }
        ]
      };
      this.echartsInstance.setOption(this.echartOptions);
    },
    // 定时更新uuid，使用watch监听
    intervalRefreshUuid() {
      // 使用interval 测试watch
      interval(3000)
        .pipe(
          take(3),
          takeWhile(() => this.uuid)
        ) // 直到uuid 消失 取消定时器
        .subscribe(() => {
          this.uuid = this.$getUuidv4();
        });
    },
    // 初始化data
    initData() {
      // 初始化uuid，data中不能直接获取到this.$uuid,需要created后获取 created 中赋值操作
      this.uuid = this.$getUuidv4(); // provide 引入方式调用 类型会报错 inject 方法不能直接调用
      this.echartsId = this.$uuid(); // globalProperties 引入方式调用
      console.log('%c bar-echarts/index.vue  uuid的两种使用方法==' + this.$getUuidv4() + '+++' + this.$uuid(), 'font-size: 20px;color: red;');
    }
  }
})
export default class BarEcharts extends Vue {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.bar-echarts-body {
	font-size: 14px;
}
.bar-echarts {
	width: 100%;
	height: 80vh;
}
</style>
