import type { VueConstructor } from 'vue'
import type { ComponentInstance } from './interface'

import { isVue } from './util'

let vueDependency: VueConstructor | undefined = undefined
let vueConstructor: VueConstructor | null = null
let currentInstance: ComponentInstance | null = null

function ensureCurrentInstance() {
  if (!currentInstance) {
    throw new Error(`无法获取到当前组件实例，请先使用 Vue.use(CompositionAPI)`)
  }
}

try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const requiredVue = require('vue')
  if (requiredVue && isVue(requiredVue)) {
    vueDependency = requiredVue
  } else if (
    requiredVue &&
    'default' in requiredVue &&
    isVue(requiredVue.default)
  ) {
    vueDependency = requiredVue.default
  }
} catch {
  // not available
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
