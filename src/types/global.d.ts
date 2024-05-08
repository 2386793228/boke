export declare type Recordable<T = any> = Record<string, T>
export declare interface ViteEnv {
  VITE_PORT: number
  VITE_USE_MOCK: boolean
  VITE_USE_PWA: boolean
  VITE_PUBLIC_PATH: string
  VITE_PROXY: [string, string][]
}
declare global {
  declare interface Window {}
}
