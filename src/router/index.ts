import {
  createRouter,
  createWebHistory,
  RouteRecordRaw,
  createWebHashHistory
} from 'vue-router';
import { echartsRouteOptions } from './modules/echarts';
import { vue3DemoOptions } from './modules/vue3-demo';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/layout/index.vue'),
    children: [
      {
        path: '',
        redirect: 'testCommunication'
      },
      ...echartsRouteOptions,
      ...vue3DemoOptions
    ]
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home.vue')
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
