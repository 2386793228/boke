import { defineStore } from 'pinia'
import { menuItem } from '@/models/common-model'
interface commonState {
  menus: menuItem[]
  firstRouteKey: string
  secondRouteKey: string
  showSidebar: boolean
  sideBarSelectKey: string // 左侧sidebar选中key
}

export const useCommonStore = defineStore({
  id: 'yunyi-common',
  state: (): commonState => ({
    menus: [],
    firstRouteKey: '',
    secondRouteKey: '',
    showSidebar: false,
    sideBarSelectKey: ''
  }),
  getters: {
    getSecondRouteKey(): string {
      return this.secondRouteKey
    }
  },
  actions: {
    setData<T extends keyof commonState>(item: T, data: commonState[T]): void {
      this.$state[item] = data
    }
  }
})
