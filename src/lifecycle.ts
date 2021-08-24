import type { Callable } from './interface'
import { getCurrentInstance } from './runtime'

/**
 * 挂载前
 *
 * @param callback - 回调函数
 */
export function onBeforeMount(callback: Callable) {
  const vm = getCurrentInstance()
  vm.$once('hook:created', callback)
}

/**
 * 挂载后
 *
 * @param callback - 回调函数
 */
export function onMounted(callback: Callable) {
  const vm = getCurrentInstance()
  vm.$once('hook:mounted', callback)
}

/**
 * 销毁前
 *
 * @param callback - 回调函数
 */
export function onBeforeDestroy(callback: Callable) {
  const vm = getCurrentInstance()
  vm.$once('hook:beforeDestroy', callback)
}

/**
 * 销毁后
 *
 * @param callback - 回调函数
 */
export function onDestroyed(callback: Callable) {
  const vm = getCurrentInstance()
  vm.$once('hook:destroyed', callback)
}
