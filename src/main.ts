import { createApp } from 'vue'
import './assets/css/custom.less'

import 'virtual:svg-icons-register'
import App from './App.vue'
import { setupRouter } from './router'
import setupStore from './store'
import svgIcon from './components/svgIcon'

// import registerGlobComp from '@/utils/iconfont'

import 'highlight.js/styles/default.css'
import 'highlight.js/styles/github-dark.css'

async function setupApp() {
  const app = createApp(App)
  // 配置路由
  setupRouter(app)

  setupStore(app)

  // registerGlobComp(app)
  app.use(svgIcon)
  app.mount('#app')
}

setupApp()
