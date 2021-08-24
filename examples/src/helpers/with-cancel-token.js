import Axios from "axios";

const CancelToken = Axios.CancelToken;

export function withCancelToken(fetcher) {
  let cancel;

  /**
   * 发送请求
   *
   * @param data   - 数据
   * @param config - Axios 请求配置
   * @returns 请求结果
   */
  function send(data, config) {
    abort();
    return fetcher(data, {
      ...config,
      cancelToken: new CancelToken((c) => (cancel = c))
    });
  }

  /**
   * 中止请求
   *
   * @param message - 消息文本
   */
  function abort(message) {
    if (cancel) {
      cancel(message);
      cancel = null;
    }
  }

  return {
    send,
    abort
  };
}
