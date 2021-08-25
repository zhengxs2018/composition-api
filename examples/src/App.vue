<template>
  <div id="app">
    <UsersTable />
    <UsersList />
  </div>
</template>

<script lang="ts">
import UsersTable from './components/UsersTable.vue'
import UsersList from './components/UsersList.vue'

export default {
  name: 'App',
  components: {
    UsersTable,
    UsersList,
  },
}
</script>
