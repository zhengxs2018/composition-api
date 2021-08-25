<template>
  <div>
    <ol v-loading="loading.value">
      <li v-for="item in list.value" :key="item.id">
        {{ item.nickname }}
      </li>
    </ol>
    <div style="display: flex; justify-content: space-between">
      <div>
        当前：{{ current.value }}/{{ pagesCount.value }} 总数：{{ total.value }}
      </div>
      <div>
        <button :disabled="current.value === 1" @click="loadPrevPage">
          上一页
        </button>
        <button :disabled="finished.value" @click="loadNextPage">下一页</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  ref,
  unref,
  watchEffect,
  defineComponent,
} from '@zhengxs/composition-api'

import { getUserList } from '../api/users'
import { withCancelToken } from '../helpers/with-cancel-token'
import { useRequestLoading } from '../use/use-request-loading'
import { useList } from '../use/use-list'

const { send: fetchUserList } = withCancelToken(getUserList)

export default defineComponent({
  name: 'UsersList',
  setup() {
    const { send, loading } = useRequestLoading(fetchUserList)
    const {
      list,
      current,
      pageSize,
      total,
      finished,
      loadPrevPage,
      loadNextPage,
    } = useList(send)

    const pagesCount = ref(0)

    watchEffect(() => {
      pagesCount.value = Math.round(unref(total) / unref(pageSize))
    })

    return {
      loading,
      list,
      current,
      pageSize,
      total,
      pagesCount,
      finished,
      loadPrevPage,
      loadNextPage,
    }
  },
})
</script>
