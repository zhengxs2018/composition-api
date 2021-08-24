import type { DefineComponentOptions } from '../interface'

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
