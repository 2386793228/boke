<template>
  <div class="my">
    <ul>
      <li>
        <a href="https://github.com/2386793228?tab=repositories">
          <p><svg-icon name="github" /><span>github</span></p>
          <p>持久的学习才能不断变强</p>
        </a>
      </li>
      <li>
        <a href="https://juejin.cn/user/3605989126050861">
          <p><svg-icon name="juejin" /><span>掘金</span></p>
          <p>慢慢成长</p>
        </a>
      </li>
    </ul>
    
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
.my {
  ul {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    padding: 100px;
    gap: 16px;
    li {
      width: 200px;
      height: fit-content;
      background: #fff;
      padding: 16px;
      border-radius: 8px;
      list-style: none;
      a {
        p {
          color: #333;
          svg {
            margin-right: 8px;
          }
        }
      }
    }
  }
}
</style>