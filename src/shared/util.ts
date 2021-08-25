import type { VueConstructor } from 'vue'

const hasOwnProperty = Object.prototype.hasOwnProperty

export const IN_BROWSER =
  typeof window !== 'undefined' && typeof window.document !== 'undefined'

export type Dict = Record<string | number | symbol, unknown>

export type Callable = (...args: unknown[]) => unknown

export function isFunction(obj: unknown): obj is Callable {
  return typeof obj === 'function'
}

export function isVue(obj: unknown): obj is VueConstructor {
  return isFunction(obj) && obj.name === 'Vue'
}

export function hasOwn<T>(
  obj: T,
  key: string | number | symbol
): key is keyof T {
  return hasOwnProperty.call(obj, key)
}

export function isObject(obj: unknown): obj is Dict {
  return obj !== null && typeof obj === 'object'
}

export function isPlainObject(obj: Dict): obj is Record<string, never> {
  for (const _ in obj) {
    return false
  }
  return true
}
