<template>
  <div class="qw-layout-content">
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
    return !props.hideLayout ? 'qw-layout-page-content' : ''
  })
</script>
<style lang="less" scoped>
  .qw-layout-content {
    position: relative;
    flex: 1 1 auto;
    background-color: #f2f4ff;
    .qw-layout-page-content {
      width: 1600px;
      margin: auto;
      padding-bottom: 24px;
      overflow: hidden;
    }
    @media (max-width: 1600px) {
      .qw-layout-page-content {
        width: 1200px;
      }
    }
  }
</style>
