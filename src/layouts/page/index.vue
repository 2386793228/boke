<!-- 页面主体 -->
<template>
  <router-view>
    <template #default="{ Component, route }">
      <transition name="fade-slide" mode="out-in" appear>
        <keep-alive v-if="openCache" :include="cacheRouters">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
        <component v-else :is="Component" :key="route.fullPath" />
      </transition>
    </template>
  </router-view>
</template>
<script lang="ts" setup name="PageContent">
  import { ref } from 'vue'
  import Routes from '@/router/basic'
  import { AppRouteRecordRaw } from '@/types/router'
  import { onBeforeRouteUpdate } from 'vue-router'

  const openCache = ref(true)
  const cacheRouters: string[] = []

  const app = document.getElementById('app')
  // 所有的页面滚动都在 app上，切换到新页面时，滚动到顶部
  onBeforeRouteUpdate(() => {
    // 微任务驱动（保证生命周期结束，渲染之前，避免页面闪烁
    requestAnimationFrame(() => {
      app?.scrollIntoView()
    })
  })

  getKeepAliveItem(Routes)
  function getKeepAliveItem(routers: AppRouteRecordRaw[]) {
    routers.forEach((router) => {
      if (router.meta?.keepAlive === true) {
        cacheRouters.push(router.name)
      } else if (router.children) {
        getKeepAliveItem(router.children)
      }
    })
  }
</script>
