import type { Ref, Unref } from '../interface'

import { isObject } from '../util'
import { reactive } from './reactive'

export function ref<T>(value: T): Ref<T> {
  return reactive({ value, __isRef: true })
}

export function isRef<T = unknown>(state: unknown): state is Ref<T> {
  return isObject(state) && (state as unknown as Ref<T>).__isRef
}

export function unref<T = unknown>(state: T): Unref<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isRef(state) ? state.value : state
}
