import type { AxiosRequestConfig } from 'axios'
import { ref } from '@zhengxs/composition-api'

import type { Fetcher } from '../helpers/with-cancel-token'

export function useRequestLoading<T, P = unknown>(fetcher: Fetcher<T, P>) {
  const loading = ref(true)

  async function send(data: P, config?: AxiosRequestConfig): Promise<T> {
    try {
      loading.value = true
      return await fetcher(data, config)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    send,
  }
}
