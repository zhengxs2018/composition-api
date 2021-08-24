import type { VueConstructor } from 'vue'

export function isVue(obj: unknown): obj is VueConstructor {
  return !!obj && typeof obj === 'function' && obj.name === 'Vue'
}

export function isObject(obj: unknown): obj is Record<string, unknown> {
  return obj !== null && typeof obj === 'object'
}
