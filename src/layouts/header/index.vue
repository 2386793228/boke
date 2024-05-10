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
          :class="item.key === firstRouteKey ? 'active' : ''"
          :onClick="() => handleMenuClick(item)"
        >
          <Dropdown
            v-if="item.children.length"
            :arrow="true"
            trigger="hover"
            overlay-class-name="header-menu-dropdown"
          >
            <span>{{ item.label }}</span>
            <template #overlay>
              <Menu :selectedKeys="[secondRouteKey]">
                <menu-item
                  v-for="children in item.children"
                  :key="children.path"
                  @click="goSecondPath(children, item.key)"
                >
                  <a>{{ children.label }}</a>
                </menu-item>
              </Menu>
            </template>
          </Dropdown>

          <span v-else> {{ item.label }}</span>
        </li>
        <li>
          <user-dropdown class="user-dropdown" />
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup name="LayoutHeader">
  import { Dropdown, Menu, MenuItem } from 'ant-design-vue'
  import userDropdown from './user-drop-down.vue'
  import { computed, onMounted } from 'vue'
  import router from '@/router'
  import { storeToRefs } from 'pinia'
  import type { RouteRecordRaw } from 'vue-router'
  import { useCommonStore } from '@/store/modules/common'
  import { useGo } from '@/hooks/use-page'

  interface children<T> {
    path: T
    label: T
    redirect: T
  }

  const go = useGo()
  const commonStore = useCommonStore()

  const { firstRouteKey, secondRouteKey } = storeToRefs(commonStore)

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
        const childrens: children<string>[] = item!.children.map((t: RouteRecordRaw) => {
          return {
            path: item.path + '/' + t.path,
            label: t.meta!.title as string,
            redirect: t.redirect as string
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
  })

  onMounted(() => {
    const currentRoute = location.hash.slice(1)
    console.log(currentRoute)
    console.log(menus.value)

    const currentMenu = menus.value.find((item) => item.path.indexOf(currentRoute) !== -1)
    if (currentMenu) {
      commonStore.setData('firstRouteKey', currentMenu.key)
    }
  })

  const handleMenuClick = (menu: any) => {
    const { key, path } = menu
    if (menu.children.length < 2) {
    }
    commonStore.setData('firstRouteKey', key)
    go(path)
  }
  const goSecondPath = (children: children, firstKey: string) => {
    commonStore.setData('firstRouteKey', firstKey)
    commonStore.setData('secondRouteKey', children.path)
    go(children.path)
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
