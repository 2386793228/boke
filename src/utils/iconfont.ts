import type { App } from 'vue'
import { createFromIconfontCN } from '@ant-design/icons-vue'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_1977503_ar5z1orfijr.js',
  extraCommonProps: {
    class: 'icon-font'
  }
})

// 全局注册
export default function registerGlobComp(app: App) {
  app.component('icon-font', IconFont)
}

