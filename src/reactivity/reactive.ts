import { getRegisteredVueOrDefault } from '../runtime'

export function reactive<T>(state: T): T {
  const Vue = getRegisteredVueOrDefault()
  return Vue.observable(state)
}
