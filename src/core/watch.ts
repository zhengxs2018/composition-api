import type { WatchOptions } from 'vue'

import { getCurrentInstance } from './runtime'
import { onBeforeDestroy } from './lifecycle'

export function watchEffect(
  callback: () => void,
  options?: Omit<WatchOptions, 'immediate'>
): void {
  const vm = getCurrentInstance()
  const unwatch = vm.$watch(callback, callback, {
    ...options,
    immediate: true,
  })

  // 主动销毁
  onBeforeDestroy(unwatch)
}
