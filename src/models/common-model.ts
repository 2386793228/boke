export interface routerChildren {
  path: string
  label: string
  redirect?: string
  children?: Array<routerChildren>
}
export interface menuItem {
  key: string
  label: string
  order: number
  path: string
  children: Array<routerChildren>
}
