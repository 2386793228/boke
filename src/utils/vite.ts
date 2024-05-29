import mockPlugin from './mock'
import { ViteEnv, Recordable } from '@/types/global'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy'
import type { Plugin, ProxyOptions } from 'vite'
import vueSetupExtend from 'vite-plugin-vue-setup-extend' // 为了方便devtools开发者工具查看组件自定义的name属性
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import Markdown from 'vite-plugin-md'

import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

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

// markdown封装
function md() {
  const markdown = MarkdownIt({
    highlight: function (str: string, lang: string) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return (
            '<pre><code class="hljs">' +
            hljs.highlight(str, { language: lang }).value +
            '</code></pre>'
          )
        } catch (e) {}
      }
      return ''
    }
  })
  markdown.renderer.rules.link_open = function (
    tokens: any,
    idx: number,
    options: any,
    _env: any,
    self: any
  ) {
    const aIndex = tokens[idx].attrIndex('target')

    if (aIndex < 0) {
      tokens[idx].attrPush(['target', '_blank']) // 添加target属性
    } else {
      // 如果已存在target属性，确保它的值是_blank
      const a = tokens[idx].attrs[aIndex]
      if (a[1] !== '_blank') {
        a[1] = '_blank'
      }
    }

    // 调用原生link_open方法以继续渲染
    return self.renderToken(tokens, idx, options)
  }

  return markdown
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
    }),
    Markdown({
      markdownItOptions: {
        highlight: function (str: string, lang: string) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return (
                '<pre><code class="hljs">' +
                hljs.highlight(str, { language: lang }).value +
                '</code></pre>'
              )
            } catch (e) {}
          }
          return ''
        }
      },
      markdownItSetup(md) {
        md.renderer.rules.link_open = function (
          tokens: any,
          idx: number,
          options: any,
          _env: any,
          self: any
        ) {
          const aIndex = tokens[idx].attrIndex('target')

          if (aIndex < 0) {
            tokens[idx].attrPush(['target', '_blank']) // 添加target属性
          } else {
            // 如果已存在target属性，确保它的值是_blank
            const a = tokens[idx].attrs[aIndex]
            if (a[1] !== '_blank') {
              a[1] = '_blank'
            }
          }

          // 调用原生link_open方法以继续渲染
          return self.renderToken(tokens, idx, options)
        }
      }
    })
  ]

  return vitePlugins
}
