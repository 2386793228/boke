import type { AppRouteModule } from '@/types/router'

import { LAYOUT } from '../constant'
const Study: AppRouteModule = {
  path: '/study',
  name: 'Study',
  component: LAYOUT,
  redirect: '',
  meta: {
    title: '学习笔记'
  },
  props: {
    isMenu: true,
    order: 2,
    key: 'Study',
    label: '学习'
  },
  children: [
    {
      path: 'js',
      name: 'StudyJs',
      redirect: '/study/js/one',
      meta: {
        title: 'js基础'
      },
      children: [
        {
          path: 'one',
          name: 'StudyJsOne',
          component: () => import('@/views/study/js/one.vue'),
          meta: {
            title: 'this指向'
          }
        }
      ]
    },
    {
      path: 'vue',
      name: 'StudyVue',
      meta: {
        title: 'vue3'
      },
      children: [
        {
          path: 'one',
          name: 'StudyVueOne',
          component: () => import('@/views/study/vue/one.vue'),
          meta: {
            title: 'proxy'
          }
        }
      ]
    }
  ]
}

export default Study
