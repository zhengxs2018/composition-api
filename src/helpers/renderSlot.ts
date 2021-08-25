import type {
  NormalizedScopedSlot,
  ScopedSlotReturnValue,
} from 'vue/types/vnode'

export type Slots = Record<string, NormalizedScopedSlot>

/**
 * 渲染插槽
 *
 * @param slots        - 作用域插槽
 * @param name         - 插槽名称
 * @param props        - 参数
 * @param fallback     - 后备
 * @returns 虚拟节点列表
 */
export function renderSlot(
  slots: Slots,
  name: string,
  props: Record<string, unknown>,
  fallback: NormalizedScopedSlot
): ScopedSlotReturnValue | void {
  const slot = slots[name] || fallback
  if (typeof slot === 'function') return slot(props)
}
