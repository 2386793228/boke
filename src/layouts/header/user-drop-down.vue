<!-- 用户下拉，退出等操作 -->
<template>
  <a-dropdown overlay-class-name="user-dropdown">
    <span class="user">
      <!-- <span>{{ userInfo.username }}</span> -->
    </span>
    <template #overlay>
      <a-menu>
        <a-menu-item key="logout" :onclick="handleLogout"> 退出登录</a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>
<script lang="ts" setup>
  // import { logout } from '@/api/user-api'
  import { useGo } from '@/hooks/use-page'
  import { ExclamationCircleFilled } from '@ant-design/icons-vue'
  import { Modal } from 'ant-design-vue'
  import { computed, createVNode } from 'vue'
  const go = useGo()
  const userInfo = computed(() => {
    return localStorage.getItem('userInfo')
  })
  const handleLogout = () => {
    Modal.confirm({
      title: '退出登录',
      content: '确定要退出系统吗？',
      closable: true,
      okText: '确定',
      okType: 'primary',
      cancelText: '取消',
      onOk() {
        // 退出登录 先直接清理缓存，防止登录过期导致的退出登录失败
        go('/login')
      },
      onCancel() {
        console.log('Cancel')
      },
      icon: createVNode(ExclamationCircleFilled)
    })
  }
</script>
<style lang="less">
  .user {
    font-size: 14px;
    display: flex;
    align-items: center;
    cursor: pointer;
    > span {
      margin-right: 4px;

      &:nth-of-type(2) {
        font-weight: 400;
        font-size: 14px;
        color: #333333;
      }
    }
  }
</style>
