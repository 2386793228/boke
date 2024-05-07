import type { RouteMeta, RouteRecordRaw } from 'vue-router'

import { defineComponent } from 'vue'

export interface metaRaw extends RouteMeta {
  hideLayout?: boolean // 一些制卡页等 需要隐藏头部导航菜单
}

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta: metaRaw
  component?: Component | string
  components?: Component
  children?: AppRouteRecordRaw[]
  props?: Recordable
  fullPath?: string
}

export type AppRouteModule = AppRouteRecordRaw
