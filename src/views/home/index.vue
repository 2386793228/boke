<template>
  <div class="home">
    <h1>Welcome to yunyi's Blog</h1>
    <p>随笔记录你的美好瞬间</p>
    <canvas id="universe" />
  </div>
</template>
<script lang="ts" setup name="Home">
  import { onMounted } from 'vue'
  import dark from '@/utils/universe'

  onMounted(() => {
    dark()
  })
</script>
<style lang="less" scoped>
  .home {
    padding: 128px 24px 24px;
    text-align: center;
    h1 {
      font-size: 24px;
      color: #fff;
    }
    p {
      color: @text-sub-color;
    }
  }
  #universe {
    display: block;
    position: fixed;
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 999;
  }
</style>
