<!-- markdown侧边导航 -->
<template>
  <div class="paper-markdown-aside">
    <div class="head">
      <img src="/avator.jpg" alt="" />
      <span>云倚</span>
    </div>
    <Menu
      mode="inline"
      theme="dark"
      :style="{ lineHeight: '64px' }"
      :selected-keys="[sideBarSelectKey]"
      :open-keys="[openKeys]"
    >
      <sub-menu v-for="menu in sideBarMenus" :key="menu.path">
        <template #title>{{ menu.label }}</template>
        <menu-item
          v-for="subMenu in menu.children"
          :key="subMenu.path"
          @click="goSecondPath(subMenu)"
          >{{ subMenu.label }}</menu-item
        >
      </sub-menu>
    </Menu>
  </div>
</template>
<script lang="ts" setup name="PageSider">
  import { toRef } from 'vue'
  import { routerChildren } from '@/models/common-model'
  import { Menu, MenuItem, SubMenu } from 'ant-design-vue'
  import { useGo } from '@/hooks/use-page'
  import { storeToRefs } from 'pinia'
  import { useCommonStore } from '@/store/modules/common'

  defineProps({
    sideBarMenus: {
      type: Array<routerChildren>
    }
  })

  const go = useGo()
  const commonStore = useCommonStore()
  const { secondRouteKey, sideBarSelectKey } = storeToRefs(commonStore)
  const openKeys = toRef(secondRouteKey, 'value') // 测试响应式的代码，也可以直接页面[]

  // 二级导航切换
  const goSecondPath = (children: routerChildren) => {
    commonStore.setData('sideBarSelectKey', children.path)

    go(children.path)
  }
</script>
<style lang="less" scoped>
  .paper-markdown-aside {
    background: #161618;
    width: 200px;
    padding: 0 16px;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    z-index: 2;
    .head {
      height: 48px;
      line-height: 48px;
      color: #fff;
      font-size: 16px;
      border-bottom: 1px solid #2e2e32;
      display: flex;
      align-items: center;
      img {
        width: 24px;
        height: 24px;
        margin-right: 8px;
      }
    }
    .ant-menu {
      background: inherit;
      :deep(.ant-menu-sub) {
        background: inherit;
      }
    }
  }
</style>
