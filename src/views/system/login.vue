<template>
  <div class="login"
    >login
    <Button @click="goHome" type="primary">login</Button>
  </div>
</template>
<script lang="ts" setup>
  import { Button } from 'ant-design-vue'
  import { useGo } from '@/hooks/use-page'
  const go = useGo()
  const goHome = () => {
    go('/home')
  }
</script>
<style lang="less" scoped></style>
