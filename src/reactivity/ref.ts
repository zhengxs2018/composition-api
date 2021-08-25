import { hasOwn, isObject } from '../shared/util'
import { defineReadonlyProperty } from '../shared/defineProperty'

import { reactive } from './reactive'

const RefKey = 'refKey'

export interface Ref<T = unknown> {
  value: T
}

export type UnwrapRef<T> = T extends Ref<infer U> ? U : T

/**
 * 创建响应式变量
 *
 * 将值封装在一个对象中，看似没有必要，但为了保持 JavaScript 中不同数据类型的行为统一，这是必须的。
 * 这是因为在 JavaScript 中，Number 或 String 等基本类型是通过值而非引用传递的
 *
 * 注意：和官方的区别在于，无法在 ref 属性上使用
 *
 * @public
 * @param value - 值
 * @returns 响应式变量
 *
 * @example
 *
 * ```js
 * import { ref } from '@zhengxs/composition-api'
 *
 * const counter = ref(0)
 *
 * console.log(counter) // { value: 0 }
 * console.log(counter.value) // 0
 *
 * counter.value++
 * console.log(counter.value) // 1
 * ```
 */
export function ref<T>(value: T): Ref<UnwrapRef<T>> {
  if (isRef(value)) return value as Ref<UnwrapRef<T>>

  const state = reactive({ value })
  defineReadonlyProperty(state, RefKey, true)

  // 不是 proxy 对象，所以不需要进行封闭操作
  return state as Ref<UnwrapRef<T>>
}

/**
 * 判断是否是响应式变量
 *
 * @public
 * @param obj - 判断对象
 * @returns 如果返回 true 就是一个响应式变量
 *
 * @example
 *
 * ```js
 * import { reactive, ref, isRef } from '@zhengxs/composition-api'
 *
 * const counter = ref(0)
 *
 * console.log(isRef(counter)) // true
 *
 * const state = reactive({})
 *
 * // 这是响应式对象，但不是响应式变量
 * console.log(isRef(state)) // false
 * ```
 */
export function isRef<T>(obj: unknown): obj is Ref<UnwrapRef<T>> {
  return isObject(obj) && hasOwn(obj, RefKey)
}

/**
 * 如果参数是一个 ref，则返回内部值，否则返回参数本身
 *
 * 这是 val = isRef(val) ? val.value : val 的语法糖函数。
 *
 * @public
 * @param obj - 判断对象
 *
 * @example
 *
 * ```js
 * import { ref, unref } from '@zhengxs/composition-api'
 *
 * const counter = ref(0)
 *
 * console.log(unref(counter)) // 0
 *
 * const state = reactive({})
 *
 * console.log(unref(state)) // {}
 *
 * console.log(unref(1)) // 1
 * ```
 */
export function unref<T = unknown>(obj: T): UnwrapRef<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isRef(obj) ? obj.value : obj
}
