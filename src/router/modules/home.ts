import type { AppRouteModule } from '@/types/router'

import { LAYOUT } from '../constant'
const Home: AppRouteModule = {
  path: '/home',
  name: 'Home',
  component: LAYOUT,
  redirect: '',
  meta: {
    title: '首页'
  },
  props: {
    isMenu: true,
    order: 1
  },
  children: [
    {
      path: '',
      name: 'HomeIndex',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    },
  ]
}

export default Home
