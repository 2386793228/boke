<template>
  <div class="layout-content">
    <div :class="contentClass">
      <page-sider v-if="sidebarMenus" :side-bar-menus="sidebarMenus" />
      <page-content :class="{ 'has-side': sidebarMenus }" />
    </div>
  </div>
</template>
<script lang="ts" setup name="LayoutContent">
  import { computed } from 'vue'
  import PageSider from '../aside/index.vue'
  import PageContent from '../page/index.vue'
  import { useRouter } from 'vue-router'

  import { useCommonStore } from '@/store/modules/common'

  const { currentRoute } = useRouter()
  const commonStore = useCommonStore()

  const props = defineProps(['hideLayout'])

  const menus = computed(() => {
    return commonStore.menus
  })

  const contentClass = computed(() => {
    return !props.hideLayout ? 'layout-page-content' : ''
  })

  const sidebarMenus = computed(() => {
    const currentMenu = menus.value.find((v) => currentRoute.value.path.indexOf(v.path) > -1)

    if (currentMenu!.children?.length >= 2) {
      commonStore.setData('showSidebar', true)
      // 设置选中二级导航/以及sidebar选中key，解决刷新路由二级导航没选中bug
      const subCurrentMenu = currentMenu?.children.find(
        (m) => currentRoute.value.path.indexOf(m.path) > -1
      )
      const index = location.hash.slice(1).lastIndexOf('/')
      const lastPath = location.hash.slice(1).slice(index)
      commonStore.setData('firstRouteKey', currentMenu!.path)
      commonStore.setData('secondRouteKey', subCurrentMenu!.path)
      commonStore.setData('sideBarSelectKey', subCurrentMenu!.path + lastPath)

      return currentMenu?.children
    } else {
      commonStore.setData('firstRouteKey', currentMenu!.path)
      commonStore.setData('showSidebar', false)
      return false
    }
  })
</script>
<style lang="less" scoped>
  .layout-content {
    position: relative;
    flex: 1 1 auto;
    .layout-page-content {
      max-width: 1400px;
      min-width: 960px;
      padding: 0 32px;
      margin: auto;
      padding-bottom: 24px;
      overflow: hidden;
      .has-side {
        margin-left: 200px;
      }
    }
  }
</style>
