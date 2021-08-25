import type { VueConstructor } from 'vue'

import {
  setCurrentInstance,
  setVueConstructor,
  isPluginInstalled,
} from './core/runtime'
import { initSetup } from './core/setup'

import { IN_BROWSER } from './shared/util'

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

if (IN_BROWSER && window.Vue) {
  window.Vue.use({ install })
}
