<template>
  <div>
    <el-table v-loading="loading.value" :data="list.value" style="width: 100%">
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="nickname" label="昵称"> </el-table-column>
    </el-table>

    <el-pagination
      :current-page="current.value"
      :page-size="pageSize.value"
      :total="total.value"
      @current-change="loadPage"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
} from '@zhengxs/composition-api'

import { getUserList } from '../api/users'
import { withCancelToken } from '../helpers/with-cancel-token'
import { useRequestLoading } from '../use/use-request-loading'
import { useList } from '../use/use-list'

const { send: fetchUserList } = withCancelToken(getUserList)

export default defineComponent({
  name: 'UsersTable',
  setup() {
    const { send, loading } = useRequestLoading(fetchUserList)
    const { list, current, pageSize, total, loadPage } = useList(send)

    return {
      list,
      loading,
      current,
      pageSize,
      total,
      loadPage,
    }
  },
})
</script>
