import Axios, { AxiosRequestConfig, Canceler } from 'axios'

const CancelToken = Axios.CancelToken

export type Fetcher<T, P = unknown> = (
  data: P,
  config?: AxiosRequestConfig
) => Promise<T>

export function withCancelToken<T, P = unknown>(fetcher: Fetcher<T, P>) {
  let cancel: Canceler | null

  /**
   * 发送请求
   *
   * @param data   - 数据
   * @param config - Axios 请求配置
   * @returns 请求结果
   */
  function send(data: P, config?: AxiosRequestConfig): Promise<T> {
    abort()
    return fetcher(data, {
      ...config,
      cancelToken: new CancelToken(c => (cancel = c)),
    })
  }

  /**
   * 中止请求
   *
   * @param message - 消息文本
   */
  function abort(message?: string): void {
    if (cancel) {
      cancel(message)
      cancel = null
    }
  }

  return {
    send,
    abort,
  }
}
