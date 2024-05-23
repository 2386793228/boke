<!-- 全局组件  -->
<template>
  <a-layout :class="prefixCls">
    <!-- 顶部导航模式 -->
    <a-layout :class="`${prefixCls}-main`">
      <!-- 顶部导航，一些二级页没有 -->
      <layout-header v-if="!hideLayout" />
      <layout-content :hideLayout />
      <!-- <layout-footer /> -->
    </a-layout>
    <!-- 左侧导航模式 -->
  </a-layout>
</template>
<script lang="ts" setup name="Layout">
  import LayoutHeader from './header/index.vue'
  import LayoutContent from './content/index.vue'
  // import LayoutFooter from './footer/Index.vue'
  import { ref, computed, onBeforeMount } from 'vue'
  import { routerChildren } from '@/models/common-model'
  import { useRouter } from 'vue-router'
  import type { RouteRecordRaw } from 'vue-router'
  import router from '@/router'
  import { useCommonStore } from '@/store/modules/common'

  const { currentRoute } = useRouter()
  const commonStore = useCommonStore()

  const hideLayout = computed(() => {
    const hideLayout = currentRoute?.value?.meta?.hideLayout || false
    return hideLayout
  })

  const prefixCls = ref('layout')

  const setMenus = () => {
    const menuRoutes = router
      .getRoutes()
      .filter((item) => {
        const routeProps: any = item.props.default
        return routeProps && routeProps.isMenu
      })
      .sort((a, b) => {
        const aRouteProps: any = a.props.default
        const bRouteProps: any = b.props.default
        return aRouteProps.order - bRouteProps.order
      })
      .map((item) => {
        const childrens = item!.children.map((t: RouteRecordRaw) => {
          const subChildren: routerChildren[] = []
          t.children?.map((v: RouteRecordRaw) => {
            subChildren.push({
              label: v.meta!.title as string,
              path: item.path + '/' + t.path + '/' + v.path
            })
          })
          return {
            path: item.path + '/' + t.path,
            label: t.meta!.title as string,
            redirect: t.redirect as string,
            children: subChildren
          }
        })
        const routeProps: any = item.props.default
        return {
          key: routeProps.key,
          label: routeProps.label,
          order: routeProps.order,
          path: item.path,
          children: childrens.length > 1 ? childrens : []
        }
      })
    return menuRoutes
  }

  onBeforeMount(() => {
    commonStore.setData('menus', setMenus())
  })
</script>
<style lang="less">
  .layout {
    width: 100%;
    min-height: 100%;
    &-main {
    }
  }
</style>
