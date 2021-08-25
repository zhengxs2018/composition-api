import type { Callable } from '../shared/util'

import { getCurrentInstance } from './runtime'

/**
 * 实例创建完成
 *
 * 注意：使用的是 created 事件，而不是 beforeMount
 * 因为 beforeMount 在服务器端渲染期间不被调用
 * 详见：https://cn.vuejs.org/v2/api/#beforeMount
 *
 * @public
 * @param callback - 回调函数
 *
 * @example
 * ```js
 * import { onBeforeMount } from '@zhengxs/composition-api'
 *
 * export default {
 *   setup() {
 *     onBeforeMount(() => {
 *        console.log('组件实例已创建，但内容未渲染')
 *     })
 *   }
 * }
 * ```
 */
export function onBeforeMount(callback: Callable): void {
  const vm = getCurrentInstance()
  vm.$once('hook:created', callback)
}

/**
 * 实例被挂载后调用
 *
 * 注意： mounted 不会保证所有的子组件也都一起被挂载。
 * 如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 vm.$nextTick
 * 详见：https://cn.vuejs.org/v2/api/#mounted
 *
 * @public
 * @param callback - 回调函数
 *
 * @example
 * ```js
 * import { onMounted } from '@zhengxs/composition-api'
 *
 * export default {
 *   setup() {
 *     onMounted(() => {
 *        console.log('组件已挂载，可以在这里获取 dom 元素')
 *     })
 *   }
 * }
 * ```
 */
export function onMounted(callback: Callable): void {
  const vm = getCurrentInstance()
  vm.$once('hook:mounted', callback)
}

/**
 * 实例销毁之前调用，由 beforeDestroy 事件触发
 *
 * 注意：该钩子在服务器端渲染期间不被调用。
 * 详见：https://cn.vuejs.org/v2/api/#beforeDestroy
 *
 * @public
 * @param callback - 回调函数
 *
 * @example
 * ```js
 * import { onBeforeDestroy } from '@zhengxs/composition-api'
 *
 * export default {
 *   setup() {
 *     onBeforeDestroy(() => {
 *        console.log('正在实例销毁')
 *     })
 *   }
 * }
 * ```
 */
export function onBeforeDestroy(callback: Callable): void {
  const vm = getCurrentInstance()
  vm.$once('hook:beforeDestroy', callback)
}

/**
 * 销毁后
 *
 * 该钩子在服务器端渲染期间不被调用。
 * 详见：https://cn.vuejs.org/v2/api/#destroyed
 *
 * @public
 * @param callback - 回调函数
 *
 * @example
 *
 * ```js
 * import { onDestroyed } from '@zhengxs/composition-api'
 *
 * export default {
 *   setup() {
 *     onDestroyed(() => {
 *        console.log('实例销毁完成')
 *     })
 *   }
 * }
 * ```
 */
export function onDestroyed(callback: Callable): void {
  const vm = getCurrentInstance()
  vm.$once('hook:destroyed', callback)
}
