<!-- src/components/SvgIcon.vue -->
<template>
  <svg aria-hidden="true" class="svg-icon">
    <use :href="symbolId" :fill="color"/>
  </svg>
</template>
 
<script setup>
import { computed } from 'vue'
 
const props = defineProps({
  // 图标名称
  name: {
    type: String,
    required: true
  },
  // 图标颜色
  color: {
    type: String,
    default: '#333'
  },
  // 图标大小
  size: {
    type: [Number, String],
    default: 16
  }
})
 
// 计算图标的symbolId
const symbolId = computed(() => `#icon-${props.name}`)
</script>
 
<style scoped>
.svg-icon {
  width: v-bind('`${props.size}px`');
  height: v-bind('`${props.size}px`');
  vertical-align: middle;
  fill: currentColor;
  overflow: hidden;
}
</style>