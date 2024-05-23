<!-- 顶部导航栏 -->
<template>
  <div class="temp"></div>
  <div class="layout-header">
    <div class="layout-header-content">
      <span class="logo">
        <span v-if="!showSidebar">云倚</span>
      </span>
      <ul class="menu">
        <li
          v-for="item in menus"
          :key="item.path"
          :class="item.path === firstRouteKey ? 'active' : ''"
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
  import { storeToRefs } from 'pinia'
  import { routerChildren } from '@/models/common-model'
  import { useGo } from '@/hooks/use-page'
  import { useCommonStore } from '@/store/modules/common'

  const go = useGo()
  const commonStore = useCommonStore()

  const { menus, firstRouteKey, secondRouteKey, showSidebar } = storeToRefs(commonStore)

  // 一级导航切换
  const handleMenuClick = (menu: any) => {
    const { key, path } = menu
    commonStore.setData('firstRouteKey', key)
    commonStore.setData('secondRouteKey', '')
    if (menu.children.length < 2) {
    } else {
    }

    go(path)
  }
  // 二级导航切换
  const goSecondPath = (children: routerChildren, firstKey: string) => {
    commonStore.setData('firstRouteKey', firstKey)
    commonStore.setData('secondRouteKey', children.path)
    commonStore.setData('sideBarSelectKey', children.path + '/one') // 默认选中第一篇
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
    background: #1b1b1f;
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
        color: #fff;
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
          color: #fff;
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
