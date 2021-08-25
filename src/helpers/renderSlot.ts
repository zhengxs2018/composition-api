import type {
  NormalizedScopedSlot,
  ScopedSlotReturnValue,
} from 'vue/types/vnode'

export type Slots = Record<string, NormalizedScopedSlot>

/**
 * 插槽渲染函数
 *
 * renderSlot 是个辅助函数，支持在 vue 的 jsx 中使用
 *
 * @param slots        - 作用域插槽
 * @param name         - 插槽名称
 * @param props        - 参数
 * @param fallback     - 如果 slot 不存在就调用
 * @returns 虚拟节点列表
 *
 * @example
 *
 * ```js
 * import { defineComponent, renderSlot } from '@zhengxs/composition-api'
 *
 * export default defineComponent({
 *   setup(props, { slots }) {
 *
 *     return (h) => {
 *       const children = renderSlot(slots, 'default', {}, () => {
 *          return [h('span', 'hello,world')]
 *       })
 *
 *       // 目前不支持 vue 的 jsx 语法
 *       return h('div', children)
 *     }
 *   }
 * })
 * ```
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
