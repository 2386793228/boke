import type { RouteLocationRaw, LocationAsRelativeRaw } from 'vue-router'
import { useRouter } from 'vue-router'
import { isString } from '@/utils/is'

type GopPramsRaw = ((LocationAsRelativeRaw | RouteLocationRaw) & { isReplace?: boolean }) | 'path'
function handleError(e: Error) {
  console.error(e)
}

// page switch
export function useGo() {
  const router = useRouter()

  const { push, replace } = router
  function go(props: GopPramsRaw) {
    if (isString(props)) {
      push(props).catch(handleError)
      return
    }
    const { isReplace, ...rest } = props
    if (isReplace) {
      replace(rest).catch(handleError)
      return
    }
    push(rest).catch(handleError)
  }
  return go
}
