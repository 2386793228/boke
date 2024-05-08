<!-- 底部信息栏 -->
<template>
  <div class="layout-footer">
    <qw-center-frame><span class="bacode">浙ICP备2022027001号-1</span></qw-center-frame>
  </div>
</template>
<script lang="ts" setup name="LayoutFooter">
  import QwCenterFrame from '@/components/QwCenterFrame.vue'
</script>
<style lang="less">
  .layout-footer {
    position: fixed;
    bottom: 16px;
    // padding: 16px;
    z-index: 2;
    width: 100%;
    padding: 0;
    .bacode {
      font-weight: 400;
      font-size: 14px;
      color: #999999;
      line-height: 14px;
    }
  }
</style>
