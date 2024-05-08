import type { ConfigEnv, UserConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'node:path'

import { loadEnv } from 'vite'
import { wrapperEnv, createProxy, createVitePlugins } from './src/utils/vite'

export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd()
  const env = loadEnv(mode, root)
  const viteEnv = wrapperEnv(env)

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY } = viteEnv

  return {
    base: VITE_PUBLIC_PATH,
    plugins: createVitePlugins(viteEnv),
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY)
    },
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/assets/css/color.less')}";`
          },
          javascriptEnabled: true
        }
      }
    },
    build: {
      target: 'es2019'
    }
  }
}
