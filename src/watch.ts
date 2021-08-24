import { getCurrentInstance } from './runtime'
import { onBeforeDestroy } from './lifecycle'

export function watchEffect(callback: () => void): void {
  const instance = getCurrentInstance()
  const unwatch = instance.$watch(callback, callback, {
    immediate: true,
    deep: true,
  })

  // 主动销毁
  onBeforeDestroy(unwatch)
}
