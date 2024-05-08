import { createApp } from 'vue'
import './assets/css/custom.less'
import App from './App.vue'
import { setupRouter } from './router'
import registerGlobComp from '@/utils/iconfont'

async function setupApp() {
  const app = createApp(App)
  // 配置路由
  setupRouter(app)

  registerGlobComp(app)

  app.mount('#app')
}

setupApp()
