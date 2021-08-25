import type { WatchOptions } from 'vue'

import { getCurrentInstance } from './runtime'
import { onDestroyed } from './lifecycle'

/**
 * 为了根据响应式状态自动应用和重新应用副作用，我们可以使用 watchEffect 方法。
 * 它立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。
 *
 * 侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止
 *
 * 注意：和官方相比，没有 onInvalidate 的功能，这个只是基于 vm.$watch 的模拟函数
 *
 * @param callback - 回调函数
 * @param options  - 侦听可选项
 * @returns 手动取消函数
 *
 * @example
 *
 * ```js
 * import { watchEffect } from '@zhengxs/composition-api'
 *
 * // 在组件卸载时自动停止
 * // 通常情况下无需手动停止
 * const stop = watchEffect(() => {
 *    // ...
 * })
 *
 * // later
 * stop()
 * ```
 */
export function watchEffect(
  callback: () => void,
  options?: Omit<WatchOptions, 'immediate'>
): () => void {
  const vm = getCurrentInstance()
  const unwatch = vm.$watch(callback, callback, {
    ...options,
    immediate: true,
  })

  // 在组件卸载时自动停止
  onDestroyed(unwatch)
  return unwatch
}
