import type { ComponentOptions } from 'vue'

import type { SetupFunction } from '../core/setup'

export interface DefineComponentOptions<Props, RawBindings>
  extends ComponentOptions<Vue, unknown, unknown, unknown, Props> {
  setup: SetupFunction<Props, RawBindings>
}

export function defineComponent<Props, RawBindings>(
  options: DefineComponentOptions<Props, RawBindings>
) {
  // 防止报错
  if (!(options.render || options.template)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    options.render = () => null
  }
  return options
}
