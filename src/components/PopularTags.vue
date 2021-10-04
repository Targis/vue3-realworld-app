<template>
  <div>
    <mv-loading v-if="isLoading" />
    <mv-error-message v-if="error" />
    <div class="sidebar" v-if="popularTags">
      <p>Popular tags</p>
      <div class="tag-list">
        <router-link
          class="tag-default tag-pill"
          v-for="popularTag in popularTags"
          :key="popularTag"
          :to="{name: 'tag', params: {slug: popularTag}}"
        >
          {{ popularTag }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {actionTypes} from '@/store/modules/popularTags'
import MvLoading from '@/components/Loading'
import MvErrorMessage from '@/components/ErrorMessage'
export default {
  name: 'MvPopularTags',
  components: {
    MvLoading,
    MvErrorMessage
  },
  computed: {
    ...mapState({
      isLoading: state => state.popularTags.isLoading,
      error: state => state.popularTags.error,
      popularTags: state => state.popularTags.data
    })
  },
  mounted() {
    this.$store.dispatch(actionTypes.getPopularTags)
  }
}
</script>
