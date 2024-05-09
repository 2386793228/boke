<!-- 顶部导航栏 -->
<template>
  <div class="temp"></div>
  <div class="layout-header">
    <div class="layout-header-content">
      <span class="logo">
        <span>云倚</span>
      </span>
      <ul class="menu">
        <li
          v-for="item in menus"
          :key="item.key"
          :class="item.key === activeKey ? 'active' : ''"
          :onClick="() => handleMenuClick(item)"
          >{{ item.label }}</li
        >
        <li>
          <user-dropdown class="user-dropdown" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup name="LayoutHeader">
  import userDropdown from './user-drop-down.vue'
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
        console.log(item.children)

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
  .layout-header {
    position: fixed;
    top: 0;
    z-index: 2;
    width: 100%;
    padding: 0;
    .layout-header-content {
      position: relative;
      max-width: 1400px;
      min-width: 960px;
      padding: 0 32px;
      margin: auto;
      display: flex;
      justify-content: space-between;
      line-height: 48px;
      height: 48px;
      .logo {
        display: flex;
        align-items: center;
        font-size: 16px;
        color: @text-color;
        font-weight: 600;
        img {
          width: 24px;
          height: 24px;
          margin-right: 8px;
        }
      }
      .menu {
        display: flex;
        align-items: center;
        margin-left: 32px;
        li {
          padding: 0 12px;
          line-height: 40px;
          border-radius: 6px 6px 6px 6px;
          text-align: center;
          font-size: 14px;
          color: @text-color;
          cursor: pointer;
          list-style: none;
          &:hover,
          &.active {
            color: @primary-color;
            font-weight: 600;
          }
        }
      }
      .user-dropdown {
        position: absolute;
        right: 0;
      }
    }
  }
</style>
