import type { AppRouteModule } from '@/types/router'

import { LAYOUT } from '../constant'
const My: AppRouteModule = {
  path: '/my',
  name: 'My',
  component: LAYOUT,
  redirect: '',
  meta: {
    title: '我的'
  },
  props: {
    isMenu: true,
    order: 3,
    key: 'My',
    label: '我的'
  },
  children: [
    {
      path: '',
      name: 'MyIndex',
      component: () => import('@/views/my/index.vue'),
      meta: {
        title: '首页',
        keepAlive: true
      }
    }
  ]
}

export default My
