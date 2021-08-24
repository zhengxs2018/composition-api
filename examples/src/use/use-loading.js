import { ref } from '@zhengxs/composition-api'

export function useLoading(fetcher) {
  const loading = ref(true)

  async function send(...args) {
    try {
      loading.value = true
      return await fetcher(...args)
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    send,
  }
}
