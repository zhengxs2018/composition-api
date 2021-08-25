import type { ComponentOptions } from 'vue'

import type { SetupFunction } from '../core/setup'

export interface DefineComponentOptions<Props, RawBindings>
  extends Omit<ComponentOptions<Vue>, 'data' | 'methods'> {
  setup: SetupFunction<Props, RawBindings>
}

/**
 * 从实现上看只返回传递给它的对象。
 * 但是可以提供 TS 和 IDE 的类型支持
 *
 * 注意: 虽然支持返回 render 函数，但 对 jsx 和 tsx 的语法支持受限
 *
 * @param options - 组件参数
 * @returns 组件配置对象
 *
 * @example
 *
 * ```js
 * import { defineComponent, ref } from '@zhengxs/composition-api'
 *
 * export default defineComponent({
 *   setup() {
 *     const loading = ref(false)
 *
 *     function clickHandler() {
 *       // pass
 *     }
 *
 *     return {
 *        loading,
 *        clickHandler
 *     }
 *   }
 * })
 * ```
 *
 * @example
 *
 * ```js
 * import { defineComponent } from '@zhengxs/composition-api'
 *
 * export default defineComponent({
 *   props: {
 *     id: String
 *   },
 *   setup(props, { slots, emit, on, once, off, expose }) {
 *     // 第一个参数是组件的 props
 *     console.log(props.id)
 *
 *     // 第二个参数是 setup 上下文
 *     console.log(slots)
 *
 *     // 可以挂在一些变量到当前组件的实例上
 *     expose({
 *        foo: 'bar',
 *     })
 *   }
 * })
 * ```
 *
 * @example
 *
 * ```js
 * import { defineComponent } from '@zhengxs/composition-api'
 *
 * export default defineComponent({
 *   setup() {
 *
 *     // 也可以返回一个 render 函数
 *     return (h) => {
 *       // 注意：目前不支持 jsx 语法
 *       return h('div', 'hello,world')
 *     }
 *   }
 * })
 * ```
 */
export function defineComponent<Props, RawBindings>(
  options: DefineComponentOptions<Props, RawBindings>
): ComponentOptions<Vue> {
  // 防止报错
  if (!(options.render || options.template)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.render = () => null
  }
  return options as ComponentOptions<Vue>
}
