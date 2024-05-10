import { defineStore } from 'pinia'

interface commonState {
  firstRouteKey: string
  secondRouteKey: string
}

export const useCommonStore = defineStore({
  id: 'yunyi-common',
  state: (): commonState => ({
    firstRouteKey: '',
    secondRouteKey: ''
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
