import mockPlugin from './mock'
import { ViteEnv, Recordable } from '@/types/global'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import type { Plugin, ProxyOptions } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 为了方便devtools开发者工具查看组件自定义的name属性
import hljs from 'highlight.js/lib/core'
import markdownit from 'markdown-it'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import mdConfig from './md-config'

export function wrapperEnv(envConf: Recordable): ViteEnv {
  const ret: any = {}

  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n')
    realName = realName === 'true' ? true : realName === 'false' ? false : realName

    if (envName === 'VITE_PORT') {
      realName = Number(realName)
    }
    if (envName === 'VITE_PROXY' && realName) {
      try {
        realName = JSON.parse(realName.replace(/'/g, '"'))
      } catch (error) {
        realName = ''
      }
    }
    ret[envName] = realName
    if (typeof realName === 'string') {
      process.env[envName] = realName
    } else if (typeof realName === 'object') {
      process.env[envName] = JSON.stringify(realName)
    }
  }
  return ret
}

/**
 * Used to parse the .env.development proxy configuration
 */
type ProxyItem = [string, string]
type ProxyList = ProxyItem[]
type ProxyTargetList = Record<string, ProxyOptions>

const httpsRE = /^https:\/\//

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {}
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target)
    // https://github.com/http-party/node-http-proxy#options
    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ''),
      // https is require secure=false
      ...(isHttps ? { secure: false } : {})
    }
  }
  return ret
}
export function createVitePlugins(viteEnv: ViteEnv) {
  const { VITE_USE_MOCK } = viteEnv

  const vitePlugins: (Plugin | Plugin[])[] = [
    vue({
      include: [/\.vue$/, /\.md$/]
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vueSetupExtend(),
    createSvgIconsPlugin({
      // 指定需要缓存的图标文件夹
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      // 指定symbolId格式
      symbolId: 'icon-[dir]-[name]'
    }),
    mockPlugin(VITE_USE_MOCK),
    // antd 自动按需引入
    Components({
      dirs: ['ant-design-vue'],
      resolvers: [
        AntDesignVueResolver({
          importStyle: false // css in js
        })
      ]
    })
  ]

  return vitePlugins
}
