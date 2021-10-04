<template>
  <div>
    <mv-topbar />

    <router-view />
  </div>
</template>

<script>
import {actionTypes} from '@/store/modules/auth'
import MvTopbar from '@/components/Topbar'
export default {
  name: 'MvApp',
  components: {
    MvTopbar
  },
  mounted() {
    this.$store.dispatch(actionTypes.getCurrentUser)
  }
}
</script>
