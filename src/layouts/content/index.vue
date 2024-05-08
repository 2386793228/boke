<template>
  <div class="layout-content">
    <div :class="contentClass">
      <page-content />
    </div>
  </div>
</template>
<script lang="ts" setup name="LayoutContent">
  import { computed } from 'vue'
  import PageContent from '../page/index.vue'

  const props = defineProps(['hideLayout'])

  const contentClass = computed(() => {
    return !props.hideLayout ? 'layout-page-content' : ''
  })
</script>
<style lang="less" scoped>
  .layout-content {
    position: relative;
    flex: 1 1 auto;
    .layout-page-content {
      width: 1600px;
      margin: auto;
      padding-bottom: 24px;
      overflow: hidden;
    }
    @media (max-width: 1600px) {
      .layout-page-content {
        width: 1200px;
      }
    }
  }
</style>
