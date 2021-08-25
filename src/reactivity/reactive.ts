import { observe } from '../core/runtime'
import { isObject } from '../shared/util'

export function reactive<T>(state: T): T {
  return observe(state)
}

export function isReactive<T>(state: T): boolean {
  return isObject(state) && isObject(state.__ob__)
}
