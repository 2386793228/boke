import { createApp } from 'vue'
import './assets/css/custom.less'

import App from './App.vue'
import { setupRouter } from './router'
import setupStore from './store'

// import registerGlobComp from '@/utils/iconfont'

import 'highlight.js/styles/default.css'
import 'highlight.js/styles/github-dark.css'

async function setupApp() {
  const app = createApp(App)
  // 配置路由
  setupRouter(app)

  setupStore(app)

  // registerGlobComp(app)

  app.mount('#app')
}

setupApp()
