import type { AppRouteModule } from '@/types/router'

import { LAYOUT } from '../constant'
const Study: AppRouteModule = {
  path: '/study',
  name: 'Study',
  component: LAYOUT,
  redirect: '/study/js',
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
          component: () => import('@/views/study/js/one.md'),
          meta: {
            title: 'this指向'
          }
        },
        {
          path: 'two',
          name: 'StudyJsTwo',
          component: () => import('@/views/study/js/two.md'),
          meta: {
            title: 'script脚本'
          }
        }
      ]
    },
    {
      path: 'vue',
      name: 'StudyVue',
      redirect: '/study/vue/one',
      meta: {
        title: 'vue3'
      },
      children: [
        {
          path: 'one',
          name: 'StudyVueOne',
          component: () => import('@/views/study/vue/one.vue'),
          meta: {
            title: 'vue的proxy'
          }
        }
      ]
    }
  ]
}

export default Study
