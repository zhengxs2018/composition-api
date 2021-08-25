/**
 * 添加只读属性
 *
 * @param object         - 目标对象
 * @param propKey         - 属性名
 * @param value       - 属性值
 * @param enumerable  - 是否可枚举
 * @returns 当前对象
 */
export function defineReadonlyProperty<T>(
  object: T,
  propKey: string | number | symbol,
  value: unknown,
  enumerable = true
): T {
  return Object.defineProperty(object, propKey, {
    value,
    configurable: false,
    writable: false,
    enumerable,
  })
}
