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

// returns registered vue or `vue` dependency
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

export function getCurrentInstance() {
  ensureCurrentInstance()
  return currentInstance!
}

export function observe<T>(state: T): T {
  const Vue = getRegisteredVueOrDefault()
  return Vue.observable(state)
}
