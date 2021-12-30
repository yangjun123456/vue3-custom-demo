<template>
  <div class="table-body">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="address" label="地址"> </el-table-column>
      </el-table>
  </div>
</template>

<script lang="ts">
import { inject, markRaw } from 'vue';
import { Options, Vue } from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';
import * as echarts from 'echarts';
import { interval, take, takeWhile } from 'rxjs';

@Options({
  inject: ['$getUuidv4']
})
export default class Table extends Vue {
  /* Prop 传参------------start */
  @Prop({ default: '' }) msg!: string;
  /* Prop 传参------------end */

  /* 声明定义全局变量值，避免ts检查报错-----------start */
  $uuid!: any; // 声明定义变量 避免ts检查找不到报错，其值会获取全局定义的值
  $getUuidv4!: any;
  /* 声明定义全局变量值，避免ts检查报错-----------end */

  /* 定义data数据变量----------start */
  customId: any = '';
  echartsId: string = '';
  echartOptions: any = {}; // echarts 配置
  echartsInstance!: any; // echarts实例
  tableData = [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄'
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄'
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄'
    }
  ];
  /* 定义data数据变量----------end */

  /* 定义生命周期----------------start */
  created() {
    console.log('created');
  }

  mounted() {
    console.log('mounted');
  }
  /* 定义生命周期----------------end */

  /* 定义方法-----------------------start */

  // 获取表格list
  getList() {
    console.log('getList');
  }

  // 更新table数据
  update() {
    console.log('update');
  }

  // 初始化table
  initTable() {
    console.log('initTable');
  }

  // 导入文件
  importFile() {
    console.log('importFile');
  }
  /* 定义方法-----------------------end */

  /* 定义computed-----------------------start */
  //   get getCustomId() {
  //     return this.customId;
  //   }
  /* 定义computed-----------------------end */

  /* 定义watch-----------------------start */
//   @Watch('getCustomId', { deep: true, immediate: true })
//   fun(newVal: string, oldVal: string) {
//     console.log(newVal, '=========', oldVal);
//   }
  /* 定义watch-----------------------end */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table-body {
  font-size: 14px;
}
.table {
  width: 100%;
  height: 80vh;
}
</style>
