import { install } from './install'

export { getCurrentInstance } from './core/runtime'
export type { ComponentInstance } from './core/runtime'

export type { SetupFunction, SetupContext } from './core/setup'
export { watchEffect } from './core/watch'

export { reactive, isReactive } from './reactivity/reactive'

export { ref, isRef, unref } from './reactivity/ref'
export type { Ref, UnwrapRef } from './reactivity/ref'

export {
  onBeforeMount,
  onMounted,
  onBeforeDestroy,
  onDestroyed,
} from './core/lifecycle'

export { defineComponent } from './helpers/defineComponent'
export type { DefineComponentOptions } from './helpers/defineComponent'

export { renderSlot } from './helpers/renderSlot'
export type { Slots } from './helpers/renderSlot'

export default {
  install,
}
