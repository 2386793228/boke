import { AppRouteModule, AppRouteRecordRaw } from '@/types/router'

const modules: Record<string, any> = import.meta.glob('./modules/*.ts', { eager: true })

const routeModuleList: AppRouteModule[] = [] // 所有的路由通过这个导入
const modulePaths = Object.keys(modules)

modulePaths.forEach((key: string) => {
  const mod = modules[key].default || {}
  const modList = Array.isArray(mod) ? [...mod] : [mod]
  routeModuleList.push(...modList)
})

const basicRoutes: AppRouteRecordRaw[] = [
  {
    path: '/',
    name: 'Root',
    redirect: '/login',
    meta: {
      title: 'Root'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/system/login.vue'),
    meta: {
      title: '登录页'
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/system/404.vue'),
    meta: {
      title: '404'
    }
  },
  {
    path: '/500',
    name: 'ServiceError',
    component: () => import('@/views/system/500.vue'),
    meta: {
      title: 'ServiceError'
    }
  }
]

export default [...basicRoutes, ...routeModuleList]
