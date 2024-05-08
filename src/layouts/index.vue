<!-- 全局组件  -->
<template>
  <a-layout :class="prefixCls">
    <!-- 顶部导航模式 -->
    <a-layout :class="`${prefixCls}-main`">
      <!-- 顶部导航，一些二级页没有例如纸卡页 -->
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
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'

  const { currentRoute } = useRouter()

  const hideLayout = computed(() => {
    const hideLayout = currentRoute?.value?.meta?.hideLayout || false
    return hideLayout
  })

  const prefixCls = ref('layout')
</script>
<style lang="less">
  .layout {
    width: 100%;
    min-height: 100%;
    &-main {
    }
  }
</style>
