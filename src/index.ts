import { install } from './install'

export { getCurrentInstance } from './runtime'
export {
  onBeforeMount,
  onMounted,
  onBeforeDestroy,
  onDestroyed,
} from './lifecycle'
export { watchEffect } from './watch'

export { reactive } from './reactivity/reactive'
export { ref, isRef, unref } from './reactivity/ref'

export { defineComponent } from './helpers/defineComponent'
export { renderSlot } from './helpers/renderSlot'

export type { SetupFunction, SetupContext, Unref, Ref } from './interface'

export default {
  install,
}
