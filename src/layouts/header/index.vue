<!-- 顶部导航栏 -->
<template>
  <div class="temp"></div>
  <div class="qw-layout-header">
    <div class="qw-layout-header-content">
      <!-- <qw-logo size="176" /> -->
      <ul class="qw-menu">
        <li
          v-for="item in menus"
          :key="item.key"
          :class="item.key === activeKey ? 'active' : ''"
          :onClick="() => handleMenuClick(item)"
          >{{ item.label }}</li
        >
      </ul>
      <user-dropdown class="user-dropdown" />
    </div>
  </div>
</template>
<script lang="ts" setup name="LayoutHeader">
  import UserDropdown from './user-drop-down.vue'
  import { computed, onMounted } from 'vue'
  import { ref } from 'vue'
  import router from '@/router'
  import { useGo } from '@/hooks/use-page'

  const go = useGo()
  const activeKey = ref<string>()

  const menus = computed(() => {
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
        const routeProps: any = item.props.default
        return {
          key: routeProps.key,
          label: routeProps.label,
          order: routeProps.order,
          path: item.path
        }
      })
    return menuRoutes
  })

  onMounted(() => {
    const currentRoute = location.hash.slice(1)
    const currentMenu = menus.value.find((item) => item.path.indexOf(currentRoute) !== -1)
    if (currentMenu) {
      activeKey.value = currentMenu.key
    }
  })

  const handleMenuClick = (menu: any) => {
    const { key, path } = menu
    activeKey.value = key
    go(path)
  }
</script>
<style lang="less">
  .temp {
    height: 48px;
  }
  .qw-layout-header {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    padding: 0;
    border-bottom: 1px solid #eee;
    box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
    background: #ffffff;
    .qw-layout-header-content {
      position: relative;
      width: 1600px;
      margin: auto;
      display: flex;
      line-height: 48px;
      height: 48px;
      .qw-menu {
        display: flex;
        align-items: center;
        margin-left: 32px;
        li {
          margin-right: 12px;
          width: 104px;
          line-height: 40px;
          border-radius: 6px 6px 6px 6px;
          text-align: center;
          font-size: 16px;
          color: #666666;
          cursor: pointer;
          &:hover,
          &.active {
            background: rgba(82, 69, 229, 0.1);
            color: #5245e5;
            font-weight: 600;
          }
        }
      }
      .user-dropdown {
        position: absolute;
        right: 0;
      }
    }
    @media (max-width: 1600px) {
      .qw-layout-header-content {
        width: 1200px;
      }
    }
  }
</style>
