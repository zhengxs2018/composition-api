import type { VueConstructor, ComponentOptions } from 'vue'
import type { NormalizedScopedSlot, VNode } from 'vue/types/vnode'

export type ComponentInstance = InstanceType<VueConstructor>

export type SetupFunction<Props, RawBindings = Record<string, undefined>> = (
  this: void,
  props: Props,
  ctx: SetupContext
) => RawBindings | (() => VNode | null) | void

export interface DefineComponentOptions<Props, RawBindings>
  extends ComponentOptions<Vue, unknown, unknown, unknown, Props> {
  setup: SetupFunction<Props, RawBindings>
}

export interface SetupContext {
  readonly slots: Record<string, NormalizedScopedSlot | undefined>
  emit(event: string, ...args: unknown[]): unknown
  on(event: string | string[], callback: Callable): unknown
  once(event: string | string[], callback: Callable): unknown
  off(event: string | string[], callback: Callable): unknown
  expose(exposed: Record<string, unknown>): void
}

export type Slots = Record<string, NormalizedScopedSlot>

export type Callable = (...args: unknown[]) => unknown

export interface Ref<T = unknown> {
  value: T
  __isRef: boolean
}
export type Unref<T> = T extends Ref<infer U> ? U : T
