// src/components/index.js
import SvgIcon from './index.vue'
import type { App } from 'vue'
export default {
  install(app: App) {
    app.component('SvgIcon', SvgIcon)
  }
}