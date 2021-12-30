import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory
} from 'vue-router';
import { echartsRouteOptions } from './modules/echarts';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '',
        redirect: 'setupAndApiApply'
      },
      ...echartsRouteOptions,
      {
        path: 'setupAndApiApply',
        name: 'SetupAndApiApply',
        component: () => import('../views/setupAndApiApply/index.vue')
      }
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/index.vue')
  }
];

const router = createRouter({
  //   history: createWebHistory(process.env.BASE_URL),
  //   history: createWebHistory(),
  history: createWebHashHistory(),
  routes
});

export default router;
