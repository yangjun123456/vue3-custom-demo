export const echartsRouteOptions = [
  {
    path: 'lineEcharts',
    name: 'LineEcharts',
    component: () => import('../../views/echarts/line-echarts/index.vue')
  },
  {
    path: 'barEcharts',
    name: 'BarEcharts',
    component: () => import('../../views/echarts/bar-echarts/index.vue')
  }
]
