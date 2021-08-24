import type { VueConstructor } from 'vue'

import type { Callable, SetupContext, ComponentInstance } from './interface'

import {
  setCurrentInstance,
  setVueConstructor,
  isPluginInstalled,
} from './runtime'

/**
 * 创建上下文
 *
 * @param vm - 组件实例
 */
function createSetupContext(vm: ComponentInstance): SetupContext {
  const slots = vm.$scopedSlots

  function expose(object: Record<string, unknown>) {
    Object.assign(vm, object)
  }

  function emit(event: string, ...args: unknown[]) {
    return vm.$emit(event, ...args)
  }

  function on(event: string | string[], callback: Callable) {
    return vm.$on(event, callback)
  }
  function once(event: string | string[], callback: Callable) {
    return vm.$once(event, callback)
  }
  function off(event: string | string[], callback: Callable) {
    return vm.$off(event, callback)
  }

  return {
    slots,
    expose,
    emit,
    on,
    once,
    off,
  }
}

export function initSetup(vm: ComponentInstance) {
  // @ts-ignore
  const setup = vm.$options.setup
  if (typeof setup === 'function') {
    const ctx = createSetupContext(vm)
    const result = setup(vm.$props, ctx)

    if (typeof result === 'function') {
      // 覆盖现有的
      // @ts-ignore
      vm.$options.render = result
    } else {
      // 不能直接返回
      // 防止普通对象被转成响应式对象
      Object.assign(vm, result)
    }
  }
}

export function install(Vue: VueConstructor) {
  if (isPluginInstalled()) return

  setVueConstructor(Vue)

  Vue.mixin({
    data() {
      setCurrentInstance(this)
      initSetup(this)
      setCurrentInstance(null)
      return {}
    },
  })
}
