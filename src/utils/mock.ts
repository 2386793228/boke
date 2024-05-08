import type { Plugin } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

export default function mockPlugin(VITE_USE_MOCK: boolean) {
  return {
    ...viteMockServe({
      mockPath: 'mock', //mock文件路径，在根路径下创建一个mock文件
      enable: VITE_USE_MOCK, //mock开关
      ignore: /^\_/ //忽略开始_路径
    })
  } as Plugin
}
