import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'
import Routes from './basic'

// 路由白名单
// const ROUTER_WHITE_LIST = ['/login', '/404', '/500']

const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_PUBLIC_PATH),
  routes: Routes as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

// 路由拦截
router.beforeEach(async (to, _from, next) => {
  if (!router.hasRoute(to.name as string)) {
    next('/404')
  }
  // // 非白名单，且用户未登录，跳转登录
  // if (!ROUTER_WHITE_LIST.includes(to.path) && !localStorage.getItem('userInfo')) {
  //   next('/login')
  // }
  next()
})

export function setupRouter(app: App<Element>) {
  app.use(router)
}

export default router
