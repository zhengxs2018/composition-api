import { hasOwn, isObject } from '../shared/util'
import { defineReadonlyProperty } from '../shared/defineProperty'

import { reactive } from './reactive'

const RefKey = 'refKey'

export interface Ref<T = unknown> {
  value: T
}

export type UnwrapRef<T> = T extends Ref<infer U> ? U : T

export function ref<T>(value: T): Ref<UnwrapRef<T>> {
  if (isRef(value)) return value as Ref<UnwrapRef<T>>

  const state = reactive({ value })
  defineReadonlyProperty(state, RefKey, true)

  // 不是 proxy 对象，所以不需要进行封闭操作
  return state as Ref<UnwrapRef<T>>
}

export function isRef<T>(state: unknown): state is Ref<UnwrapRef<T>> {
  return isObject(state) && hasOwn(state, RefKey)
}

export function unref<T = unknown>(state: T): UnwrapRef<T> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isRef(state) ? state.value : state
}
