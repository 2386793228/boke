import { createApp } from 'vue'
import './assets/custom.less'
import App from './App.vue'
import { setupRouter } from './router'

async function setupApp() {
  const app = createApp(App)
  // 配置路由
  setupRouter(app)

  app.mount('#app')
}

setupApp()
