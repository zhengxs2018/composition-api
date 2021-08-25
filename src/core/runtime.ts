import type { VueConstructor } from 'vue'

import { isVue } from '../shared/util'

export type ComponentInstance = InstanceType<VueConstructor>

let vueDependency: VueConstructor | undefined = undefined
let vueConstructor: VueConstructor | null = null
let currentInstance: ComponentInstance | null = null

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const requiredVue = require('vue')
  if (requiredVue) {
    if (isVue(requiredVue)) {
      vueDependency = requiredVue
    } else if ('default' in requiredVue && isVue(requiredVue.default)) {
      vueDependency = requiredVue.default
    }
  }
} catch {
  // not available
}

function ensureCurrentInstance(): void | never {
  if (currentInstance) return
  throw new Error(`无法获取到当前组件实例，请先使用 Vue.use(CompositionAPI)`)
}

export function isPluginInstalled() {
  return !!vueConstructor
}

export function getVueConstructor(): VueConstructor {
  return vueConstructor!
}

export function getRegisteredVueOrDefault(): VueConstructor {
  const constructor = vueConstructor || vueDependency
  return constructor!
}

export function setVueConstructor(Vue: VueConstructor) {
  vueConstructor = Vue
}

export function setCurrentInstance(instance: ComponentInstance | null) {
  currentInstance = instance
}

/**
 * 获取当前组件实例
 *
 * 注意：只能在同步的 setup 函数顶部使用
 * 并且无法在逻辑判断，异步执行中使用
 *
 * @public
 * @returns 组件实例
 *
 * @example
 *
 * ```js
 * import { getCurrentInstance } from '@zhengxs/composition-api'
 *
 * export default {
 *   setup() {
 *    // ✅ 正确用法
 *    // 如果需要可以在顶部保存
 *    const vm = getCurrentInstance()
 *
 *    console.log(vm)
 *
 *    if (flag)
 *       // ❌ 错误用法
 *       console.log(getCurrentInstance())
 *    }
 *
 *    onBeforeMount(() => {
 *       // ❌ 错误用法
 *       console.log(getCurrentInstance())
 *    })
 *   }
 * }
 * ```
 */
export function getCurrentInstance() {
  ensureCurrentInstance()
  return currentInstance!
}

/**
 * 创建响应式对象
 * Vue.observable 的别名
 *
 * @param raw - 原始值
 * @returns 响应式对象
 */
export function observe<T>(raw: T): T {
  const Vue = getRegisteredVueOrDefault()
  return Vue.observable(raw)
}
