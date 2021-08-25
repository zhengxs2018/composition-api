import {
  ref,
  watchEffect,
  onBeforeMount,
  unref,
} from '@zhengxs/composition-api'

import type { Fetcher } from '../helpers/with-cancel-token'

export type Options = {
  authLoad?: boolean
  pageSize?: number
}

export type Response<T> = {
  items: T[]
  total: number
}

export function useList<T>(
  fetcher: Fetcher<Response<T>, Record<'page' | 'pageSize', number>>,
  options: Options = {}
) {
  const list = ref<T[]>([])
  const current = ref(1)
  const pageSize = ref(options['pageSize'] || 10)
  const total = ref(0)
  const finished = ref(false)

  function isEnd(page: number): boolean {
    if (unref(total) === 0) return false
    return page * unref(pageSize) >= unref(total)
  }

  watchEffect(() => {
    finished.value = isEnd(unref(current))
  })

  onBeforeMount(() => {
    // 自动加载
    if (options['authLoad'] !== false) {
      refresh()
    }
  })

  // 刷新数据
  async function refresh() {
    return loadPage(1)
  }

  // 加载指定页面
  async function loadPage(page: number) {
    const result = await fetcher({
      page,
      pageSize: pageSize.value,
    })

    const items = result.items
    if (items.length === 0) return

    current.value = page
    total.value = result.total
    list.value = items
  }

  // 加载上一页
  function loadPrevPage() {
    const page = current.value
    if (page === 1) return loadPage(1)
    return loadPage(page - 1)
  }

  // 加载下一页
  function loadNextPage() {
    const page = current.value
    if (isEnd(page)) return Promise.resolve()
    return loadPage(page + 1)
  }

  return {
    list,
    current,
    pageSize,
    finished,
    total,
    refresh,
    loadPage,
    loadPrevPage,
    loadNextPage,
  }
}
