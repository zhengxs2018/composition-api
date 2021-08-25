import { observe } from '../core/runtime'
import { isObject } from '../shared/util'

/**
 * 创建响应式对象
 *
 * @public
 * @param raw - 原始对象
 * @returns 响应式对象
 *
 * @example
 *
 * ```js
 * import { reactive } from '@zhengxs/composition-api'
 *
 * export default defineComponent({
 *   setup() {
 *     const state = Vue.observable({ count: 0 })
 *
 *     function add() {
 *       state.count++
 *     }
 *
 *     return {
 *        state,
 *        add
 *     }
 *   }
 * })
 * ```
 */
export function reactive<T>(raw: T): T {
  return observe(raw)
}

/**
 * 判断是否响应式对象
 *
 * @public
 * @param obj - 判断对象
 * @returns 返回 true 表示是响应式对象
 *
 * @example
 *
 * ```js
 * import { reactive, ref, isReactive } from '@zhengxs/composition-api'
 *
 * // True
 * isReactive(ref(false))
 * isReactive(reactive({}))
 *
 * // False
 * isReactive({})
 * isReactive(false)
 * isReactive(null)
 * isReactive(undefined)
 * isReactive('')
 * isReactive(1)
 * ```
 */
export function isReactive<T>(obj: T): boolean {
  return isObject(obj) && isObject(obj.__ob__)
}
